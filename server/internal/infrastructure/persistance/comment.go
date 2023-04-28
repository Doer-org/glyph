package persistance

import (
	"context"
	"log"
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
	INSERT INTO comments (id, user_id, glyph_id, contents, created_at)
	VALUES (:id, :user_id, :glyph_id, :contents, :created_at)
	`
	dto := commentEntityToDto(comment)
	log.Println(dto)
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
	err := ur.conn.DB.SelectContext(ctx, &dtos, query, glyph_id)
	rescomments := commentDtosToEntity(dtos)
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
	var dtos commentsByUserIdDto
	err := ur.conn.DB.SelectContext(ctx, &dtos, query, user_id)
	if err != nil {
		return nil, err
	}
	rescomments := commentByUserIdDtosToEntity(dtos)

	return rescomments, nil
}

type commentDto struct {
	Id         string    `db:"id"`
	User_id    string    `db:"user_id"`
	Glyph_id   string    `db:"glyph_id"`
	Contents   string    `db:"contents"`
	Created_at time.Time `db:"created_at"`
}
type commentByUserIdDto struct {
	Id          string    `db:"id"`
	Glyph_id    string    `db:"glyph_id"`
	Glyph_title string    `db:"title"`
	Contents    string    `db:"contents"`
	Created_at  time.Time `db:"created_at"`
}

type commentsDto []commentDto
type commentsByUserIdDto []commentByUserIdDto

func commentEntityToDto(comment *entity.Comment) commentDto {
	return commentDto{
		Id:         comment.Id,
		User_id:    comment.User_id,
		Glyph_id:   comment.Glyph_id,
		Contents:   comment.Contents,
		Created_at: comment.Created_at,
	}
}

func commentDtoToEntity(dto *commentDto) *entity.Comment {
	dto.Created_at = dto.Created_at.In(time.FixedZone("Asia/Tokyo", 9*60*60))
	return &entity.Comment{
		Id:         dto.Id,
		User_id:    dto.User_id,
		Glyph_id:   dto.Glyph_id,
		Contents:   dto.Contents,
		Created_at: dto.Created_at,
	}
}

func commentDtosToEntity(dtos commentsDto) entity.Comments {
	var comments entity.Comments
	for _, dto := range dtos {
		comments = append(comments, commentDtoToEntity(&dto))
	}
	return comments
}

func commentByUserIdDtoToEntity(dto *commentByUserIdDto) *entity.CommentByUserId {
	dto.Created_at = dto.Created_at.In(time.FixedZone("Asia/Tokyo", 9*60*60))
	return &entity.CommentByUserId{
		Id:          dto.Id,
		Glyph_id:    dto.Glyph_id,
		Glyph_title: dto.Glyph_title,
		Contents:    dto.Contents,
		Created_at:  dto.Created_at,
	}
}

func commentByUserIdDtosToEntity(dtos commentsByUserIdDto) entity.CommentsByUserId {
	var comments entity.CommentsByUserId
	for _, dto := range dtos {
		comments = append(comments, commentByUserIdDtoToEntity(&dto))
	}
	return comments
}
