package persistance

import (
	"context"
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/internal/infrastructure/database"
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
	INSERT INTO glyphs (id, author_id, title, content, prev_glyph, next_glyph, status, created_at, updated_at)
	VALUES (:id, :author_id, :title, :content, :prev_glyph, :next_glyph, :status, :created_at, :updated_at)
	`
	dto := glyphEntityToDto(glyph)
	_, err := ur.conn.DB.NamedExecContext(ctx, query, &dto)
	if err != nil {
		return nil, err
	}
	return glyphDtoToEntity(&dto), nil
}

func (ur *GlyphRepository) ReadGlyph(ctx context.Context, id string) (*entity.Glyph, error) {
	query := `
	SELECT * FROM glyphs WHERE id = ?;
	`
	var dto glyphDto
	err := ur.conn.DB.GetContext(ctx, &dto, query, id)
	resglyph := glyphDtoToEntity(&dto)
	if err != nil {
		return nil, err
	}
	return resglyph, nil
}

func (ur *GlyphRepository) ReadAllGlyphs(ctx context.Context) (entity.Glyphs, error) {
	query := `
	SELECT * FROM glyphs;
	`
	var dtos glyphDtos
	err := ur.conn.DB.SelectContext(ctx, &dtos, query)
	glyphs := glyphsDtosToEntity(dtos)
	if err != nil {
		return nil, err
	}
	return glyphs, nil
}

func (ur *GlyphRepository) ReadRelativeAllGlyphs(ctx context.Context, id string) (entity.Glyphs, error) {
	query := `
	SELECT * FROM glyphs WHERE id=:id;
	`
	var dtos glyphDtos
	err := ur.conn.DB.GetContext(ctx, &dtos, query, id)
	glyphs := glyphsDtosToEntity(dtos)
	if err != nil {
		return nil, err
	}
	return glyphs, nil
}

func (ur *GlyphRepository) EditGlyph(ctx context.Context, glyph *entity.Glyph) (*entity.Glyph, error) {
	query := `
	UPDATE glyphs 
	SET title=:title, 
		content=:content,
		prev_glyph:=prev_glyph,
		next_glyph:=next_glyph,
		status:=status,
		updated_at:=updated_at 
	WHERE id=:id
	`
	dto := glyphEntityToDto(glyph)
	_, err := ur.conn.DB.NamedExecContext(ctx, query, &dto)
	if err != nil {
		return nil, err
	}
	return glyphDtoToEntity(&dto), nil
}

func (ur *GlyphRepository) DeleteGlyph(ctx context.Context, id string) error {
	query := `
	DELETE FROM glyphs WHERE id=:id;
	`
	_, err := ur.conn.DB.NamedExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	return nil
}

type glyphDto struct {
	Id         string    `db:"id"`
	Author_id  string    `db:"author_id"`
	Title      string    `db:"title"`
	Content    string    `db:"content"`
	Prev_glyph string    `db:"prev_glyph"`
	Next_glyph string    `db:"next_glyph"`
	Status     string    `db:"status"`
	Created_at time.Time `db:"created_at"`
	Updated_at time.Time `db:"updated_at"`
}
type glyphDtos []glyphDto

func glyphDtoToEntity(dto *glyphDto) *entity.Glyph {
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
	}
}

func glyphEntityToDto(u *entity.Glyph) glyphDto {
	return glyphDto{
		Id:         u.Id,
		Author_id:  u.Author_id,
		Title:      u.Title,
		Content:    u.Content,
		Prev_glyph: u.Prev_glyph,
		Next_glyph: u.Next_glyph,
		Status:     u.Status,
		Created_at: u.Created_at,
		Updated_at: u.Updated_at,
	}
}

func glyphsDtosToEntity(dtos glyphDtos) entity.Glyphs {
	var glyphs entity.Glyphs
	for _, dto := range dtos {
		glyph := glyphDtoToEntity(&dto)
		glyphs = append(glyphs, glyph)
	}
	return glyphs
}
