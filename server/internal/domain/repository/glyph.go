package repository

import (
	"context"

	"github.com/Doer-org/glyph/internal/domain/entity"
)

type IGlyphRepository interface {
	CreateGlyph(ctx context.Context, glyph *entity.Glyph) (*entity.Glyph, error)
	ReadGlyph(ctx context.Context, id string) (*entity.Glyph, error)
	ReadAllGlyphs(ctx context.Context) (entity.Glyphs, error)
	ReadRelativeAllGlyphs(ctx context.Context, id string) (entity.Glyphs, error)
	EditGlyph(ctx context.Context, glyph *entity.Glyph) (*entity.Glyph, error)
	DeleteGlyph(ctx context.Context, id string) error
}
