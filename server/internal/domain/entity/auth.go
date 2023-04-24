package entity

import (
	"time"
)

type LoginSessions struct {
	ID     string
	UserID string
	Expiry time.Time
}

type AuthStates struct {
	State       string
	RedirectURL string
}

type GoogleAuth struct {
	UserID       string
	AccessToken  string
	RefreshToken string
	Expiry       time.Time
}
