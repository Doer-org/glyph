package json

import (
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
)

type GlyphJson struct {
	Id         string    `json:"id"`
	Author_id  string    `json:"author_id"`
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	Prev_glyph string    `json:"prev_glyph"`
	Next_glyph string    `json:"next_glyph"`
	Status     string    `json:"status"`
	Created_at time.Time `json:"created_at"`
	Updated_at time.Time `json:"updated_at"`
	Is_study   bool      `json:"is_study"`
}

type GlyphsJson []GlyphJson

func GlyphEntityToJson(c *entity.Glyph) *GlyphJson {
	return &GlyphJson{
		Id:         c.Id,
		Author_id:  c.Author_id,
		Title:      c.Title,
		Content:    c.Content,
		Prev_glyph: c.Prev_glyph,
		Next_glyph: c.Next_glyph,
		Status:     c.Status,
		Created_at: c.Created_at,
		Updated_at: c.Updated_at,
		Is_study:   c.Is_study,
	}
}

func GlyphsEntityToJson(c entity.Glyphs) *GlyphsJson {
	var GlyphsJson GlyphsJson
	for _, glyph := range c {
		GlyphsJson = append(GlyphsJson, *GlyphEntityToJson(glyph))
	}

	return &GlyphsJson
}

func GlyphJsonToEntity(j *GlyphJson) *entity.Glyph {
	return &entity.Glyph{
		Id:         j.Id,
		Author_id:  j.Author_id,
		Title:      j.Title,
		Content:    j.Content,
		Prev_glyph: j.Prev_glyph,
		Next_glyph: j.Next_glyph,
		Status:     j.Status,
		Created_at: j.Created_at,
		Updated_at: j.Updated_at,
		Is_study:   j.Is_study,
	}
}
