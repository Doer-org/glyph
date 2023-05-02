package dto

import (
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
)

type CommentDto struct {
	Id         string    `db:"id"`
	User_id    string    `db:"user_id"`
	Glyph_id   string    `db:"glyph_id"`
	Contents   string    `db:"contents"`
	Created_at time.Time `db:"created_at"`
}
type CommentByUserIdDto struct {
	Id          string    `db:"id"`
	Glyph_id    string    `db:"glyph_id"`
	Glyph_title string    `db:"title"`
	Contents    string    `db:"contents"`
	Created_at  time.Time `db:"created_at"`
}

type CommentDtos []CommentDto
type CommentByUserIdDtos []CommentByUserIdDto

func CommentEntityToDto(comment *entity.Comment) CommentDto {
	return CommentDto{
		Id:         comment.Id,
		User_id:    comment.User_id,
		Glyph_id:   comment.Glyph_id,
		Contents:   comment.Contents,
		Created_at: comment.Created_at,
	}
}

func CommentDtoToEntity(dto *CommentDto) *entity.Comment {
	dto.Created_at = dto.Created_at.In(time.FixedZone("Asia/Tokyo", 9*60*60))
	return &entity.Comment{
		Id:         dto.Id,
		User_id:    dto.User_id,
		Glyph_id:   dto.Glyph_id,
		Contents:   dto.Contents,
		Created_at: dto.Created_at,
	}
}

func CommentDtosToEntity(dtos CommentDtos) entity.Comments {
	var comments entity.Comments
	for _, dto := range dtos {
		comments = append(comments, CommentDtoToEntity(&dto))
	}
	return comments
}

func CommentByUserIdDtoToEntity(dto *CommentByUserIdDto) *entity.CommentByUserId {
	dto.Created_at = dto.Created_at.In(time.FixedZone("Asia/Tokyo", 9*60*60))
	return &entity.CommentByUserId{
		Id:          dto.Id,
		Glyph_id:    dto.Glyph_id,
		Glyph_title: dto.Glyph_title,
		Contents:    dto.Contents,
		Created_at:  dto.Created_at,
	}
}

func CommentByUserIdDtosToEntity(dtos CommentByUserIdDtos) entity.CommentsByUserId {
	var comments entity.CommentsByUserId
	for _, dto := range dtos {
		comments = append(comments, CommentByUserIdDtoToEntity(&dto))
	}
	return comments
}
