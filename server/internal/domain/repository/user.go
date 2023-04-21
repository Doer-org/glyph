package repository

import (
	"context"

	"github.com/Doer-org/glyph/internal/domain/entity"
)

type IUserRepository interface {
	CreateUser(ctx context.Context, user *entity.User) (*entity.User, error)
}
