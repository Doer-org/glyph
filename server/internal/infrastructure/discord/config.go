package discord

import (
	"os"

	"golang.org/x/oauth2"
)

type Discord struct {
	Config *oauth2.Config
}

func NewGoogle(redirecturl string) *Discord {
	return newGoogle(redirecturl)
}

func newGoogle(redirecturl string) *Discord {
	google := &Discord{
		Config: &oauth2.Config{
			ClientID:     os.Getenv("Google_ID"),
			ClientSecret: os.Getenv("Google_SECRET"),
			Scopes:       []string{"openid", "email", "profile"},
			RedirectURL:  redirecturl,
		},
	}
	return google
}
