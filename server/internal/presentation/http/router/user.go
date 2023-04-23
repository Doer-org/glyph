package router

import (
	"github.com/Doer-org/glyph/internal/infrastructure/database"
	"github.com/Doer-org/glyph/internal/infrastructure/persistance"
	"github.com/Doer-org/glyph/internal/presentation/http/handler"
	"github.com/Doer-org/glyph/internal/usecase"
)

func (r Router) InitUserRouter(conn *database.Conn) {
	repo := persistance.NewUserRepository(conn)
	uc := usecase.NewUserUsecase(repo)
	h := handler.NewUserHandler(uc)

	g := r.Engine.Group("/user")
	g.POST("/", h.CreateUser)
	g.GET("/:id", h.GetUser)
	g.DELETE("/:id", h.DeleteUser)
}
