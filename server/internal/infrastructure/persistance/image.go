package persistance

import (
	"context"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/internal/infrastructure/database"
	d "github.com/Doer-org/glyph/internal/infrastructure/dto"
)

var _ repository.IIMageRepositry = &ImageRepositry{}

type ImageRepositry struct {
	conn *database.Conn
}

func NewImageRepositry(conn *database.Conn) repository.IIMageRepositry {
	return &ImageRepositry{
		conn: conn,
	}
}

func (ur *ImageRepositry) CreateImage(ctx context.Context, image *entity.Image) (*entity.Image, error) {
	query := `
	INSERT INTO images(id, img)
	VALUES (:id, :img)
	`
	dto := d.ImageEntityToDto(image)
	_, err := ur.conn.DB.NamedExecContext(ctx, query, &dto)
	if err != nil {
		return nil, err
	}
	return d.ImageDtoToEntity(&dto), nil
}

func (ur *ImageRepositry) GetImagebyId(ctx context.Context, id string) (*entity.Image, error) {
	query := `
	SELECT * 
	FROM images 
	WHERE id = ?
	`
	var dto d.ImageDto
	err := ur.conn.DB.GetContext(ctx, &dto, query, id)
	if err != nil {
		return nil, err
	}
	return d.ImageDtoToEntity(&dto), nil
}

func (ur *ImageRepositry) GetImageALL(ctx context.Context) (entity.Images, error) {
	query := `
	SELECT *
	FROM images
	`
	var dtos d.ImageDtos
	err := ur.conn.DB.SelectContext(ctx, &dtos, query)
	if err != nil {
		return nil, err
	}
	return d.ImageDtosToEntity(dtos), nil
}

func (ur *ImageRepositry) DeleteImage(ctx context.Context, id string) error {
	query := `
	DELETE FROM images
	WHERE id = ?
	`
	_, err := ur.conn.DB.ExecContext(ctx, query, id)
	return err
}
