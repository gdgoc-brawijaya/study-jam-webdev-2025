package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"backend/internal/models"
	"backend/internal/store"
)

type TaskHandler struct {
	store *store.TaskStore
}

func NewTaskHandler(store *store.TaskStore) *TaskHandler {
	return &TaskHandler{store: store}
}

func (h *TaskHandler) Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"service": "task-harbor-api",
	})
}

func (h *TaskHandler) GetTasks(c *gin.Context) {
	items, err := h.store.List()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to load tasks",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"items": items,
	})
}

func (h *TaskHandler) GetTask(c *gin.Context) {
	task, err := h.store.Get(c.Param("id"))
	if err != nil {
		if err == store.ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "task not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to load task",
		})
		return
	}

	c.JSON(http.StatusOK, task)
}

func (h *TaskHandler) CreateTask(c *gin.Context) {
	var req models.CreateTaskRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request body",
		})
		return
	}

	req.Title = strings.TrimSpace(req.Title)
	req.Description = strings.TrimSpace(req.Description)

	if req.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "title is required",
		})
		return
	}

	task, err := h.store.Create(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to create task",
		})
		return
	}

	c.JSON(http.StatusCreated, task)
}

func (h *TaskHandler) DeleteTask(c *gin.Context) {
	deleted, err := h.store.Delete(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to delete task",
		})
		return
	}

	if !deleted {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "task not found",
		})
		return
	}

	c.Status(http.StatusNoContent)
}
