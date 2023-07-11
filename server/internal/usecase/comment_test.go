package usecase_test

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/domain/mock_repository"
	"github.com/Doer-org/glyph/internal/usecase"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
)

func Test_CreateComment(t *testing.T) {
	t.Skip()
	tests := []struct {
		name           string
		comment        *entity.Comment
		prepareMock    func(m *mock_repository.MockICommentRepository)
		expectedResult *entity.Comment
		expectedError  string
	}{
		{
			name: "正常にコメントが作成される場合",
			comment: &entity.Comment{
				Glyph_id:   "glyph_id",
				User_id:    "user_id",
				Contents:   "Test comment",
				Created_at: time.Time{},
			},
			prepareMock: func(m *mock_repository.MockICommentRepository) {
				m.EXPECT().CreateComment(gomock.Any(), &entity.Comment{
					Glyph_id:   "glyph_id",
					User_id:    "user_id",
					Contents:   "Test comment",
					Created_at: time.Now(),
				}).Return(&entity.Comment{
					Id:         "comment_id",
					Glyph_id:   "glyph_id",
					User_id:    "user_id",
					Contents:   "Test comment",
					Created_at: time.Now(),
				}, nil)
			},
			expectedResult: &entity.Comment{
				Id:         "comment_id",
				Glyph_id:   "glyph_id",
				User_id:    "user_id",
				Contents:   "Test comment",
				Created_at: time.Now(),
			},
			expectedError: "",
		},
		{
			name: "コメントに不備がある場合、エラーが返される",
			comment: &entity.Comment{
				Glyph_id:   "",
				User_id:    "user_id",
				Contents:   "Test comment",
				Created_at: time.Time{},
			},
			prepareMock:    func(m *mock_repository.MockICommentRepository) {},
			expectedResult: nil,
			expectedError:  "invalid comment",
		},
		{
			name: "タイムゾーンを取得できない場合、エラーが返される",
			comment: &entity.Comment{
				Glyph_id:   "glyph_id",
				User_id:    "user_id",
				Contents:   "Test comment",
				Created_at: time.Time{},
			},
			prepareMock:    func(m *mock_repository.MockICommentRepository) {},
			expectedResult: nil,
			expectedError:  "can't get time",
		},
		{
			name: "コメント作成時にエラーが発生する場合、エラーが返される",
			comment: &entity.Comment{
				Glyph_id:   "glyph_id",
				User_id:    "user_id",
				Contents:   "Test comment",
				Created_at: time.Time{},
			},
			prepareMock: func(m *mock_repository.MockICommentRepository) {
				m.EXPECT().CreateComment(gomock.Any(), &entity.Comment{
					Glyph_id:   "glyph_id",
					User_id:    "user_id",
					Contents:   "Test comment",
					Created_at: time.Time{},
				}).Return(nil, errors.New("error creating comment"))
			},
			expectedResult: nil,
			expectedError:  "error creating comment",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			mockRepo := mock_repository.NewMockICommentRepository(ctrl)
			tt.prepareMock(mockRepo)

			uc := usecase.NewCommentUsecase(mockRepo)
			result, err := uc.CreateComment(context.Background(), tt.comment)

			if tt.expectedError != "" {
				assert.EqualError(t, err, tt.expectedError)
			} else {
				assert.NoError(t, err)
			}

			assert.Equal(t, tt.expectedResult, result)
		})
	}
}
