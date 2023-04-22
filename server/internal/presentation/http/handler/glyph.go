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
	var j json.GlyphJson
	if err := ctx.BindJSON(&j); err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	glyph, err := u.uc.CreateGlyph(ctx, json.GlyphJsonToEntity(&j))
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	glyphjson := json.GlyphEntityToJson(glyph)
	ctx.JSON(
		http.StatusCreated,
		gin.H{"data": glyphjson},
	)

}

func (u *GlyphHandler) DeleteGlyph(ctx *gin.Context) {
	id := ctx.Param("id")
	err := u.uc.DeleteGlyph(id)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	ctx.JSON(
		http.StatusCreated,
		gin.H{"data": "success"},
	)

}
