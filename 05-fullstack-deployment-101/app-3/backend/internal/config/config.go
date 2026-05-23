package config

import (
	"os"
	"strings"
)

type Config struct {
	Port          string
	AppEnv        string
	DBPath        string
	AllowedOrigins []string
}

func Load() Config {
	return Config{
		Port:          getEnv("PORT", "8080"),
		AppEnv:        getEnv("APP_ENV", "development"),
		DBPath:        getEnv("DB_PATH", "./data/task-harbor.db"),
		AllowedOrigins: parseCSV(getEnv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")),
	}
}

func getEnv(key, fallback string) string {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return fallback
	}
	return value
}

func parseCSV(value string) []string {
	parts := strings.Split(value, ",")
	result := make([]string, 0, len(parts))

	for _, part := range parts {
		item := strings.TrimSpace(part)
		if item != "" {
			result = append(result, item)
		}
	}

	return result
}
