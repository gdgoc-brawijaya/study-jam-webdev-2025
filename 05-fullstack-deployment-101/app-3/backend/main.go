package main

import (
	"database/sql"
	"log"

	"backend/internal/config"
	"backend/internal/database"
	"backend/internal/routes"
	"backend/internal/store"
)

func main() {
	cfg := config.Load()
	db, err := database.OpenSQLite(cfg.DBPath)
	if err != nil {
		log.Fatal(err)
	}
	defer func(db *sql.DB) {
		if err := db.Close(); err != nil {
			log.Printf("close db: %v", err)
		}
	}(db)

	taskStore := store.NewTaskStore(db)
	router := routes.NewRouter(cfg, taskStore)

	log.Printf("backend listening on :%s", cfg.Port)

	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
