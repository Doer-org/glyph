package log

import (
	"log"
	"os"

	"github.com/seipan/logdis"
)

func New() *logdis.Logger {
	logger := logdis.NewLogger(os.Getenv("WEBHOOKURL"), os.Getenv("LOGIMG"), os.Getenv("LOGNAME"))
	log.Println(os.Getenv("WEBHOOKURL"))
	log.Println(os.Getenv("LOGIMG"))
	log.Println(os.Getenv("LOGNAME"))
	return logger
}
