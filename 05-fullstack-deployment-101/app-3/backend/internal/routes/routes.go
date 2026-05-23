package routes

import (
	"github.com/gin-gonic/gin"

	"backend/internal/config"
	"backend/internal/handlers"
	"backend/internal/middleware"
	"backend/internal/store"
)

func NewRouter(cfg config.Config, taskStore *store.TaskStore) *gin.Engine {
	if cfg.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(middleware.RequestLogger())
	router.Use(middleware.CORS(cfg.AllowedOrigins))

	taskHandler := handlers.NewTaskHandler(taskStore)

	router.GET("/health", taskHandler.Health)

	api := router.Group("/api")
	{
		api.GET("/tasks", taskHandler.GetTasks)
		api.GET("/tasks/:id", taskHandler.GetTask)
		api.POST("/tasks", taskHandler.CreateTask)
		api.DELETE("/tasks/:id", taskHandler.DeleteTask)
	}

	return router
}
