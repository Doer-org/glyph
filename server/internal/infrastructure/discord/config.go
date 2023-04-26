package discord

import (
	"os"

	"golang.org/x/oauth2"
)

type Discord struct {
	Config *oauth2.Config
}

func NewDiscord(redirecturl string) *Discord {
	return newDiscord(redirecturl)
}

func newDiscord(redirecturl string) *Discord {
	discord := &Discord{
		Config: &oauth2.Config{
			ClientID:     os.Getenv("Discord_ID"),
			ClientSecret: os.Getenv("Discord_SECRET"),
			Endpoint:     endpoint,
			Scopes:       []string{"openid", "email", "profile"},
			RedirectURL:  redirecturl,
		},
	}
	return discord
}

var endpoint = oauth2.Endpoint{
	AuthURL:  "https://discord.com/oauth2/authorize",
	TokenURL: "https://discordapp.com/api/oauth2/token",
}
