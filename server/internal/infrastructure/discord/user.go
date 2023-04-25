package discord

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/Doer-org/glyph/internal/domain/entity"
	mycontext "github.com/Doer-org/glyph/utils/context"
)

func (c *Client) GetMe(ctx context.Context) (*entity.User, error) {
	token, ok := mycontext.GetToken(ctx)
	if !ok {
		return nil, fmt.Errorf("token not found")
	}
	// tokenを使用して、clientを返す
	client := c.auth.Config.Client(ctx, token)
	resp, err := client.Get(os.Getenv("DISCORD_CLIENT"))
	if err != nil {
		return nil, fmt.Errorf("googleapis Get: %w", err)
	}
	defer resp.Body.Close()
	var j googleUserJson
	if err := json.NewDecoder(resp.Body).Decode(&j); err != nil {
		return nil, fmt.Errorf("decode: %w", err)
	}
	user := &entity.User{
		Name: j.Name,
	}
	return user, nil
}

type googleUserJson struct {
	Id      string `json:"id"`
	Email   string `json:"email"`
	Name    string `json:"name"`
	Picture string `json:"picture"`
}
