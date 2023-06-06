package log

import (
	"os"

	"github.com/seipan/logdis"
)

func New() *logdis.Logger {
	logger := logdis.NewLogger(os.Getenv("WEBHOOKURL"), os.Getenv("LOGIMG"), os.Getenv("LOGNAME"))
	logger.SetErrorWebhook(os.Getenv("ERRORWEBHOOKURL"))
	return logger
}
