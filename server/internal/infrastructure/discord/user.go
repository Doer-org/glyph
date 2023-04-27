package discord

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
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
	log.Println("discord:    " + os.Getenv("DISCORD_GETME"))
	resp, err := client.Get(os.Getenv("DISCORD_GETME"))
	if err != nil {
		return nil, fmt.Errorf("discordapis Get: %w", err)
	}
	defer resp.Body.Close()
	var j dicordUserJson
	if err := json.NewDecoder(resp.Body).Decode(&j); err != nil {
		return nil, fmt.Errorf("decode: %w", err)
	}
	user := &entity.User{
		Id:   j.Id,
		Name: j.Name,
		Img:  j.Avator,
	}
	return user, nil
}

type dicordUserJson struct {
	Id     string `json:"id"`
	Name   string `json:"username"`
	Avator string `json:"avatar"`
}
