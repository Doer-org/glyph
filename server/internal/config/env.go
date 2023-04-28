package config

import (
	"fmt"
	"os"

	"github.com/Doer-org/glyph/log"
)

func EnvCheck() error {
	discordCallback := os.Getenv("DISCORD_CALLBACK_API")
	discordId := os.Getenv("DISCORD_ID")
	discordSecret := os.Getenv("DISCORD_SECRET")
	discordGetme := os.Getenv("DISCORD_GETME")
	discordGetserver := os.Getenv("DISCORD_GETSERVER")
	serverDiscordId := os.Getenv("SERVER_DISCORD_ID")
	if discordCallback == "" || discordId == "" || discordSecret == "" || discordGetme == "" || discordGetserver == "" || serverDiscordId == "" {
		return fmt.Errorf("ERROR : discord env empty , callback : %s, id : %s,discordSecret : %s,discordGetme : %s,discordGetserver : %s,serverDiscordId : %s",
			discordCallback, discordId, discordSecret, discordGetme, discordGetserver, serverDiscordId)
	}
	logger := log.New()
	logger.Info("", fmt.Sprintf("INFO : discord env , callback : %s, id : %s,discordSecret : %s,discordGetme : %s,discordGetserver : %s,serverDiscordId : %s",
		discordCallback, discordId, discordSecret, discordGetme, discordGetserver, serverDiscordId))

	return nil
}
