package repository

import (
	"context"

	"github.com/Doer-org/glyph/internal/domain/entity"
)

type IIMageRepositry interface {
	CreateImage(ctx context.Context, image *entity.Image) (*entity.Image, error)
	GetImage(ctx context.Context, id string) (*entity.Image, error)
	GetImageALL(ctx context.Context) (entity.Images, error)
	DeleteImage(ctx context.Context, id string) error
}
