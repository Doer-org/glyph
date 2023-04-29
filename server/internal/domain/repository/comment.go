package repository

import (
	"context"

	"github.com/Doer-org/glyph/internal/domain/entity"
)

type ICommentRepository interface {
	CreateComment(ctx context.Context, comment *entity.Comment) (*entity.Comment, error)
	ReadCommentsByGlyphId(ctx context.Context, id string) (entity.Comments, error)
	ReadCommentsByUserId(ctx context.Context, id string) (entity.CommentsByUserId, error)
	GetCommentAll(ctx context.Context) (entity.Comments, error)
}
