package router

import (
	"github.com/Doer-org/glyph/internal/infrastructure/database"
	"github.com/Doer-org/glyph/internal/infrastructure/persistance"
	"github.com/Doer-org/glyph/internal/presentation/http/handler"
	"github.com/Doer-org/glyph/internal/usecase"
)

func (r Router) InitImageRouter(conn *database.Conn) {
	repo := persistance.NewImageRepositry(conn)
	uc := usecase.NewImageUsecase(repo)
	h := handler.NewIMageHandler(uc)

	g := r.Engine.Group("/image")
	g.POST("/", h.CreateImage)
	g.GET("/:id", h.GetImagebyId)
	g.GET("/all", h.GetImageAll)
	g.DELETE("/:id", h.DeleteImage)
}
