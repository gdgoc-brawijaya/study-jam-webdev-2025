package store

import (
	"database/sql"
	"errors"
	"fmt"
	"time"

	"backend/internal/models"
)

type TaskStore struct {
	db *sql.DB
}

func NewTaskStore(db *sql.DB) *TaskStore {
	return &TaskStore{db: db}
}

func (s *TaskStore) List() ([]models.Task, error) {
	rows, err := s.db.Query(`
		SELECT id, title, description, created_at
		FROM tasks
		ORDER BY datetime(created_at) DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	tasks := make([]models.Task, 0)
	for rows.Next() {
		task, err := scanTask(rows)
		if err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return tasks, nil
}

func (s *TaskStore) Get(id string) (models.Task, error) {
	row := s.db.QueryRow(`
		SELECT id, title, description, created_at
		FROM tasks
		WHERE id = ?
	`, id)

	task, err := scanTask(row)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return models.Task{}, ErrNotFound
		}
		return models.Task{}, err
	}

	return task, nil
}

func (s *TaskStore) Create(req models.CreateTaskRequest) (models.Task, error) {
	id := s.nextID()
	createdAt := time.Now().UTC()

	_, err := s.db.Exec(`
		INSERT INTO tasks (id, title, description, created_at)
		VALUES (?, ?, ?, ?)
	`, id, req.Title, req.Description, createdAt.Format(time.RFC3339))
	if err != nil {
		return models.Task{}, err
	}

	return models.Task{
		ID:          id,
		Title:       req.Title,
		Description: req.Description,
		CreatedAt:   createdAt,
	}, nil
}

func (s *TaskStore) Delete(id string) (bool, error) {
	result, err := s.db.Exec(`DELETE FROM tasks WHERE id = ?`, id)
	if err != nil {
		return false, err
	}

	affected, err := result.RowsAffected()
	if err != nil {
		return false, err
	}

	return affected > 0, nil
}

func (s *TaskStore) nextID() string {
	var maxID int64
	if err := s.db.QueryRow(`
		SELECT COALESCE(MAX(CAST(SUBSTR(id, 6) AS INTEGER)), 0)
		FROM tasks
		WHERE id LIKE 'task-%'
	`).Scan(&maxID); err != nil {
		return fmt.Sprintf("task-%d", time.Now().Unix())
	}

	return fmt.Sprintf("task-%d", maxID+1)
}

func scanTask(row scanner) (models.Task, error) {
	var (
		task      models.Task
		createdAt string
	)

	if err := row.Scan(&task.ID, &task.Title, &task.Description, &createdAt); err != nil {
		return models.Task{}, err
	}

	parsed, err := time.Parse(time.RFC3339, createdAt)
	if err != nil {
		return models.Task{}, err
	}

	task.CreatedAt = parsed
	return task, nil
}

type scanner interface {
	Scan(dest ...any) error
}

var ErrNotFound = errors.New("task not found")
