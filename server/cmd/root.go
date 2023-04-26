package cmd

import (
	"log"

	"github.com/Doer-org/glyph/internal/infrastructure/database"
	"github.com/Doer-org/glyph/internal/presentation/http/router"
)

func Exec() {
	conn, err := database.NewConn()
	if err != nil {
		log.Fatal(err)
	}

	r := router.NewRouter()
	r.InitHealthRouter()
	r.InitUserRouter(conn)
	r.InitGlyphRouter(conn)
	r.Serve()
}
