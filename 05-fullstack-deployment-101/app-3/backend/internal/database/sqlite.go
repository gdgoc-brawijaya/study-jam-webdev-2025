package database

import (
	"database/sql"
	"os"
	"path/filepath"
	"time"

	_ "modernc.org/sqlite"
)

func OpenSQLite(path string) (*sql.DB, error) {
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return nil, err
	}

	db, err := sql.Open("sqlite", path)
	if err != nil {
		return nil, err
	}

	db.SetMaxOpenConns(1)
	db.SetConnMaxLifetime(0)

	if err := db.Ping(); err != nil {
		db.Close()
		return nil, err
	}

	if _, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS tasks (
			id TEXT PRIMARY KEY,
			title TEXT NOT NULL,
			description TEXT NOT NULL DEFAULT '',
			created_at TEXT NOT NULL
		);
	`); err != nil {
		db.Close()
		return nil, err
	}

	if err := seedTasks(db); err != nil {
		db.Close()
		return nil, err
	}

	return db, nil
}

func seedTasks(db *sql.DB) error {
	var count int
	if err := db.QueryRow(`SELECT COUNT(*) FROM tasks`).Scan(&count); err != nil {
		return err
	}

	if count > 0 {
		return nil
	}

	now := time.Now().UTC()
	seed := []struct {
		id          string
		title       string
		description string
		createdAt   time.Time
	}{
		{
			id:          "task-1",
			title:       "Refine the landing page",
			description: "Use a clean layout that feels calm and believable.",
			createdAt:   now.Add(-8 * time.Hour),
		},
		{
			id:          "task-2",
			title:       "Prepare launch notes",
			description: "Keep the message focused and easy to scan.",
			createdAt:   now.Add(-5 * time.Hour),
		},
		{
			id:          "task-3",
			title:       "Review server setup",
			description: "Make sure the compose stack is ready to run.",
			createdAt:   now.Add(-3 * time.Hour),
		},
	}

	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	stmt, err := tx.Prepare(`
		INSERT INTO tasks (id, title, description, created_at)
		VALUES (?, ?, ?, ?)
	`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	for _, item := range seed {
		if _, err := stmt.Exec(item.id, item.title, item.description, item.createdAt.Format(time.RFC3339)); err != nil {
			return err
		}
	}

	return tx.Commit()
}
