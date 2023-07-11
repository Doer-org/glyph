package usecase_test

import (
	"context"
	"database/sql"
	"errors"
	"testing"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/mock_repository"
	"github.com/Doer-org/glyph/internal/usecase"
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

			userusecase := usecase.NewUserUsecase(mock)
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

func Test_DeleteUser(t *testing.T) {
	tests := []struct {
		name          string
		id            string
		mockUser      *entity.User
		prepareMock   func(m *mock_repository.MockIUserRepository)
		expectedError string
	}{
		{
			name: "正常にユーザが削除される場合",
			id:   "test",
			mockUser: &entity.User{
				Id:   "test",
				Name: "test",
				Img:  "http://test.png",
			},
			prepareMock: func(m *mock_repository.MockIUserRepository) {
				m.EXPECT().GetUser(gomock.Any(), "test").Return(&entity.User{
					Id:   "test",
					Name: "test",
					Img:  "http://test.png",
				}, nil)
				m.EXPECT().DeleteUser(gomock.Any(), "test").Return(nil)
			},
			expectedError: "",
		},
		{
			name:          "IDが空の場合、エラーが返される",
			id:            "",
			mockUser:      nil,
			prepareMock:   func(m *mock_repository.MockIUserRepository) {},
			expectedError: "id empty",
		},
		{
			name:     "指定されたIDのユーザが存在しない場合、エラーが返される",
			id:       "nonexistent",
			mockUser: nil,
			prepareMock: func(m *mock_repository.MockIUserRepository) {
				m.EXPECT().GetUser(gomock.Any(), "nonexistent").Return(nil, sql.ErrNoRows)
			},
			expectedError: "The user with this id does not exist",
		},
		{
			name: "ユーザ削除時にエラーが発生する場合、エラーが返される",
			id:   "test",
			mockUser: &entity.User{
				Id:   "test",
				Name: "test",
				Img:  "http://test.png",
			},
			prepareMock: func(m *mock_repository.MockIUserRepository) {
				m.EXPECT().GetUser(gomock.Any(), "test").Return(&entity.User{
					Id:   "test",
					Name: "test",
					Img:  "http://test.png",
				}, nil)
				m.EXPECT().DeleteUser(gomock.Any(), "test").Return(errors.New("error deleting user"))
			},
			expectedError: "error deleting user",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			mockRepo := mock_repository.NewMockIUserRepository(ctrl)
			tt.prepareMock(mockRepo)

			usecase := usecase.NewUserUsecase(mockRepo)
			err := usecase.DeleteUser(context.Background(), tt.id)

			if tt.expectedError != "" {
				assert.EqualError(t, err, tt.expectedError)
			} else {
				assert.NoError(t, err)
			}
		})
	}
}

func Test_GetUser(t *testing.T) {
	tests := []struct {
		name          string
		id            string
		mockUser      *entity.User
		prepareMock   func(m *mock_repository.MockIUserRepository)
		expectedUser  *entity.User
		expectedError string
	}{
		{
			name: "正常にユーザが取得される場合",
			id:   "test",
			mockUser: &entity.User{
				Id:   "test",
				Name: "test",
				Img:  "http://test.png",
			},
			prepareMock: func(m *mock_repository.MockIUserRepository) {
				m.EXPECT().GetUser(gomock.Any(), "test").Return(&entity.User{
					Id:   "test",
					Name: "test",
					Img:  "http://test.png",
				}, nil)
			},
			expectedUser: &entity.User{
				Id:   "test",
				Name: "test",
				Img:  "http://test.png",
			},
			expectedError: "",
		},
		{
			name:          "IDが空の場合、エラーが返される",
			id:            "",
			mockUser:      nil,
			prepareMock:   func(m *mock_repository.MockIUserRepository) {},
			expectedUser:  nil,
			expectedError: "id empty",
		},
		{
			name:     "指定されたIDのユーザが存在しない場合、エラーが返される",
			id:       "nonexistent",
			mockUser: nil,
			prepareMock: func(m *mock_repository.MockIUserRepository) {
				m.EXPECT().GetUser(gomock.Any(), "nonexistent").Return(nil, sql.ErrNoRows)
			},
			expectedUser:  nil,
			expectedError: "sql: no rows in result set",
		},
		{
			name: "ユーザ取得時にエラーが発生する場合、エラーが返される",
			id:   "test",
			mockUser: &entity.User{
				Id:   "test",
				Name: "test",
				Img:  "http://test.png",
			},
			prepareMock: func(m *mock_repository.MockIUserRepository) {
				m.EXPECT().GetUser(gomock.Any(), "test").Return(nil, errors.New("error getting user"))
			},
			expectedUser:  nil,
			expectedError: "error getting user",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			mockRepo := mock_repository.NewMockIUserRepository(ctrl)
			tt.prepareMock(mockRepo)

			usecase := usecase.NewUserUsecase(mockRepo)
			user, err := usecase.GetUser(context.Background(), tt.id)

			if tt.expectedError != "" {
				assert.EqualError(t, err, tt.expectedError)
			} else {
				assert.NoError(t, err)
			}

			assert.Equal(t, tt.expectedUser, user)
		})
	}
}
