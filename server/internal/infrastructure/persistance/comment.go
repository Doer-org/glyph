package persistance

import (
	"context"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/internal/infrastructure/database"
	d "github.com/Doer-org/glyph/internal/infrastructure/persistance/dto"
	"github.com/Doer-org/glyph/utils"
)

var _ repository.ICommentRepository = &CommentRepository{}

type CommentRepository struct {
	conn *database.Conn
}

func NewCommentRepository(conn *database.Conn) repository.ICommentRepository {
	return &CommentRepository{
		conn: conn,
	}
}

func (ur *CommentRepository) CreateComment(ctx context.Context, comment *entity.Comment) (*entity.Comment, error) {
	id := utils.GetUlid()
	comment.Id = id
	query := `
	INSERT INTO comments (id, user_id, glyph_id, contents, created_at)
	VALUES (:id, :user_id, :glyph_id, :contents, :created_at)
	`
	dto := d.CommentEntityToDto(comment)
	_, err := ur.conn.DB.NamedExecContext(ctx, query, &dto)
	if err != nil {
		return nil, err
	}
	return d.CommentDtoToEntity(&dto), nil
}

func (ur *CommentRepository) ReadCommentsByGlyphId(ctx context.Context, glyph_id string) (entity.Comments, error) {
	query := `
	SELECT * 
	FROM comments 
	WHERE glyph_id = ?;
	`
	var dtos d.CommentDtos
	err := ur.conn.DB.SelectContext(ctx, &dtos, query, glyph_id)
	rescomments := d.CommentDtosToEntity(dtos)
	if err != nil {
		return nil, err
	}
	return rescomments, nil
}

func (ur *CommentRepository) ReadCommentsByUserId(ctx context.Context, user_id string) (entity.CommentsByUserId, error) {
	query := `
	SELECT comments.id, comments.glyph_id, comments.contents, comments.created_at, glyphs.title 
	FROM comments 
	INNER JOIN glyphs on comments.glyph_id = glyphs.id 
	WHERE comments.user_id = ?;
	`
	var dtos d.CommentByUserIdDtos
	err := ur.conn.DB.SelectContext(ctx, &dtos, query, user_id)
	if err != nil {
		return nil, err
	}
	rescomments := d.CommentByUserIdDtosToEntity(dtos)

	return rescomments, nil
}

func (ur *CommentRepository) GetCommentAll(ctx context.Context) (entity.Comments, error) {
	query := `
	SELECT * FROM comments;
	`
	var dtos d.CommentDtos
	err := ur.conn.DB.SelectContext(ctx, &dtos, query)
	if err != nil {
		return nil, err
	}
	return d.CommentDtosToEntity(dtos), nil
}
