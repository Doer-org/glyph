package config

import (
	"fmt"
	"log"
	"os"
)

// DSNはdataSourceNameを返します、もし必須の環境変数が設定されてなかった場合はerrorを返します
func DSN() (string, error) {
	log.Println(os.Getenv("ENVIRONMENT"))

	if os.Getenv("ENVIRONMENT") == "prd" {
		dbDSN := os.Getenv("DSN")
		return dbDSN, nil
	}

	if os.Getenv("ENVIRONMENT") == "dev" {
		dbUser := os.Getenv("DB_USER")
		dbPassword := os.Getenv("DB_PASSWORD")
		dbHost := os.Getenv("DB_HOST")
		dbPort := os.Getenv("DB_PORT")
		dbDatabase := os.Getenv("DB_DATABASE")

		if dbUser == "" || dbPassword == "" || dbHost == "" || dbPort == "" || dbDatabase == "" {
			return "", fmt.Errorf("ERROR : required environment variable not found")
		}
		return fmt.Sprintf(
			"%s:%s@tcp(%s:%s)/%s?",
			dbUser,
			dbPassword,
			dbHost,
			dbPort,
			dbDatabase,
		) + "parseTime=true&collation=utf8mb4_bin", nil
	}

	return "", fmt.Errorf("Error : not match enviroment prd or dev , currently used %s", os.Getenv("ENVIRONMENT"))
}
