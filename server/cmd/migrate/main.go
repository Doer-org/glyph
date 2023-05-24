package main

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
	migrate "github.com/rubenv/sql-migrate"
	"github.com/seipan/logdis"
)

func DSN() (string, error) {
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

func New() *logdis.Logger {
	logger := logdis.NewLogger(os.Getenv("WEBHOOKURL"), os.Getenv("LOGIMG"), os.Getenv("LOGNAME"))
	return logger
}

func main() {
	logger := New()
	logger.Info("", map[string]string{"place": "migrate", "info": "migration start"})
	dsn, err := DSN()
	if err != nil {
		logger.Error("", map[string]string{"place": "migrate", "err": err.Error()})
		fmt.Println(err.Error())
		return
	}
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		logger.Error("", map[string]string{"place": "migrate", "err": err.Error()})
		fmt.Println(err.Error())
		return
	}

	migrations := &migrate.FileMigrationSource{
		Dir: "../../migrations",
	}
	n, err := migrate.Exec(db, "mysql", migrations, migrate.Up)
	if err != nil {
		logger.Error("", map[string]string{"place": "migrate", "err": err.Error()})
		fmt.Println(err.Error())
		return
	}
	fmt.Printf("applied %d migrations.\n", n)
	logger.Info("", map[string]string{"place": "migrate", "info": fmt.Sprintf("applied %d migrations.\n", n)})

}
