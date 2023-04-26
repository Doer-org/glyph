package handler

import (
	"fmt"
	"net/http"

	"github.com/Doer-org/glyph/internal/usecase"
	"github.com/Doer-org/glyph/log"
	"github.com/Doer-org/glyph/utils/auth"
	"github.com/Doer-org/glyph/utils/clock"
	"github.com/gin-gonic/gin"
)

const oneWeek = 60 * 60 * 24 * 7

// TODO:logout apiも作る必要あり
type AuthHandler struct {
	authUC usecase.IAuthUsecase
	userUC usecase.IUserUsecase
}

func NewAuthHandler(auc usecase.IAuthUsecase, uuc usecase.IUserUsecase) AuthHandler {
	return AuthHandler{
		authUC: auc,
		userUC: uuc,
	}
}

func (u *AuthHandler) Login(ctx *gin.Context) {
	logger := log.New()
	redirectURL := ctx.Query("redirect_url")
	url, _, err := u.authUC.GetAuthURL(ctx, redirectURL)
	if err != nil {
		logger.Error("", map[string]string{"place": "login", "error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	ctx.Redirect(http.StatusFound, url)
}

func (u *AuthHandler) Callback(ctx *gin.Context) {
	logger := log.New()
	if errFormValue := ctx.Query("error"); errFormValue != "" {
		logger.Error("", map[string]string{"place": "callback", "type": "discord auth err", "error": errFormValue})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": errFormValue},
		)
		return
	}
	state := ctx.Query("state")
	if state == "" {
		logger.Error("", map[string]string{"place": "callback", "type": "discord auth err", "error": "state empty"})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": fmt.Errorf("state empty")},
		)
		return
	}

	code := ctx.Query("code")
	if code == "" {
		logger.Error("", map[string]string{"place": "callback", "type": "discord auth err", "error": "code empty"})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": fmt.Errorf("code empty")},
		)
		return
	}
	redirectURL, sessionID, err := u.authUC.Authorization(ctx, state, code)
	if err != nil {
		logger.Error("", map[string]string{"place": "callback", "type": "discord auth err", "error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	if redirectURL == "" {
		logger.Error("", map[string]string{"place": "callback", "type": "discord auth err", "error": "redirect url empty"})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": fmt.Errorf("redirect url empty")},
		)
		return
	}
	clocker := clock.RealClocker{}
	jwter, err := auth.NewJWTer(clocker)
	if err != nil {
		logger.Error("", map[string]string{"place": "callback", "type": "jwter generate err", "error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	jwt, err := jwter.GenerateToken(ctx, sessionID)
	if err != nil {
		logger.Error("", map[string]string{"place": "callback", "type": "jwt generate err", "error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}

	ctx.JSON(
		http.StatusOK,
		gin.H{"data": string(jwt)},
	)

}
