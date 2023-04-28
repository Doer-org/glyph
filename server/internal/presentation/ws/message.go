package ws

import (
	"encoding/json"
	"fmt"

	"github.com/Doer-org/glyph/internal/domain/entity"
	wsJson "github.com/Doer-org/glyph/internal/presentation/ws/json"
)

func tryParseMessage(input []byte) (result *wsJson.Message, err error) {
	var tmp wsJson.Message
	if err := json.Unmarshal(input, &tmp); err != nil {
		return result, fmt.Errorf("tryParseJson")
	} else if tmp.JsonType != "message" {
		return result, fmt.Errorf("tryParseJson")
	} else {
		return &tmp, nil
	}
}

func receiveMessage(handler func(msg *wsJson.Message) (err error)) func(input []byte) (err error) {
	return func(input []byte) (err error) {
		msg, err := tryParseMessage(input)
		if err != nil {
			return fmt.Errorf("receiveMessage (tryParseJson)")
		}
		return handler(msg)
	}
}

func broadcastMessage(h *Hub, s *Subscription) func(msg *wsJson.Message) (err error) {
	return func(msg *wsJson.Message) (err error) {
		resp := *wsJson.CreateMessage(&entity.MessageData{Name: msg.Data.Name, Message: "receiveMessage : " + msg.Data.Message})
		data, err := json.Marshal(resp)
		if err == nil {
			h.Broadcast <- Message{Room: s.Room, Data: data}
			return nil
		}
		return fmt.Errorf("receiveMessage (handler)")
	}
}

func HandleMessage(h *Hub, s *Subscription) func(input []byte) (err error) {
	return receiveMessage(broadcastMessage(h, s))
}
