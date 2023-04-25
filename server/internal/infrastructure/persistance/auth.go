package persistance

import (
	"context"
	"fmt"
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
}

func (repo *AuthRepository) DeleteSession(ctx context.Context, sessionID string) error {
}

func (repo *AuthRepository) GetUserIdFromSession(ctx context.Context, sessionId string) (string, error) {
}

func (repo *AuthRepository) StoreState(ctx context.Context, authState *entity.AuthStates) error {
}

func (repo *AuthRepository) FindStateByState(ctx context.Context, state string) (*entity.AuthStates, error) {

}
func (repo *AuthRepository) DeleteState(ctx context.Context, state string) error {
}

func (repo *AuthRepository) GetExpiryFromSession(ctx context.Context, sessionId string) (time.Time, error) {
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
