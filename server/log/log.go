package log

import (
	"os"

	"github.com/seipan/logdis"
)

func New() *logdis.Logger {
	logger := logdis.NewLogger(os.Getenv("WEBHOOKURL"), os.Getenv("LOGIMG"), os.Getenv("LOGNAME"))
	return logger
}
