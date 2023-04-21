package router

import "github.com/Doer-org/glyph/internal/presentation/http/handler"

func (r Router) InitHealthRouter() {
	r.Engine.GET("/health", handler.HealthHandler)
}
