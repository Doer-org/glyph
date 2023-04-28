package repository

import (
	"context"
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"golang.org/x/oauth2"
)

type IAuthRepository interface {
	GetTokenByUserID(ctx context.Context, userId string) (*oauth2.Token, error)
	StoreSession(ctx context.Context, sessionId string, userId string) error
	GetUserIdFromSession(ctx context.Context, sessionId string) (string, error)
	StoreToken(ctx context.Context, userId string, token *oauth2.Token) error
	UpdateToken(ctx context.Context, userId string, token *oauth2.Token) error
	StoreState(ctx context.Context, authState *entity.AuthStates) error
	FindStateByState(ctx context.Context, state string) (*entity.AuthStates, error)
	DeleteState(ctx context.Context, state string) error
	StoreORUpdateToken(ctx context.Context, userId string, token *oauth2.Token) error
	DeleteSession(ctx context.Context, sessionID string) error
	GetExpiryFromSession(ctx context.Context, sessionId string) (time.Time, error)
}
