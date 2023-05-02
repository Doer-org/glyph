package dto

import (
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
)

type GlyphDto struct {
	Id         string    `db:"id"`
	Author_id  string    `db:"author_id"`
	Title      string    `db:"title"`
	Content    string    `db:"content"`
	Prev_glyph string    `db:"prev_glyph"`
	Next_glyph string    `db:"next_glyph"`
	Status     string    `db:"status"`
	Created_at time.Time `db:"created_at"`
	Updated_at time.Time `db:"updated_at"`
	Is_study   bool      `db:"is_study"`
}
type GlyphDtos []GlyphDto

func GlyphDtoToEntity(dto *GlyphDto) *entity.Glyph {
	dto.Created_at = dto.Created_at.In(time.FixedZone("Asia/Tokyo", 9*60*60))
	dto.Updated_at = dto.Updated_at.In(time.FixedZone("Asia/Tokyo", 9*60*60))
	return &entity.Glyph{
		Id:         dto.Id,
		Author_id:  dto.Author_id,
		Title:      dto.Title,
		Content:    dto.Content,
		Prev_glyph: dto.Prev_glyph,
		Next_glyph: dto.Next_glyph,
		Status:     dto.Status,
		Created_at: dto.Created_at,
		Updated_at: dto.Updated_at,
		Is_study:   dto.Is_study,
	}
}

func GlyphEntityToDto(u *entity.Glyph) GlyphDto {
	return GlyphDto{
		Id:         u.Id,
		Author_id:  u.Author_id,
		Title:      u.Title,
		Content:    u.Content,
		Prev_glyph: u.Prev_glyph,
		Next_glyph: u.Next_glyph,
		Status:     u.Status,
		Created_at: u.Created_at,
		Updated_at: u.Updated_at,
		Is_study:   u.Is_study,
	}
}

func GlyphsDtosToEntity(dtos GlyphDtos) entity.Glyphs {
	var glyphs entity.Glyphs
	for _, dto := range dtos {
		glyph := GlyphDtoToEntity(&dto)
		glyphs = append(glyphs, glyph)
	}
	return glyphs
}