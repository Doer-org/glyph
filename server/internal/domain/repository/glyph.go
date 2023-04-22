package repository

import (
	"context"

	"github.com/Doer-org/glyph/internal/domain/entity"
)

type IGlyphRepository interface {
	CreateGlyph(ctx context.Context, glyph *entity.Glyph) (*entity.Glyph, error)
	// ReadGlyph(id string) (entity.Glyph, error)
	// ReadAllGlyphs() (entity.Glyphs, error)
	// ReadRelativeAllGlyphs(id string) (entity.Glyphs, error)
	// EditGlyph(id string, title string, content string, status string) (*entity.Glyph, error)
	DeleteGlyph(id string) error
}
