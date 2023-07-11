package utils

import (
	"fmt"
	"time"
)

func JSTNow() (time.Time, error) {
	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		return time.Time{}, fmt.Errorf("can't get time")
	}
	now := time.Now().In(jst)
	return now, nil
}
