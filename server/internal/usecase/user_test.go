package usecase

import (
	"context"
	"testing"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/mock_repository"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
)

func Test_CreateUser(t *testing.T) {
	tests := []struct {
		name            string
		user            *entity.User
		prepareMockUser func(m *mock_repository.MockIUserRepository)
		err             bool
		errMess         string
	}{
		{
			name: "正常に動作した場合",
			user: &entity.User{
				Name: "test",
				Img:  "http://test.png",
			},
			prepareMockUser: func(m *mock_repository.MockIUserRepository) {
				m.EXPECT().CreateUser(gomock.Any(), &entity.User{
					Name: "test",
					Img:  "http://test.png",
				}).Return(&entity.User{
					Id:   "test",
					Name: "test",
					Img:  "http://test.png",
				}, nil)
			},
			err:     false,
			errMess: "",
		},
		{
			name: "nameがないとerr",
			user: &entity.User{
				Name: "",
				Img:  "http://test.png",
			},
			err:             true,
			prepareMockUser: func(m *mock_repository.MockIUserRepository) {},
			errMess:         "user name empty",
		},
		{
			name: "imgがないとerr",
			user: &entity.User{
				Name: "test",
				Img:  "",
			},
			err:             true,
			prepareMockUser: func(m *mock_repository.MockIUserRepository) {},
			errMess:         "img name empty",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()
			mock := mock_repository.NewMockIUserRepository(ctrl)
			tt.prepareMockUser(mock)

			userusecase := NewUserUsecase(mock)
			user, err := userusecase.CreateUser(context.Background(), tt.user)
			if err != nil {
				assert.EqualError(t, err, tt.errMess)
			}

			if !tt.err != (err == nil) {
				t.Errorf("this case want no err but : %s", err)
			}
			if !tt.err {
				assert.Equal(t, tt.user.Name, user.Name)
			}
		})
	}

}
