package persistance

import (
	"context"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/internal/infrastructure/database"
	d "github.com/Doer-org/glyph/internal/infrastructure/dto"
)

var _ repository.IGlyphRepository = &GlyphRepository{}

type GlyphRepository struct {
	conn *database.Conn
}

func NewGlyphRepository(conn *database.Conn) repository.IGlyphRepository {
	return &GlyphRepository{
		conn: conn,
	}
}

func (ur *GlyphRepository) CreateGlyph(ctx context.Context, glyph *entity.Glyph) (*entity.Glyph, error) {
	query := `
	INSERT INTO glyphs (id, author_id, title, content, prev_glyph, next_glyph, status, created_at, updated_at, is_study)
	VALUES (:id, :author_id, :title, :content, :prev_glyph, :next_glyph, :status, :created_at, :updated_at, :is_study)
	`
	dto := d.GlyphEntityToDto(glyph)
	_, err := ur.conn.DB.NamedExecContext(ctx, query, &dto)
	if err != nil {
		return nil, err
	}
	if dto.Prev_glyph != "" {
		query := `UPDATE glyphs 
		SET next_glyph=:id 
		WHERE id=:prev_glyph;
		`
		_, err := ur.conn.DB.NamedExecContext(ctx, query, &dto)
		if err != nil {
			return nil, err
		}
	}
	return d.GlyphDtoToEntity(&dto), nil
}

func (ur *GlyphRepository) ReadGlyph(ctx context.Context, id string) (*entity.Glyph, error) {
	query := `
	SELECT * 
	FROM glyphs 
	WHERE id = ?;
	`
	var dto d.GlyphDto
	err := ur.conn.DB.GetContext(ctx, &dto, query, id)
	resglyph := d.GlyphDtoToEntity(&dto)
	if err != nil {
		return nil, err
	}
	return resglyph, nil
}

func (ur *GlyphRepository) ReadGlyphsbyUserId(ctx context.Context, author_id string) (entity.Glyphs, error) {
	query := `
	SELECT * 
	FROM glyphs 
	WHERE author_id = ?;
	`
	var dtos d.GlyphDtos
	err := ur.conn.DB.SelectContext(ctx, &dtos, query, author_id)
	glyphs := d.GlyphsDtosToEntity(dtos)
	if err != nil {
		return nil, err
	}
	return glyphs, nil
}

func (ur *GlyphRepository) ReadAllGlyphs(ctx context.Context) (entity.Glyphs, error) {
	query := `
	SELECT * 
	FROM glyphs;
	`
	var dtos d.GlyphDtos
	err := ur.conn.DB.SelectContext(ctx, &dtos, query)
	glyphs := d.GlyphsDtosToEntity(dtos)
	if err != nil {
		return nil, err
	}
	return glyphs, nil
}

func (ur *GlyphRepository) ReadRelativeAllGlyphs(ctx context.Context, id string) (entity.Glyphs, error) {
	nextGlyphs, err := ur.getNextRelativeGlyph(ctx, id)
	if err != nil {
		return nil, err
	}
	prevGlyphs, err := ur.getPrevRelativeGlyph(ctx, id)
	if err != nil {
		return nil, err
	}
	var resglyphs entity.Glyphs
	resglyphs = append(resglyphs, prevGlyphs...)
	resglyphs = append(resglyphs, nextGlyphs...)
	return resglyphs, nil
}

func (ur *GlyphRepository) EditGlyph(ctx context.Context, glyph *entity.Glyph, id string) (*entity.Glyph, error) {
	query := `
	UPDATE glyphs 
	SET title=:title, 
		content=:content,
		prev_glyph=:prev_glyph,
		next_glyph=:next_glyph,
		status=:status,
		updated_at=:updated_at ,
		is_study=:is_study
	WHERE id=:id;
	`
	dto := d.GlyphEntityToDto(glyph)
	dto.Id = id
	_, err := ur.conn.DB.NamedExecContext(ctx, query, &dto)
	if err != nil {
		return nil, err
	}
	return d.GlyphDtoToEntity(&dto), nil
}

func (ur *GlyphRepository) DeleteGlyph(ctx context.Context, id string) error {
	query := `
	DELETE FROM glyphs 
	WHERE id = ?;
	`
	_, err := ur.conn.DB.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	return nil
}

func (ur *GlyphRepository) getNextRelativeGlyph(ctx context.Context, id string) (entity.Glyphs, error) {
	query := `
	SELECT * 
	FROM glyphs 
	WHERE id = ?;
	`
	var glyphs entity.Glyphs
	for {
		var dto d.GlyphDto
		err := ur.conn.DB.GetContext(ctx, &dto, query, id)
		glyph := d.GlyphDtoToEntity(&dto)
		next_id := glyph.Next_glyph
		if err != nil {
			return nil, err
		}
		if next_id == "" {
			return glyphs, nil
		} else {
			glyphs = append(glyphs, glyph)
			id = next_id
		}
	}

}
func (ur *GlyphRepository) getPrevRelativeGlyph(ctx context.Context, id string) (entity.Glyphs, error) {
	query := `
	SELECT * 
	FROM glyphs 
	WHERE id = ?;
	`
	var glyphs entity.Glyphs
	for {
		var dto d.GlyphDto
		err := ur.conn.DB.GetContext(ctx, &dto, query, id)
		glyph := d.GlyphDtoToEntity(&dto)
		prev_id := glyph.Prev_glyph
		if err != nil {
			return nil, err
		}
		if prev_id == "" {
			return glyphs, nil
		} else {
			glyphs = append(glyphs, glyph)
			id = prev_id
		}
	}
}
