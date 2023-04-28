package router

import (
	"github.com/Doer-org/glyph/internal/infrastructure/database"
	"github.com/Doer-org/glyph/internal/presentation/http/handler"
	"github.com/Doer-org/glyph/internal/presentation/ws"
	"github.com/gin-gonic/gin"
)

func (r Router) InitWsRouter(conn *database.Conn) {
	hub := ws.InitHub()
	go hub.Run()

	g := r.Engine.Group("/ws")
	g.GET("/health", handler.HealthHandler)
	g.GET("/:roomId", GetChatRoom(hub))
}

func GetChatRoom(h *ws.Hub) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		roomId := ctx.Param("roomId")
		h.ServeWs(ctx.Writer, ctx.Request, roomId)
	}
}
