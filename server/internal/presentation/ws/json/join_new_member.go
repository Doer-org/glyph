package json

import "github.com/Doer-org/glyph/internal/presentation/ws/entity"

// JoinNewMember
// https://infraya.work/posts/go_json_parse_aws/
// https://ryota21silva.hatenablog.com/entry/2022/02/13/190226
type JoinNewMember struct {
	JsonType string        `json:"type"`
	Data     entity.Member `json:"data"`
}

func CreateJoinNewMember(member *entity.Member) *JoinNewMember {
	return &JoinNewMember{
		JsonType: "join_new_member",
		Data:     *member,
	}
}
