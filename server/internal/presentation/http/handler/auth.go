package handler

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/Doer-org/glyph/internal/usecase"
	"github.com/Doer-org/glyph/log"
	jwt "github.com/form3tech-oss/jwt-go"
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

	claims := jwt.MapClaims{
		"session": sessionID,
		"exp":     time.Now().Add(time.Hour * 72).Unix(), // 72時間が有効期限
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	accessToken, _ := token.SignedString([]byte(os.Getenv("rawPrivKey")))
	ctx.Header("token", accessToken)
	ctx.Redirect(http.StatusFound, redirectURL)
}

func (u *AuthHandler) Validate(ctx *gin.Context) {
	ctx.JSON(
		http.StatusOK,
		gin.H{"validate": "success"},
	)
}

func (u *AuthHandler) Logout(ctx *gin.Context) {
	logger := log.New()
	tokenString := ctx.Request.Header.Get("jwt")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("rawPrivKey")), nil
	})
	if err != nil {
		logger.Error("", map[string]string{"place": "auth middleware", "type": "auth err", "error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	str := ""
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		str, ok = claims["session"].(string)
		if !ok {
			logger.Error("", map[string]string{"place": "logout", "type": "auth err", "error": "kata asa-sion"})
			ctx.JSON(
				http.StatusBadRequest,
				gin.H{"error": fmt.Errorf("kata asa-sion")},
			)
			return
		}
	} else {
		logger.Error("", map[string]string{"place": "logout", "type": "auth err ", "error": "token empty"})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": fmt.Errorf("token empty")},
		)
		return
	}
	err = u.authUC.DeleteSession(ctx, str)
	if err != nil {
		logger.Error("", map[string]string{"place": "logout", "type": "delete session", "error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	ctx.JSON(
		http.StatusOK,
		gin.H{"logout": "success"},
	)
}
