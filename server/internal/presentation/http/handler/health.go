package handler

import (
	"net/http"

	"github.com/Doer-org/glyph/log"

	"github.com/gin-gonic/gin"
)

func HealthHandler(ctx *gin.Context) {
	logger := log.New()
	logger.Info("", "helth : good")
	logger.Error("", "health : good")
	ctx.JSON(
		http.StatusOK,
		gin.H{"health": "good!"},
	)
}
