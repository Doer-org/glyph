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
}
