// Code generated by MockGen. DO NOT EDIT.
// Source: internal/domain/repository/comment.go

// Package mock_repository is a generated GoMock package.
package mock_repository

import (
	context "context"
	reflect "reflect"

	entity "github.com/Doer-org/glyph/internal/domain/entity"
	gomock "github.com/golang/mock/gomock"
)

// MockICommentRepository is a mock of ICommentRepository interface.
type MockICommentRepository struct {
	ctrl     *gomock.Controller
	recorder *MockICommentRepositoryMockRecorder
}

// MockICommentRepositoryMockRecorder is the mock recorder for MockICommentRepository.
type MockICommentRepositoryMockRecorder struct {
	mock *MockICommentRepository
}

// NewMockICommentRepository creates a new mock instance.
func NewMockICommentRepository(ctrl *gomock.Controller) *MockICommentRepository {
	mock := &MockICommentRepository{ctrl: ctrl}
	mock.recorder = &MockICommentRepositoryMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockICommentRepository) EXPECT() *MockICommentRepositoryMockRecorder {
	return m.recorder
}

// CreateComment mocks base method.
func (m *MockICommentRepository) CreateComment(ctx context.Context, comment *entity.Comment) (*entity.Comment, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateComment", ctx, comment)
	ret0, _ := ret[0].(*entity.Comment)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateComment indicates an expected call of CreateComment.
func (mr *MockICommentRepositoryMockRecorder) CreateComment(ctx, comment interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateComment", reflect.TypeOf((*MockICommentRepository)(nil).CreateComment), ctx, comment)
}

// GetCommentAll mocks base method.
func (m *MockICommentRepository) GetCommentAll(ctx context.Context) (entity.Comments, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetCommentAll", ctx)
	ret0, _ := ret[0].(entity.Comments)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetCommentAll indicates an expected call of GetCommentAll.
func (mr *MockICommentRepositoryMockRecorder) GetCommentAll(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetCommentAll", reflect.TypeOf((*MockICommentRepository)(nil).GetCommentAll), ctx)
}

// ReadCommentsByGlyphId mocks base method.
func (m *MockICommentRepository) ReadCommentsByGlyphId(ctx context.Context, id string) (entity.Comments, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ReadCommentsByGlyphId", ctx, id)
	ret0, _ := ret[0].(entity.Comments)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ReadCommentsByGlyphId indicates an expected call of ReadCommentsByGlyphId.
func (mr *MockICommentRepositoryMockRecorder) ReadCommentsByGlyphId(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ReadCommentsByGlyphId", reflect.TypeOf((*MockICommentRepository)(nil).ReadCommentsByGlyphId), ctx, id)
}

// ReadCommentsByUserId mocks base method.
func (m *MockICommentRepository) ReadCommentsByUserId(ctx context.Context, id string) (entity.CommentsByUserId, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ReadCommentsByUserId", ctx, id)
	ret0, _ := ret[0].(entity.CommentsByUserId)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ReadCommentsByUserId indicates an expected call of ReadCommentsByUserId.
func (mr *MockICommentRepositoryMockRecorder) ReadCommentsByUserId(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ReadCommentsByUserId", reflect.TypeOf((*MockICommentRepository)(nil).ReadCommentsByUserId), ctx, id)
}