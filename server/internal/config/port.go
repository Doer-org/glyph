package config

import "github.com/Doer-org/glyph/utils"

func Port() string {
	return utils.GetEnvOrDefault("PORT", "8080")
}
