package cmd

import "github.com/Doer-org/glyph/internal/presentation/http/router"

func Exec() {
	r := router.NewRouter()
	r.InitHealthRouter()
	r.Serve()
}
