package json

import (
	"github.com/Doer-org/glyph/internal/domain/entity"
)

type Message struct {
	JsonType string             `json:"type"`
	Data     entity.MessageData `json:"data"`
}

func CreateMessage(message *entity.MessageData) *Message {
	return &Message{
		JsonType: "message",
		Data:     *message,
	}
}
