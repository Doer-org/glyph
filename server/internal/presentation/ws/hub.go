package ws

import (
	"github.com/Doer-org/glyph/internal/presentation/ws/json"
	"github.com/gorilla/websocket"
)

type connection struct {
	ws                *websocket.Conn
	send              chan []byte
	sendJoinNewMember chan json.JoinNewMember
}

type roomId = string

type Subscription struct {
	conn *connection
	Room roomId
}

type Message struct {
	Room roomId `json:"room"`
	Data []byte `json:"data"`
}

type Hub struct {
	rooms      map[roomId]map[*connection]bool
	register   chan Subscription
	unregister chan Subscription
	Broadcast  chan Message
}

func InitHub() *Hub {
	return &Hub{
		Broadcast:  make(chan Message),
		register:   make(chan Subscription),
		unregister: make(chan Subscription),
		rooms:      make(map[roomId]map[*connection]bool),
	}
}

//func (h *Hub) Send(s *subscription, message string) {
//	s.conn.write(1, []byte(message))
//}

func (h *Hub) Run() {
	for {
		select {
		case s := <-h.register:
			connections := h.rooms[s.Room]
			if connections == nil {
				connections = make(map[*connection]bool)
				h.rooms[s.Room] = connections
			}
			h.rooms[s.Room][s.conn] = true

		case s := <-h.unregister:
			connections := h.rooms[s.Room]
			if connections != nil {
				if _, ok := connections[s.conn]; ok {
					delete(connections, s.conn)
					close(s.conn.send)
					if len(connections) == 0 {
						delete(h.rooms, s.Room)
					}
				}
			}

		case msg := <-h.Broadcast:
			connections := h.rooms[msg.Room]
			for conn := range connections {
				select {
				case conn.send <- msg.Data:
				default:
					close(conn.send)
					delete(connections, conn)
					if len(connections) == 0 {
						delete(h.rooms, msg.Room)
					}
				}
			}
		}
	}
}
