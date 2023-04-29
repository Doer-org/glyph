package json

import "github.com/Doer-org/glyph/internal/domain/entity"

type ImageJson struct {
	Id  string `json:"id"`
	Img []byte `json:"img"`
}

type ImagesJson []*ImageJson

func ImageEntityToJson(image *entity.Image) *ImageJson {
	return &ImageJson{
		Id:  image.Id,
		Img: image.Img,
	}
}

func ImagesEntityToJson(images entity.Images) *ImagesJson {
	var imagesJson ImagesJson
	for _, image := range images {
		imagesJson = append(imagesJson, ImageEntityToJson(image))
	}
	return &imagesJson
}

func ImageJsonToEntity(json *ImageJson) *entity.Image {
	return &entity.Image{
		Id:  json.Id,
		Img: json.Img,
	}
}
