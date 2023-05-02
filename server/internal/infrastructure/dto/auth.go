package dto

import (
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
)

type LoginSessionsDto struct {
	Id     string    `db:"id"`
	UserID string    `db:"user_id"`
	Expiry time.Time `db:"expiry"`
}

type AuthStatesDto struct {
	State       string `db:"state"`
	RedirectURL string `db:"redirect_url"`
}

type DiscordAuthDto struct {
	UserID       string    `db:"user_id"`
	AccessToken  string    `db:"access_token"`
	RefreshToken string    `db:"refresh_token"`
	Expiry       time.Time `db:"expiry"`
}

func LoginSessionDtoToEntity(dto *LoginSessionsDto) *entity.LoginSessions {
	return &entity.LoginSessions{
		ID:     dto.Id,
		UserID: dto.UserID,
		Expiry: dto.Expiry,
	}
}

func LoginSessionEntityToDto(u *entity.LoginSessions) LoginSessionsDto {
	return LoginSessionsDto{
		Id:     u.ID,
		UserID: u.UserID,
		Expiry: u.Expiry,
	}
}

func AuthStatesEntityToDto(u *entity.AuthStates) AuthStatesDto {
	return AuthStatesDto{
		State:       u.State,
		RedirectURL: u.RedirectURL,
	}
}

func AuthStatesDtoToEntity(dto *AuthStatesDto) *entity.AuthStates {
	return &entity.AuthStates{
		State:       dto.State,
		RedirectURL: dto.RedirectURL,
	}
}
