package handler

import (
	"net/http"

	"github.com/Doer-org/glyph/internal/presentation/http/json"
	"github.com/Doer-org/glyph/internal/usecase"
	"github.com/gin-gonic/gin"
)

type GlyphHandler struct {
	uc usecase.IGlyphUsecase
}

func NewGlyphHandler(uc usecase.IGlyphUsecase) *GlyphHandler {
	return &GlyphHandler{
		uc: uc,
	}
}

func (u *GlyphHandler) CreateGlyph(ctx *gin.Context) {
	var glyphjson json.GlyphJson
	if err := ctx.BindJSON(&glyphjson); err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}

}
