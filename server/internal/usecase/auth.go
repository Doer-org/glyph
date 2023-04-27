package usecase

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/utils"
	mycontext "github.com/Doer-org/glyph/utils/context"
	"golang.org/x/oauth2"
)

type Auth struct {
	repoAuth    repository.IAuthRepository
	discordRepo repository.IDiscordRepository
	userRepo    repository.IUserRepository
}
type IAuthUsecase interface {
	GetAuthURL(ctx context.Context, redirectURL string) (url string, state string, err error)
	Authorization(ctx context.Context, state, code string) (string, string, error)
	GetUserIdFromSession(ctx context.Context, sessionId string) (string, error)
	GetTokenByUserId(ctx context.Context, userId string) (*oauth2.Token, error)
	RefreshAccessToken(ctx context.Context, userId string, token *oauth2.Token) (*oauth2.Token, error)
	DeleteSession(ctx context.Context, sessionID string) error
	CheckSessionExpiry(ctx context.Context, sessionID string) (bool, error)
}

func NewAuthUsecase(ra repository.IAuthRepository, rg repository.IDiscordRepository, ur repository.IUserRepository) IAuthUsecase {
	return &Auth{repoAuth: ra, discordRepo: rg, userRepo: ur}
}
func (uc *Auth) GetAuthURL(ctx context.Context, redirectURL string) (url string, resstate string, err error) {
	state := utils.GetUlid()
	st := &entity.AuthStates{State: state, RedirectURL: redirectURL}
	if err := uc.repoAuth.StoreState(ctx, st); err != nil {
		return "", "", fmt.Errorf("storeState: %w", err)
	}
	return uc.discordRepo.GetAuthURL(state), state, nil
}
func (uc *Auth) Authorization(ctx context.Context, state, code string) (string, string, error) {
	storedState, err := uc.repoAuth.FindStateByState(ctx, state)
	if err != nil {
		return "", "", fmt.Errorf("findStateByState: %w", err)
	}
	token, err := uc.discordRepo.Exchange(ctx, code)
	if err != nil {
		return storedState.RedirectURL, "", fmt.Errorf("exchange: %w", err)
	}
	ctx = mycontext.SetToken(ctx, token)
	userId, err := uc.createUserIfNotExists(ctx)
	if err != nil {
		return storedState.RedirectURL, "", fmt.Errorf("createUserIfNotExists: %w", err)
	}
	if err := uc.repoAuth.StoreORUpdateToken(ctx, userId, token); err != nil {
		return storedState.RedirectURL, "", fmt.Errorf("storeORUpdateToken: %w", err)
	}
	sessionID := utils.GetUlid()
	if err := uc.repoAuth.StoreSession(ctx, sessionID, userId); err != nil {
		return storedState.RedirectURL, "", fmt.Errorf("storeSession: %w", err)
	}
	if err := uc.repoAuth.DeleteState(ctx, state); err != nil {
		return storedState.RedirectURL, sessionID, nil
	}
	return storedState.RedirectURL, sessionID, nil
}
func (uc *Auth) createUserIfNotExists(ctx context.Context) (string, error) {
	user, err := uc.discordRepo.GetMe(ctx)
	if err != nil {
		return "", fmt.Errorf("getMe: %w", err)
	}
	_, err = uc.userRepo.GetUser(context.Background(), user.Id)
	if err != nil && err == sql.ErrNoRows {
		user, err = uc.userRepo.CreateUser(context.Background(), user)
		if err != nil {
			return "", err
		}
	}
	if err != nil {
		return "", err
	}
	return user.Id, err
}
func (uc *Auth) GetUserIdFromSession(ctx context.Context, sessionId string) (string, error) {
	userId, err := uc.repoAuth.GetUserIdFromSession(ctx, sessionId)
	if err != nil {
		return "", fmt.Errorf("getUserIDFromSession: %w", err)
	}
	return userId, nil
}
func (uc *Auth) GetTokenByUserId(ctx context.Context, userId string) (*oauth2.Token, error) {
	token, err := uc.repoAuth.GetTokenByUserID(ctx, userId)
	if err != nil {
		return nil, fmt.Errorf("getTokenByUserID: %w", err)
	}
	return token, nil
}
func (uc *Auth) RefreshAccessToken(ctx context.Context, userId string, token *oauth2.Token) (*oauth2.Token, error) {
	if token.Valid() {
		return token, nil
	}
	newToken, err := uc.discordRepo.Refresh(ctx, token)
	if err != nil {
		return nil, fmt.Errorf("refresh: %w", err)
	}
	if err := uc.repoAuth.StoreORUpdateToken(ctx, userId, newToken); err != nil {
		return nil, fmt.Errorf("storeORUpdateToken: %w", err)
	}
	return newToken, nil
}
func (uc *Auth) DeleteSession(ctx context.Context, sessionID string) error {
	if sessionID == "" {
		return fmt.Errorf("sessionid is empty")
	}
	err := uc.repoAuth.DeleteSession(ctx, sessionID)
	return err
}
func (uc *Auth) CheckSessionExpiry(ctx context.Context, sessionID string) (bool, error) {
	if sessionID == "" {
		return false, fmt.Errorf("sessionid is empty")
	}
	expiry, err := uc.repoAuth.GetExpiryFromSession(ctx, sessionID)
	if err != nil {
		return false, fmt.Errorf("GetExpiryFromSession: %w", err)
	}
	if expiry.Before(time.Now()) {
		return false, nil
	}
	return true, nil
}
