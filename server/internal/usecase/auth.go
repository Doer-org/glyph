package usecase

import (
	"context"
	"fmt"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/utils"
	"golang.org/x/oauth2"
)

type Auth struct {
	repoAuth    repository.IAuthRepository
	discordRepo repository.IDiscordRepository
	userRepo    repository.IUserRepository
}

type IAuthRepository interface {
	GetAuthURL(ctx context.Context, redirectURL string) (url string, state string, err error)
	Authorization(ctx context.Context, state, code string) (string, string, error)
	GetUserIdFromSession(ctx context.Context, sessionId string) (string, error)
	GetTokenByUserId(ctx context.Context, userId string) (*oauth2.Token, error)
	RefreshAccessToken(ctx context.Context, userId string, token *oauth2.Token) (*oauth2.Token, error)
	DeleteSession(ctx context.Context, sessionID string) error
	CheckSessionExpiry(ctx context.Context, sessionID string) (bool, error)
}

func NewAuth(ra repository.IAuthRepository, rg repository.IDiscordRepository, ur repository.IUserRepository) IAuthRepository {
	return &Auth{
		repoAuth:    ra,
		discordRepo: rg,
		userRepo:    ur,
	}
}

func (uc *Auth) GetAuthURL(ctx context.Context, redirectURL string) (url string, resstate string, err error) {
	state := utils.GetUlid()
	st := &entity.AuthStates{
		State:       state,
		RedirectURL: redirectURL,
	}
	if err := uc.repoAuth.StoreState(ctx, st); err != nil {
		return "", "", fmt.Errorf("storeState: %w", err)
	}

	return uc.discordRepo.GetAuthURL(state), state, nil
}

func (uc *Auth) Authorization(ctx context.Context, state, code string) (string, string, error) {

}

func (uc *Auth) createUserIfNotExists(ctx context.Context) (string, error) {
	
}
