package usecase

import (
	"context"
	"fmt"
	"log"
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
	DeleteGlyph(id string) error
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
	if glyph.Next_glyph == "" {
		return nil, fmt.Errorf("next_glyph empty")
	}
	if glyph.Prev_glyph == "" {
		return nil, fmt.Errorf("prev_glyph empty")
	}
	if glyph.Title == "" {
		return nil, fmt.Errorf("title empty")
	}
	if glyph.Content == "" {
		return nil, fmt.Errorf("content empty")
	}
	if !(glyph.Status == "Draft" || glyph.Status == "Private" || glyph.Status == "Public") {
		return nil, fmt.Errorf("status undefined")
	}
	now := time.Now()
	glyph.Created_at = now
	glyph.Updated_at = now
	glyph.Id = utils.GetUlid()
	log.Println(glyph)

	resglyph, err := uu.repo.CreateGlyph(ctx, glyph)
	log.Println(resglyph)
	return resglyph, err
}

func (uu *GlyphUsecase) DeleteGlyph(id string) error {
	if id == "" {
		return fmt.Errorf("id empty")
	}
	return nil
}
