package usecase

import (
	"context"
	"fmt"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
)

var _ IImageUsecase = &ImageUsecase{}

type ImageUsecase struct {
	repo repository.IIMageRepositry
}

type IImageUsecase interface {
	CreateImage(ctx context.Context, image *entity.Image) (*entity.Image, error)
	GetImagebyId(ctx context.Context, id string) (*entity.Image, error)
	GetImageALL(ctx context.Context) (entity.Images, error)
	DeleteImage(ctx context.Context, id string) error
}

func NewImageUsecase(repo repository.IIMageRepositry) IImageUsecase {
	return &ImageUsecase{
		repo: repo,
	}
}

func (uc *ImageUsecase) CreateImage(ctx context.Context, image *entity.Image) (*entity.Image, error) {
	return uc.repo.CreateImage(ctx, image)
}

func (uc *ImageUsecase) GetImagebyId(ctx context.Context, id string) (*entity.Image, error) {
	if id == "" {
		return nil, fmt.Errorf("id is empty")
	}
	return uc.repo.GetImagebyId(ctx, id)
}

func (uc *ImageUsecase) GetImageALL(ctx context.Context) (entity.Images, error) {
	return uc.repo.GetImageALL(ctx)
}

func (uc *ImageUsecase) DeleteImage(ctx context.Context, id string) error {
	if id == "" {
		return fmt.Errorf("id is empty")
	}
	return uc.repo.DeleteImage(ctx, id)
}
