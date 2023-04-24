package repository

import (
	"context"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"golang.org/x/oauth2"
)

type IDiscordRepository interface {
	GetAuthURL(state string) string
	Exchange(ctx context.Context, code string) (*oauth2.Token, error)
	Refresh(ctx context.Context, token *oauth2.Token) (*oauth2.Token, error)
	GetMe(ctx context.Context) (*entity.User, error)
}
