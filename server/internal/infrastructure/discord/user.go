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
	resp, err := client.Get(os.Getenv("DISCORD_GETME"))
	if err != nil {
		return nil, fmt.Errorf("discordapis Get: %w", err)
	}
	defer resp.Body.Close()
	var j dicordUserJson
	if err := json.NewDecoder(resp.Body).Decode(&j); err != nil {
		return nil, fmt.Errorf("decode: %w", err)
	}
	j.Avator = fmt.Sprintf("https://cdn.discordapp.com/avatars/%s/%s", j.Id, j.Avator)
	user := &entity.User{
		Id:   j.Id,
		Name: j.Name,
		Img:  j.Avator,
	}
	return user, nil
}

func (c *Client) GetServer(ctx context.Context) (bool, error) {
	token, ok := mycontext.GetToken(ctx)
	if !ok {
		return false, fmt.Errorf("token not found")
	}
	// tokenを使用して、clientを返す
	client := c.auth.Config.Client(ctx, token)
	resp, err := client.Get(os.Getenv("DISCORD_GETSERVER"))
	if err != nil {
		return false, fmt.Errorf("discordapis Get: %w", err)
	}
	defer resp.Body.Close()
	var j dicordUserJsons
	if err := json.NewDecoder(resp.Body).Decode(&j); err != nil {
		return false, fmt.Errorf("decode: %w", err)
	}
	for _, v := range j {
		if v.Id == os.Getenv("SERVER_DISCORD_ID") {
			return true, nil
		}
	}
	return false, nil
}

type dicordUserJson struct {
	Id     string `json:"id"`
	Name   string `json:"username"`
	Avator string `json:"avatar"`
}

type dicordGuildJson struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Icon string `json:"icon"`
}

type dicordUserJsons []dicordGuildJson
