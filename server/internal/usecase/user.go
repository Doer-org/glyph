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
