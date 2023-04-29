package persistance

import (
	"context"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/internal/infrastructure/database"
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
	dto := imageEntityToDto(image)
	_, err := ur.conn.DB.NamedExecContext(ctx, query, &dto)
	if err != nil {
		return nil, err
	}
	return imageDtoToEntity(&dto), nil
}

func (ur *ImageRepositry) GetImagebyId(ctx context.Context, id string) (*entity.Image, error) {
	query := `
	SELECT * 
	FROM images 
	WHERE id = ?
	`
	var dto imageDto
	err := ur.conn.DB.GetContext(ctx, &dto, query, id)
	if err != nil {
		return nil, err
	}
	return imageDtoToEntity(&dto), nil
}

func (ur *ImageRepositry) GetImageALL(ctx context.Context) (entity.Images, error) {
	query := `
	SELECT *
	FROM images
	`
	var dtos imageDtos
	err := ur.conn.DB.SelectContext(ctx, &dtos, query)
	if err != nil {
		return nil, err
	}
	return imageDtosToEntity(dtos), nil
}

func (ur *ImageRepositry) DeleteImage(ctx context.Context, id string) error {
	query := `
	DELETE FROM images
	WHERE id = ?
	`
	_, err := ur.conn.DB.ExecContext(ctx, query, id)
	return err
}

type imageDto struct {
	Id  string `db:"id"`
	Img []byte `db:"img"`
}

type imageDtos []*imageDto

func imageDtoToEntity(dto *imageDto) *entity.Image {
	return &entity.Image{
		Id:  dto.Id,
		Img: dto.Img,
	}
}

func imageDtosToEntity(dtos imageDtos) entity.Images {
	var images entity.Images
	for _, d := range dtos {
		images = append(images, imageDtoToEntity(d))
	}
	return images
}

func imageEntityToDto(img *entity.Image) imageDto {
	return imageDto{
		Id:  img.Id,
		Img: img.Img,
	}
}
