package context

import (
	"context"
	"fmt"

	"golang.org/x/oauth2"
)

type ContextKey string

var (
	userIdKey ContextKey = "userIdKey"
	tokenKey  ContextKey = "tokenKey"
)

func SetToken(ctx context.Context, token *oauth2.Token) context.Context {
	if token != nil {
		return context.WithValue(ctx, tokenKey, token)
	}
	return ctx
}

func GetToken(ctx context.Context) (*oauth2.Token, bool) {
	v := ctx.Value(tokenKey)
	token, ok := v.(*oauth2.Token)
	return token, ok
}

func SetUserId(ctx context.Context, userId string) context.Context {
	if userId != "" {
		return context.WithValue(ctx, userIdKey, userId)
	}
	return ctx
}

func GetUser(ctx context.Context) (string, bool) {
	v := ctx.Value(userIdKey)
	userId, ok := v.(string)
	if !ok {
		return "", ok
	}
	return userId, ok
}

// ctxに入っているsessionのuserIdと引数で受け取ったuserIdを比較します
// 比較して違った場合、errorを返します
func CompareUserIdAndUserSessionId(ctx context.Context, userId string) error {
	userSessId, ok := GetUser(ctx)
	if !ok {
		return fmt.Errorf("GetUser: failed to get user from context")
	}
	if userId == "" {
		return fmt.Errorf("func args userId is nil")
	}
	if userId != userSessId {
		return fmt.Errorf("userId is not matched session userId")
	}
	return nil
}
