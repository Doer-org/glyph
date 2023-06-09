package ws

import (
	"fmt"
	"net/http"
	"time"

	"github.com/Doer-org/glyph/log"

	"github.com/Doer-org/glyph/internal/config"
	"github.com/gorilla/websocket"
)

func applyHandlers(input []byte, fs []func(input []byte) (err error)) (err error) {
	for i := range fs {
		if err := fs[i](input); err == nil {
			return nil
		}
	}
	return fmt.Errorf("applyHandlers (No Match)")
}

func (s *Subscription) readPump(h *Hub) {
	logger := log.New()
	c := *s.conn
	defer func() {
		h.unregister <- *s
		err := c.ws.Close()
		if err != nil {
			return
		}
	}()
	c.ws.SetReadLimit(config.MaxMessageSize)
	err := c.ws.SetReadDeadline(time.Now().Add(config.PongWait))
	if err != nil {
		return
	}
	c.ws.SetPongHandler(func(string) error {
		err := c.ws.SetReadDeadline(time.Now().Add(config.PongWait))
		if err != nil {
			return err
		}
		return nil
	})
	for {
		_, msg, err := c.ws.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				logger.Error("", map[string]interface{}{"place": "websocket", "err": err.Error()})
			}
			break
		}
		if err := applyHandlers(msg, []func(input []byte) (err error){
			HandleComment(h, s),
			HandleMessage(h, s),
			HandleJoinNewMember(h, s),
		}); err != nil {
			h.Broadcast <- Message{s.Room, []byte("Unexpected Message")}
			fmt.Println(err)
		}
	}
}

func (c *connection) write(messageType int, payload []byte) error {
	err := c.ws.SetWriteDeadline(time.Now().Add(config.WriteWait))
	if err != nil {
		return err
	}
	return c.ws.WriteMessage(messageType, payload)
}

func (s *Subscription) writePump() {
	c := s.conn
	ticker := time.NewTicker(config.PingPeriod)
	defer func() {
		ticker.Stop()
		err := c.ws.Close()
		if err != nil {
			return
		}
	}()
	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				err := c.write(websocket.CloseMessage, []byte{})
				if err != nil {
					return
				}
				return
			}
			if err := c.write(websocket.TextMessage, message); err != nil {
				return
			}
		case <-ticker.C:
			if err := c.write(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}

func (h *Hub) ServeWs(w http.ResponseWriter, r *http.Request, roomId string) {
	logger := log.New()
	ws, err := config.Upgrader.Upgrade(w, r, nil)
	if err != nil {
		logger.Error("", map[string]interface{}{"place": "websocket", "err": err.Error()})
		return
	}
	c := &connection{send: make(chan []byte, 256), ws: ws}
	s := &Subscription{c, roomId}
	fmt.Print(roomId)
	h.register <- *s
	go s.writePump()
	go s.readPump(h)
}
