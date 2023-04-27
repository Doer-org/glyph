package persistance

import (
	"github.com/Doer-org/glyph/internal/domain/repository"
)

var _ repositry.IImageRepositry = &ImageRepositry{}