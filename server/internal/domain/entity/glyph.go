package entity

import "time"

type Glyph struct {
	Author_id  string
	Id         string
	Title      string
	Content    string
	Prev_glyph string
	Next_glyph string
	Status     string
	Created_at time.Time
	Updated_at time.Time
}

type Glyphs []*Glyph
