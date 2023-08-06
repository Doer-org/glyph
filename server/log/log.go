package log

import (
	"os"

	"github.com/seipan/loghook"
)

func New() *loghook.Logger {
	logger := loghook.NewLogger(os.Getenv("LOGIMG"), os.Getenv("LOGNAME"), "discord", os.Getenv("WEBHOOKURL"))
	logger.NoSendDebug()
	logger.SetErrorWebhook(os.Getenv("ERRORWEBHOOKURL"))
	return logger
}
