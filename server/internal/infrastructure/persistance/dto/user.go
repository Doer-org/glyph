package dto

import "github.com/Doer-org/glyph/internal/domain/entity"

type UserDto struct {
	Id   string `db:"id"`
	Name string `db:"name"`
	Img  string `db:"img"`
}

func UserDtoToEntity(dto *UserDto) *entity.User {
	return &entity.User{
		Id:   dto.Id,
		Name: dto.Name,
		Img:  dto.Img,
	}
}

func UserEntityToDto(u *entity.User) UserDto {
	return UserDto{
		Id:   u.Id,
		Name: u.Name,
		Img:  u.Img,
	}
}