package cmd

import (
	"log"

	"github.com/Doer-org/glyph/internal/config"
	"github.com/Doer-org/glyph/internal/infrastructure/database"
	"github.com/Doer-org/glyph/internal/presentation/router"
	logdis "github.com/Doer-org/glyph/log"
)

func Exec() {
	conn, err := database.NewConn()
	if err != nil {
		log.Fatal(err)
	}
	logger := logdis.New()
	err = config.EnvCheck()
	if err != nil {
		logger.Error("", map[string]interface{}{"err": err.Error(), "type": "discord env check"})
		log.Fatal(err)
	}

	r := router.NewRouter()
	r.InitHealthRouter()
	r.InitUserRouter(conn)
	r.InitAuthRouter(conn)
	r.InitGlyphRouter(conn)
	r.InitCommentRouter(conn)
	r.InitImageRouter(conn)
	r.InitWsRouter(conn)
	r.Serve()
}
