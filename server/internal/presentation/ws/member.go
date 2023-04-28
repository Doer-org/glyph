package ws

import (
	"encoding/json"
	"fmt"
	"github.com/Doer-org/glyph/internal/presentation/ws/entity"
	wsJson "github.com/Doer-org/glyph/internal/presentation/ws/json"
)

func tryParseJoinNewMember(input []byte) (result *wsJson.JoinNewMember, err error) {
	var tmp wsJson.JoinNewMember
	if err := json.Unmarshal(input, &tmp); err != nil {
		return result, fmt.Errorf("tryParseJson")
	} else if tmp.JsonType != "join_new_member" {
		return result, fmt.Errorf("tryParseJson")
	} else {
		return &tmp, nil
	}
}

func receiveJoinNewMember(handler func(msg *wsJson.JoinNewMember) (err error)) func(input []byte) (err error) {
	return func(input []byte) (err error) {
		msg, err := tryParseJoinNewMember(input)
		if err != nil {
			return fmt.Errorf("receiveJoinNewMember (tryParseJson)")
		}
		return handler(msg)
	}
}

func broadcastMember(h *Hub, s *Subscription) func(msg *wsJson.JoinNewMember) (err error) {
	return func(msg *wsJson.JoinNewMember) (err error) {
		resp := *wsJson.CreateJoinNewMember(&entity.Member{Name: "receiveJoinNewMember : " + msg.Data.Name})
		data, err := json.Marshal(resp)
		if err == nil {
			h.Broadcast <- Message{Room: s.Room, Data: data}
			return nil
		}
		return fmt.Errorf("receiveMessage (handler)")
	}
}

func HandleJoinNewMember(h *Hub, s *Subscription) func(input []byte) (err error) {
	return receiveJoinNewMember(broadcastMember(h, s))
}
