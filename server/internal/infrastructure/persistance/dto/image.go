package dto

import "github.com/Doer-org/glyph/internal/domain/entity"

type ImageDto struct {
	Id  string `db:"id"`
	Img []byte `db:"img"`
}

type ImageDtos []*ImageDto

func ImageDtoToEntity(dto *ImageDto) *entity.Image {
	return &entity.Image{
		Id:  dto.Id,
		Img: dto.Img,
	}
}

func ImageDtosToEntity(dtos ImageDtos) entity.Images {
	var images entity.Images
	for _, d := range dtos {
		images = append(images, ImageDtoToEntity(d))
	}
	return images
}

func ImageEntityToDto(img *entity.Image) ImageDto {
	return ImageDto{
		Id:  img.Id,
		Img: img.Img,
	}
}
