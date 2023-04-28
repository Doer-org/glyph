package json

import (
	"encoding/json"

	"github.com/Doer-org/glyph/internal/domain/entity"
)

type Message struct {
	JsonType string             `json:"entity"`
	Data     entity.MessageData `json:"data"`
}

func CreateMessage(message *entity.MessageData) *Message {
	return &Message{
		JsonType: "message",
		Data:     *message,
	}
}

func TryParseMessage(input []byte) *Message {
	var message Message
	// https://qiita.com/nayuneko/items/2ec20ba69804e8bf7ca3
	if err := json.Unmarshal(input, &message); err != nil {
		return nil
	} else {
		return &message
	}
}
