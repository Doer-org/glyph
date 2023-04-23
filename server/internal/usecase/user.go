package usecase

import (
	"context"
	"fmt"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/utils"
)

var _ IUserUsecase = &UserUsecase{}

type UserUsecase struct {
	repo repository.IUserRepository
}

type IUserUsecase interface {
	CreateUser(ctx context.Context, user *entity.User) (*entity.User, error)
	DeleteUser(ctx context.Context, id string) error
	GetUser(ctx context.Context, id string) (*entity.User, error)
}

func NewUserUsecase(repo repository.IUserRepository) IUserUsecase {
	return &UserUsecase{
		repo: repo,
	}
}

func (uu *UserUsecase) CreateUser(ctx context.Context, user *entity.User) (*entity.User, error) {
	if user.Name == "" {
		return nil, fmt.Errorf("user name empty")
	}
	if user.Img == "" {
		return nil, fmt.Errorf("img name empty")
	}
	id := utils.GetUlid()
	user.Id = id

	resuser, err := uu.repo.CreateUser(ctx, user)
	return resuser, err
}

func (uu *UserUsecase) DeleteUser(ctx context.Context, id string) error {
	if id == "" {
		return fmt.Errorf("id empty")
	}
	err := uu.repo.DeleteUser(ctx, id)
	return err
}

func (uu *UserUsecase) GetUser(ctx context.Context, id string) (*entity.User, error) {
	if id == "" {
		return nil, fmt.Errorf("id empty")
	}
	resuser, err := uu.repo.GetUser(ctx, id)
	return resuser, err
}
