package json

import (
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
)

type CommentJson struct {
	Id         string    `json:"id"`
	User_id    string    `json:"user_id"`
	Glyph_id   string    `json:"glyph_id"`
	Contents   string    `json:"contents"`
	Created_at time.Time `json:"created_at"`
}

type CommentsJson []*CommentJson

type CommentByUserIdJson struct {
	Id          string    `json:"id"`
	Glyph_id    string    `json:"glyph_id"`
	Glyph_title string    `json:"glyph_title"`
	Contents    string    `json:"contents"`
	Created_at  time.Time `json:"created_at"`
}

type CommentsByUserId []*CommentByUserIdJson

func CommentEntityToJson(comment *entity.Comment) *CommentJson {
	return &CommentJson{
		Id:         comment.Id,
		User_id:    comment.User_id,
		Glyph_id:   comment.Glyph_id,
		Contents:   comment.Contents,
		Created_at: comment.Created_at,
	}
}
func CommentsEntityToJson(comments entity.Comments) *CommentsJson {
	var commentsJson CommentsJson
	for _, comment := range comments {
		commentsJson = append(commentsJson, CommentEntityToJson(comment))
	}
	return &commentsJson
}

func CommentByUserIdEntityToJson(comment *entity.CommentByUserId) *CommentByUserIdJson {
	return &CommentByUserIdJson{
		Id:          comment.Id,
		Glyph_id:    comment.Glyph_id,
		Glyph_title: comment.Glyph_title,
		Contents:    comment.Contents,
		Created_at:  comment.Created_at,
	}
}

func CommentsByUserIdEntityToJson(comments entity.CommentsByUserId) *CommentsByUserId {
	var commentsJson CommentsByUserId
	for _, comment := range comments {
		commentsJson = append(commentsJson, CommentByUserIdEntityToJson(comment))
	}
	return &commentsJson
}

func CommentJsonToEntity(json *CommentJson) *entity.Comment {
	return &entity.Comment{
		Id:         json.Id,
		User_id:    json.User_id,
		Glyph_id:   json.Glyph_id,
		Contents:   json.Contents,
		Created_at: json.Created_at,
	}
}
