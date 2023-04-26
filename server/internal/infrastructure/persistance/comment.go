package persistance

import (
	"context"
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/internal/infrastructure/database"
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
	query := `
	INSERT INTO comments (id, author_id, glyph_id, content, created_at, updated_at)
	VALUES (:id, :author_id, :glyph_id, :content, :created_at, :updated_at)
	`
	dto := commentEntityToDto(comment)
	_, err := ur.conn.DB.NamedExecContext(ctx, query, &dto)
	if err != nil {
		return nil, err
	}
	return commentDtoToEntity(&dto), nil
}

func (ur *CommentRepository) ReadCommentsByGlyphId(ctx context.Context, glyph_id string) (entity.Comments, error) {
	query := `
	SELECT * FROM comments WHERE glyph_id = ?;
	`
	var dtos commentsDto
	err := ur.conn.DB.GetContext(ctx, &dtos, query, glyph_id)
	rescomments := commentDtosToEntity(dtos)
	if err != nil {
		return nil, err
	}
	return rescomments, nil
}

func (ur *CommentRepository) ReadCommentsByUserId(ctx context.Context, author_id string) (entity.CommentsByUserId, error) {
	query := `
	SELECT * FROM comments WHERE author_id = ?;
	`
	var dtos commentsDto
	err := ur.conn.DB.GetContext(ctx, &dtos, query, author_id)
	var rescomments entity.CommentsByUserId
	for i := range dtos {
		var glyph_title string
		query := `
		SELECT title FROM glyphs WHERE id = ?;
		`
		err = ur.conn.DB.GetContext(ctx, glyph_title, query, dtos[i].Glyph_id)
		if err != nil {
			return nil, err
		}
		rescomments[i].Id = dtos[i].Id
		rescomments[i].User_id = dtos[i].User_id
		rescomments[i].Glyph_id = dtos[i].Glyph_id
		rescomments[i].Contents = dtos[i].Contents
		rescomments[i].Created_at = dtos[i].Created_at
		rescomments[i].Glyph_title = glyph_title
	}
	if err != nil {
		return nil, err
	}
	return rescomments, nil
}
type commentDto struct {
	Id         string    `db:"id"`
	User_id  string    `db:"user_id"`
	Glyph_id   string    `db:"glyph_id"`
	Contents   string    `db:"contents"`
	Created_at time.Time `db:"created_at"`
}

type commentsDto []commentDto


func commentDtoToEntity(dto *commentDto) *entity.Comment {
	return &entity.Comment{
		Id:         dto.Id,
		User_id:  dto.User_id,
		Glyph_id:   dto.Glyph_id,
		Contents:    dto.Contents,
		Created_at: dto.Created_at,
	}
}

func commentEntityToDto(comment *entity.Comment) commentDto {
	return commentDto{
		Id:         comment.Id,
		User_id:  comment.User_id,
		Glyph_id:   comment.Glyph_id,
		Contents:    comment.Contents,
		Created_at: comment.Created_at,
	}
}

func commentDtosToEntity(dtos commentsDto) entity.Comments {
	var comments entity.Comments
	for _, dto := range dtos {
		comments = append(comments, commentDtoToEntity(&dto))
	}
	return comments
}
