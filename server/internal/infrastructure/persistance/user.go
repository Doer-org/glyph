package persistance

import (
	"context"
	"log"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/repository"
	"github.com/Doer-org/glyph/internal/infrastructure/database"
)

var _ repository.IUserRepository = &UserRepository{}

type UserRepository struct {
	conn *database.Conn
}

func NewUserRepository(conn *database.Conn) repository.IUserRepository {
	return &UserRepository{
		conn: conn,
	}
}

func (ur *UserRepository) CreateUser(ctx context.Context, user *entity.User) (*entity.User, error) {
	log.Println("persistanse  1")
	query := `
	INSERT INTO users (id, name,img)
	VALUES (:id,:name,:img)
	`
	log.Println(user)
	dto := userEntityToDto(user)
	log.Println("persistanse  2")
	log.Println(dto)
	_, err := ur.conn.DB.NamedExecContext(ctx, query, &dto)
	log.Println("persistanse  2")
	if err != nil {
		return nil, err
	}
	log.Println("persistanse  3")
	return userDtoToEntity(&dto), nil
}

func (ur *UserRepository) DeleteUser(ctx context.Context, id string) error {
	query := `
	DELETE FROM users
	WHERE id = :id
	`

	_, err := ur.conn.DB.NamedExecContext(ctx, query, map[string]interface{}{"id": id})
	if err != nil {
		return err
	}

	return nil
}

func (ur *UserRepository) GetUser(ctx context.Context, id string) (*entity.User, error) {
	query := `
	SELECT * 
	FROM users
	WHERE id = ?
	`
	var dto userDto
	err := ur.conn.DB.GetContext(ctx, &dto, query, id)
	if err != nil {
		return nil, err
	}
	return userDtoToEntity(&dto), nil
}

type userDto struct {
	Id   string `db:"id"`
	Name string `db:"name"`
	Img  string `db:"img"`
}

func userDtoToEntity(dto *userDto) *entity.User {
	return &entity.User{
		Id:   dto.Id,
		Name: dto.Name,
		Img:  dto.Img,
	}
}

func userEntityToDto(u *entity.User) userDto {
	return userDto{
		Id:   u.Id,
		Name: u.Name,
		Img:  u.Img,
	}
}
