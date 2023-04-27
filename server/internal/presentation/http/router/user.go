package router

import (
	"os"

	"github.com/Doer-org/glyph/internal/infrastructure/database"
	"github.com/Doer-org/glyph/internal/infrastructure/discord"
	"github.com/Doer-org/glyph/internal/infrastructure/persistance"

	"github.com/Doer-org/glyph/internal/presentation/http/handler"
	auth_middleware "github.com/Doer-org/glyph/internal/presentation/http/middleware"
	"github.com/Doer-org/glyph/internal/usecase"
)

func (r Router) InitUserRouter(conn *database.Conn) {
	repoauth := persistance.NewAuthRepository(conn)
	repodiscord := discord.NewClient(os.Getenv("DISCORD_CALLBACK_API"))
	repouser := persistance.NewUserRepository(conn)

	uc := usecase.NewUserUsecase(repouser)
	ac := usecase.NewAuthUsecase(repoauth, repodiscord, repouser)

	m := auth_middleware.NewAuth(ac)
	h := handler.NewUserHandler(uc)

	g := r.Engine.Group("/user", m.Authenticate())
	g.POST("/", h.CreateUser)
	g.GET("/:id", h.GetUser)
	g.DELETE("/:id", h.DeleteUser)
}
