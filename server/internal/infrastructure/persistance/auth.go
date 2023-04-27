package persistance

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/internal/infrastructure/database"
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
	log.Println("test")
	log.Println("test2")
	dto := discordAuthDto{}
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
	dto := discordAuthDto{}
	dto.UserID = userId
	dto.AccessToken = token.AccessToken
	dto.RefreshToken = token.RefreshToken
	dto.Expiry = token.Expiry

	query := `
	UPDATE discord_auths
	SET access_toke   = :access_token,
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
	var dto discordAuthDto

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
	dto := &loginSessionsDto{}
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
	var dto loginSessionsDto

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
	var dto loginSessionsDto

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
	dto := authStatesEntityToDto(authState)
	query := `
	INSERT INTO auth_states (state, redirect_url)
	VALUES (:state, :redirect_url)
	`

	_, err := repo.conn.DB.NamedExecContext(ctx, query, &dto)
	return err
}

func (repo *AuthRepository) FindStateByState(ctx context.Context, state string) (*entity.AuthStates, error) {
	var dto authStatesDto
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
	return authStatesDtoToEntity(&dto), nil
}
func (repo *AuthRepository) DeleteState(ctx context.Context, state string) error {
	query := `
	DELETE FROM auth_states
	WHERE state = :state
	`
	_, err := repo.conn.DB.NamedExecContext(ctx, query, map[string]interface{}{"state": state})
	return err
}

type loginSessionsDto struct {
	Id     string    `db:"id"`
	UserID string    `db:"user_id"`
	Expiry time.Time `db:"expiry"`
}

type authStatesDto struct {
	State       string `db:"state"`
	RedirectURL string `db:"redirect_url"`
}

type discordAuthDto struct {
	UserID       string    `db:"user_id"`
	AccessToken  string    `db:"access_token"`
	RefreshToken string    `db:"refresh_token"`
	Expiry       time.Time `db:"expiry"`
}

func loginSessionDtoToEntity(dto *loginSessionsDto) *entity.LoginSessions {
	return &entity.LoginSessions{
		ID:     dto.Id,
		UserID: dto.UserID,
		Expiry: dto.Expiry,
	}
}

func loginSessionEntityToDto(u *entity.LoginSessions) loginSessionsDto {
	return loginSessionsDto{
		Id:     u.ID,
		UserID: u.UserID,
		Expiry: u.Expiry,
	}
}

func authStatesEntityToDto(u *entity.AuthStates) authStatesDto {
	return authStatesDto{
		State:       u.State,
		RedirectURL: u.RedirectURL,
	}
}

func authStatesDtoToEntity(dto *authStatesDto) *entity.AuthStates {
	return &entity.AuthStates{
		State:       dto.State,
		RedirectURL: dto.RedirectURL,
	}
}
