package router

import (
	"github.com/Doer-org/glyph/internal/infrastructure/database"
	"github.com/Doer-org/glyph/internal/infrastructure/persistance"
	"github.com/Doer-org/glyph/internal/presentation/http/handler"
	"github.com/Doer-org/glyph/internal/usecase"
)

func (r Router) InitCommentRouter(conn *database.Conn) {
	repo := persistance.NewCommentRepository(conn)
	uc := usecase.NewCommentUsecase(repo)
	h := handler.NewCommentHandler(uc)

	g := r.Engine.Group("/comments")
	g.POST("/", h.CreateComment)
	g.GET("/glyphs/:id", h.ReadCommentsByGlyphId)
	g.GET("/users/:id", h.ReadCommentsByUserId)

}
