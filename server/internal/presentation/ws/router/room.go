package router

import (
	"github.com/Doer-org/glyph/internal/presentation/ws"
	"github.com/gin-gonic/gin"
)

func GetChatRoom(h *ws.Hub) func(ctx *gin.Context) {
	return func(ctx *gin.Context) {
		roomId := ctx.Param("roomId")
		h.ServeWs(ctx.Writer, ctx.Request, roomId)
	}
}
