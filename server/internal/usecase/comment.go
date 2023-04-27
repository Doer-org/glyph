package usecase

import (
	"context"
	"fmt"
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/utils"
)

var _ ICommentUsecase = &CommentUsecase{}

type CommentUsecase struct {
	repo repository.ICommentRepository
}

type ICommentUsecase interface {
	CreateComment(ctx context.Context, comment *entity.Comment) (*entity.Comment, error)
	ReadCommentsByGlyphId(ctx context.Context, id string) (entity.Comments, error)
	ReadCommentsByUserId(ctx context.Context, id string) (entity.CommentsByUserId, error)
}

func NewCommentUsecase(repo repository.ICommentRepository) ICommentUsecase {
	return &CommentUsecase{
		repo: repo,
	}
}

func (uc *CommentUsecase) CreateComment(ctx context.Context, comment *entity.Comment) (*entity.Comment, error) {
	if comment.Glyph_id == "" || comment.User_id == "" || comment.Contents == "" {
		return nil, fmt.Errorf("invalid comment")
	}

	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		return nil, fmt.Errorf("can't get time")
	}
	now := time.Now().In(jst)
	comment.Created_at = now
	comment.Id = utils.GetUlid()

	return uc.repo.CreateComment(ctx, comment)
}

func (uc *CommentUsecase) ReadCommentsByGlyphId(ctx context.Context, id string) (entity.Comments, error) {
	if id == "" {
		return nil, fmt.Errorf("glyph id empty")
	}
	return uc.repo.ReadCommentsByGlyphId(ctx, id)
}

func (uc *CommentUsecase) ReadCommentsByUserId(ctx context.Context, id string) (entity.CommentsByUserId, error) {
	if id == "" {
		return nil, fmt.Errorf("user id empty")
	}
	return uc.repo.ReadCommentsByUserId(ctx, id)
}
