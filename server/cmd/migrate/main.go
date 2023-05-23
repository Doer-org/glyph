package main

import (
	"database/sql"
	"fmt"

	"github.com/Doer-org/glyph/log"
	migrate "github.com/rubenv/sql-migrate"

	"github.com/Doer-org/glyph/internal/config"
)

func main() {
	logger := log.New()
	dsn, err := config.DSN()
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
		Dir: "migrations",
	}
	n, err := migrate.Exec(db, "mysql", migrations, migrate.Up)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Printf("applied %d migrations.\n", n)
	logger.Info("", map[string]string{"place": "migrate", "info": fmt.Sprintf("applied %d migrations.\n", n)})

}
