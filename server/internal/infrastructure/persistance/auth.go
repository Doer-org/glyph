package persistance

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/internal/infrastructure/database"
	d "github.com/Doer-org/glyph/internal/infrastructure/persistance/dto"
	"golang.org/x/oauth2"
)

var _ repository.IAuthRepository = &AuthRepository{}

type AuthRepository struct {
	conn *database.Conn
}

func NewAuthRepository(conn *database.Conn) repository.IAuthRepository {
	return &AuthRepository{
		conn: conn,
	}
}

func (repo *AuthRepository) StoreToken(ctx context.Context, userId string, token *oauth2.Token) error {
	
	dto := d.DiscordAuthDto{}
	dto.UserID = userId
	dto.AccessToken = token.AccessToken
	dto.RefreshToken = token.RefreshToken
	dto.Expiry = token.Expiry

	query := `
	INSERT INTO discord_auths (user_id, access_token, refresh_token, expiry)
	VALUES (:user_id,:access_token,:refresh_token,:expiry)
	`
	_, err := repo.conn.DB.NamedExecContext(ctx, query, &dto)
	return err
}

func (repo *AuthRepository) UpdateToken(ctx context.Context, userId string, token *oauth2.Token) error {
	dto := d.DiscordAuthDto{}
	dto.UserID = userId
	dto.AccessToken = token.AccessToken
	dto.RefreshToken = token.RefreshToken
	dto.Expiry = token.Expiry

	query := `
	UPDATE discord_auths
	SET access_token   = :access_token,
			refresh_token = :refresh_token,
			expiry        = :expiry
	WHERE user_id 	= :user_id
	`
	_, err := repo.conn.DB.NamedExecContext(ctx, query, &dto)
	return err
}

func (repo *AuthRepository) StoreORUpdateToken(ctx context.Context, userId string, token *oauth2.Token) error {
	found, err := repo.GetTokenByUserID(ctx, userId)
	if err != nil && err != sql.ErrNoRows {
		return err
	}
	if found != nil {
		if err := repo.UpdateToken(ctx, userId, token); err != nil {
			return err
		}
	} else if err == sql.ErrNoRows {
		if err := repo.StoreToken(ctx, userId, token); err != nil {
			return fmt.Errorf("storeToken: %w", err)
		}
	} else {
		return fmt.Errorf("found is empty, and ent is not found")
	}
	return nil
}

func (repo *AuthRepository) GetTokenByUserID(ctx context.Context, userId string) (*oauth2.Token, error) {
	var dto d.DiscordAuthDto

	query := `
	SELECT *
	FROM discord_auths
	WHERE user_id = ?
	LIMIT 1
	`
	err := repo.conn.DB.GetContext(ctx, &dto, query, userId)
	if err != nil {
		return nil, err
	}
	return &oauth2.Token{
		AccessToken:  dto.AccessToken,
		RefreshToken: dto.RefreshToken,
		Expiry:       dto.Expiry,
	}, nil
}

func (repo *AuthRepository) StoreSession(ctx context.Context, sessionID string, userId string) error {
	dto := &d.LoginSessionsDto{}
	dto.Id = sessionID
	dto.UserID = userId
	dto.Expiry = time.Now().Add(time.Hour * 24 * 1)

	query := `
	INSERT INTO login_sessions (id, user_id, expiry)
	VALUES (:id, :user_id, :expiry)
	`
	_, err := repo.conn.DB.NamedExecContext(ctx, query, &dto)
	return err
}

func (repo *AuthRepository) DeleteSession(ctx context.Context, sessionID string) error {
	query := `
	DELETE FROM login_sessions
	WHERE id = :id
	`
	_, err := repo.conn.DB.NamedExecContext(ctx, query, map[string]interface{}{"id": sessionID})
	return err
}

func (repo *AuthRepository) GetUserIdFromSession(ctx context.Context, sessionId string) (string, error) {
	var dto d.LoginSessionsDto

	query := `
	SELECT *
	FROM login_sessions
	WHERE id = ?
	LIMIT 1
	`
	err := repo.conn.DB.GetContext(ctx, &dto, query, sessionId)
	if err != nil {
		return "", err
	}
	return dto.UserID, nil
}

func (repo *AuthRepository) GetExpiryFromSession(ctx context.Context, sessionId string) (time.Time, error) {
	var dto d.LoginSessionsDto

	query := `
	SELECT *
	FROM login_sessions
	WHERE id = ?
	LIMIT 1
	`
	err := repo.conn.DB.GetContext(ctx, &dto, query, sessionId)
	if err != nil {
		return time.Time{}, err
	}
	return dto.Expiry, nil
}

func (repo *AuthRepository) StoreState(ctx context.Context, authState *entity.AuthStates) error {
	dto := d.AuthStatesEntityToDto(authState)
	query := `
	INSERT INTO auth_states (state, redirect_url)
	VALUES (:state, :redirect_url)
	`

	_, err := repo.conn.DB.NamedExecContext(ctx, query, &dto)
	return err
}

func (repo *AuthRepository) FindStateByState(ctx context.Context, state string) (*entity.AuthStates, error) {
	var dto d.AuthStatesDto
	query := `
	SELECT *
	FROM auth_states
	WHERE state = ?
	LIMIT 1
	`

	err := repo.conn.DB.GetContext(ctx, &dto, query, state)
	if err != nil {
		return nil, err
	}
	return d.AuthStatesDtoToEntity(&dto), nil
}

func (repo *AuthRepository) DeleteState(ctx context.Context, state string) error {
	query := `
	DELETE FROM auth_states
	WHERE state = :state
	`
	_, err := repo.conn.DB.NamedExecContext(ctx, query, map[string]interface{}{"state": state})
	return err
}

