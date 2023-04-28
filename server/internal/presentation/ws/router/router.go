package router

import (
	"fmt"
	"github.com/Doer-org/glyph/internal/config"
	"github.com/Doer-org/glyph/internal/presentation/ws"
	"github.com/Doer-org/glyph/internal/presentation/ws/middleware"
	"github.com/gin-gonic/gin"
)

type Router struct {
	Engine *gin.Engine
}

func NewWsRouter() *Router {
	engine := gin.Default()

	middleware.Cors(engine)

	hub := ws.InitHub()
	go hub.Run()

	engine.GET("/ws/:roomId", GetChatRoom(hub))

	return &Router{
		Engine: engine,
	}
}

func (r *Router) Serve() {
	err := r.Engine.Run(fmt.Sprintf(":%s", config.Port()))
	if err != nil {
		return
	}
}
