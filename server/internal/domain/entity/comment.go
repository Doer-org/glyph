package entity

import "time"

type Comment struct {
	Id         string
	User_id    string
	Glyph_id   string
	Contents   string
	Created_at time.Time
}

type CommentByUserId struct {
	Id          string
	Glyph_id    string
	Glyph_title string
	Created_at  time.Time
}

type Comments []*Comment

type CommentsByUserId []*CommentByUserId
