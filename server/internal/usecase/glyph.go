package usecase

import (
	"context"
	"fmt"
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/utils"
)

var _ IGlyphUsecase = &GlyphUsecase{}

type GlyphUsecase struct {
	repo repository.IGlyphRepository
}

type IGlyphUsecase interface {
	CreateGlyph(ctx context.Context, glyph *entity.Glyph) (*entity.Glyph, error)
	ReadGlyph(ctx context.Context, id string) (*entity.Glyph, error)
	ReadGlyphsbyUserId(ctx context.Context, author_id string) (entity.Glyphs, error)
	ReadAllGlyphs(ctx context.Context) (entity.Glyphs, error)
	ReadRelativeAllGlyphs(ctx context.Context, id string) (entity.Glyphs, error)
	EditGlyph(ctx context.Context, glyph *entity.Glyph, id string) (*entity.Glyph, error)
	DeleteGlyph(ctx context.Context, id string) error
}

func NewGlyphUsecase(repo repository.IGlyphRepository) IGlyphUsecase {
	return &GlyphUsecase{
		repo: repo,
	}
}

func (uu *GlyphUsecase) CreateGlyph(ctx context.Context, glyph *entity.Glyph) (*entity.Glyph, error) {
	if glyph.Author_id == "" {
		return nil, fmt.Errorf("author_id empty")
	}
	if glyph.Title == "" {
		return nil, fmt.Errorf("title empty")
	}
	if glyph.Content == "" {
		return nil, fmt.Errorf("content empty")
	}
	if !(glyph.Status == "Draft" || glyph.Status == "Private" || glyph.Status == "Public") {
		return nil, fmt.Errorf("status types error")
	}
	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		return nil, fmt.Errorf("can't get time")
	}
	now := time.Now().In(jst)
	glyph.Created_at = now
	glyph.Updated_at = now
	glyph.Id = utils.GetUlid()

	resglyph, err := uu.repo.CreateGlyph(ctx, glyph)
	return resglyph, err
}

func (uu *GlyphUsecase) ReadGlyph(ctx context.Context, id string) (*entity.Glyph, error) {
	if id == "" {
		return nil, fmt.Errorf("id empty")
	}
	resglyph, err := uu.repo.ReadGlyph(ctx, id)
	return resglyph, err

}

func (uu *GlyphUsecase) ReadGlyphsbyUserId(ctx context.Context, author_id string) (entity.Glyphs, error) {
	if author_id == "" {
		return nil, fmt.Errorf("author_id empty")
	}
	resglyphs, err := uu.repo.ReadGlyphsbyUserId(ctx, author_id)
	return resglyphs, err
}

func (uu *GlyphUsecase) ReadAllGlyphs(ctx context.Context) (entity.Glyphs, error) {
	resglyphs, err := uu.repo.ReadAllGlyphs(ctx)
	return resglyphs, err
}

func (uu *GlyphUsecase) ReadRelativeAllGlyphs(ctx context.Context, id string) (entity.Glyphs, error) {
	if id == "" {
		return nil, fmt.Errorf("id empty")
	}
	resglyphs, err := uu.repo.ReadRelativeAllGlyphs(ctx, id)
	return resglyphs, err
}

func (uu *GlyphUsecase) EditGlyph(ctx context.Context, glyph *entity.Glyph, id string) (*entity.Glyph, error) {
	if id == "" {
		return nil, fmt.Errorf("id empty")
	}
	if glyph.Title == "" {
		return nil, fmt.Errorf("title empty")
	}
	if glyph.Content == "" {
		return nil, fmt.Errorf("content empty")
	}
	if !(glyph.Status == "Draft" || glyph.Status == "Private" || glyph.Status == "Public") {
		return nil, fmt.Errorf("status types error")
	}
	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		return nil, fmt.Errorf("can't get time")
	}
	now := time.Now().In(jst)
	glyph.Updated_at = now

	resglyph, err := uu.repo.EditGlyph(ctx, glyph, id)
	return resglyph, err
}

func (uu *GlyphUsecase) DeleteGlyph(ctx context.Context, id string) error {
	if id == "" {
		return fmt.Errorf("id empty")
	}
	err := uu.repo.DeleteGlyph(ctx, id)
	return err
}
