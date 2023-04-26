package entity

import "time"

type Glyph struct {
	Id         string
	Author_id  string
	Title      string
	Content    string
	Prev_glyph string
	Next_glyph string
	Status     string
	Created_at time.Time
	Updated_at time.Time
	Is_study   bool
}

type Glyphs []*Glyph
