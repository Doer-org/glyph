package router

import (
	"github.com/Doer-org/glyph/internal/infrastructure/database"
	"github.com/Doer-org/glyph/internal/infrastructure/persistance"
	"github.com/Doer-org/glyph/internal/presentation/http/handler"
	"github.com/Doer-org/glyph/internal/usecase"
)

func (r Router) InitGlyphRouter(conn *database.Conn) {
	repo := persistance.NewGlyphRepository(conn)
	uc := usecase.NewGlyphUsecase(repo)
	h := handler.NewGlyphHandler(uc)

	g := r.Engine.Group("/glyphs")
	g.POST("/", h.CreateGlyph)
	g.GET("/list", h.ReadAllGlyphs)
	g.GET("/:id", h.ReadGlyph)
	g.GET("/list/:id", h.ReadRelativeAllGlyphs)
	g.PUT("/", h.EditGlyph)
	g.DELETE("/:id", h.DeleteGlyph)
}
