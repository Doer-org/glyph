package usecase

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
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

	resuser, err := uu.repo.CreateUser(ctx, user)
	return resuser, err
}

func (uu *UserUsecase) DeleteUser(ctx context.Context, id string) error {
	if id == "" {
		return fmt.Errorf("id empty")
	}
	_, err := uu.GetUser(ctx, id)
	if err == sql.ErrNoRows {
		return fmt.Errorf("The user with this id does not exist")
	}
	err = uu.repo.DeleteUser(ctx, id)
	return err
}

func (uu *UserUsecase) GetUser(ctx context.Context, id string) (*entity.User, error) {
	if id == "" {
		return nil, fmt.Errorf("id empty")
	}
	resuser, err := uu.repo.GetUser(ctx, id)
	return resuser, err
}
