package router

import (
	"os"

	"github.com/Doer-org/glyph/internal/infrastructure/database"
	"github.com/Doer-org/glyph/internal/infrastructure/discord"
	"github.com/Doer-org/glyph/internal/infrastructure/persistance"
	"github.com/Doer-org/glyph/internal/presentation/http/handler"
	"github.com/Doer-org/glyph/internal/usecase"
)

func (r Router) InitAuthRouter(conn *database.Conn) {
	repoauth := persistance.NewAuthRepository(conn)
	repouser := persistance.NewUserRepository(conn)
	repodiscord := discord.NewClient(os.Getenv("DISCORD_CALLBACK_API"))

	ac := usecase.NewAuthUsecase(repoauth, repodiscord, repouser)
	uc := usecase.NewUserUsecase(repouser)
	h := handler.NewAuthHandler(ac, uc)

	g := r.Engine.Group("/auth")
	g.GET("/login", h.Login)
	g.GET("/callback", h.Callback)
}
