package ws

import (
	"encoding/json"
	"fmt"
	wsJson "github.com/Doer-org/glyph/internal/presentation/ws/json"
)

func tryParseComment(input []byte) (result *wsJson.Comment, err error) {
	var tmp wsJson.Comment
	if err := json.Unmarshal(input, &tmp); err != nil {
		return result, fmt.Errorf("tryParseJson")
	} else if tmp.JsonType != "comment" {
		return result, fmt.Errorf("tryParseJson")
	} else {
		return &tmp, nil
	}
}

func receiveComment(handler func(msg *wsJson.Comment) (err error)) func(input []byte) (err error) {
	return func(input []byte) (err error) {
		msg, err := tryParseComment(input)
		if err != nil {
			return fmt.Errorf("receiveComment (tryParseJson)")
		}
		return handler(msg)
	}
}

func broadcastComment(h *Hub, s *Subscription) func(msg *wsJson.Comment) (err error) {
	return func(msg *wsJson.Comment) (err error) {
		resp := *wsJson.CreateComment(&wsJson.CommentData{
			UserName: msg.Data.UserName,
			UserImg:  msg.Data.UserImg,
			UserId:   msg.Data.UserId,
			Comment:  msg.Data.Comment,
		})
		data, err := json.Marshal(resp)
		if err == nil {
			h.Broadcast <- Message{Room: s.Room, Data: data}
			return nil
		}
		return fmt.Errorf("receiveMessage (handler)")
	}
}

func HandleComment(h *Hub, s *Subscription) func(input []byte) (err error) {
	return receiveComment(broadcastComment(h, s))
}
