package persistance

import (
	"context"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/internal/infrastructure/database"
	"github.com/Doer-org/glyph/internal/infrastructure/dto"
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
	imagedto := dto.ImageEntityToDto(image)
	_, err := ur.conn.DB.NamedExecContext(ctx, query, &imagedto)
	if err != nil {
		return nil, err
	}
	return dto.ImageDtoToEntity(&imagedto), nil
}

func (ur *ImageRepositry) GetImagebyId(ctx context.Context, id string) (*entity.Image, error) {
	query := `
	SELECT * 
	FROM images 
	WHERE id = ?
	`
	var imagedto dto.ImageDto
	err := ur.conn.DB.GetContext(ctx, &imagedto, query, id)
	if err != nil {
		return nil, err
	}
	return dto.ImageDtoToEntity(&imagedto), nil
}

func (ur *ImageRepositry) GetImageALL(ctx context.Context) (entity.Images, error) {
	query := `
	SELECT *
	FROM images
	`
	var imagedtos dto.ImageDtos
	err := ur.conn.DB.SelectContext(ctx, &imagedtos, query)
	if err != nil {
		return nil, err
	}
	return dto.ImageDtosToEntity(imagedtos), nil
}

func (ur *ImageRepositry) DeleteImage(ctx context.Context, id string) error {
	query := `
	DELETE FROM images
	WHERE id = ?
	`
	_, err := ur.conn.DB.ExecContext(ctx, query, id)
	return err
}
