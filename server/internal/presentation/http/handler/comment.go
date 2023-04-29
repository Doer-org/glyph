package handler

import (
	"net/http"

	"github.com/Doer-org/glyph/internal/presentation/http/json"
	"github.com/Doer-org/glyph/internal/usecase"
	"github.com/Doer-org/glyph/log"
	"github.com/gin-gonic/gin"
)

type CommentHandler struct {
	uc usecase.ICommentUsecase
}

func NewCommentHandler(uc usecase.ICommentUsecase) *CommentHandler {
	return &CommentHandler{
		uc: uc,
	}
}

func (u *CommentHandler) CreateComment(ctx *gin.Context) {
	logger := log.New()
	var j json.CommentJson
	if err := ctx.BindJSON(&j); err != nil {
		logger.Error("", map[string]string{"error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	comment, err := u.uc.CreateComment(ctx, json.CommentJsonToEntity(&j))
	if err != nil {
		logger.Error("", map[string]string{"error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	commentjson := json.CommentEntityToJson(comment)
	ctx.JSON(
		http.StatusCreated,
		gin.H{"data": commentjson},
	)
}

func (u *CommentHandler) ReadCommentsByGlyphId(ctx *gin.Context) {
	logger := log.New()
	id := ctx.Param("id")
	comments, err := u.uc.ReadCommentsByGlyphId(ctx, id)
	if err != nil {
		logger.Error("", map[string]string{"error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	commentsjson := json.CommentsEntityToJson(comments)
	ctx.JSON(
		http.StatusOK,
		gin.H{"data": commentsjson},
	)
}

func (u *CommentHandler) ReadCommentsByUserId(ctx *gin.Context) {
	logger := log.New()
	user_id := ctx.Param("user_id")
	comments, err := u.uc.ReadCommentsByUserId(ctx, user_id)
	if err != nil {
		logger.Error("", map[string]string{"error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	commentsjson := json.CommentsByUserIdEntityToJson(comments)
	ctx.JSON(
		http.StatusOK,
		gin.H{"data": commentsjson},
	)
}

func (u *CommentHandler) GetCommentAll(ctx *gin.Context) {
	logger := log.New()
	comments, err := u.uc.GetCommentAll(ctx)
	if err != nil {
		logger.Error("", map[string]string{"error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	commentsjson := json.CommentsEntityToJson(comments)
	ctx.JSON(
		http.StatusOK,
		gin.H{"data": commentsjson},
	)
}