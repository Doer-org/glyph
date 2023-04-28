package json

type CommentData struct {
	UserName string `json:"user_name"`
	UserImg  string `json:"user_img"`
	UserId   string `json:"user_id"`
	Comment  string `json:"comment"`
}

type Comment struct {
	JsonType string      `json:"type"`
	Data     CommentData `json:"data"`
}

func CreateComment(comment *CommentData) *Comment {
	return &Comment{
		JsonType: "comment",
		Data:     *comment,
	}
}
