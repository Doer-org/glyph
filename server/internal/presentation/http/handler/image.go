package handler

import (
	"io"
	"net/http"

	"github.com/Doer-org/glyph/internal/domain/entity"
	"github.com/Doer-org/glyph/internal/presentation/http/json"
	"github.com/Doer-org/glyph/internal/usecase"
	"github.com/Doer-org/glyph/log"
	"github.com/Doer-org/glyph/utils"
	"github.com/gin-gonic/gin"
)

type ImageHandler struct {
	uc usecase.IImageUsecase
}

func NewIMageHandler(uc usecase.IImageUsecase) *ImageHandler {
	return &ImageHandler{
		uc: uc,
	}
}

func (u *ImageHandler) CreateImage(ctx *gin.Context) {
	logger := log.New()
	img, _, err := ctx.Request.FormFile("img")
	if err != nil {
		logger.Error("", map[string]string{"error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	source, _ := io.ReadAll(img)

	image, err := u.uc.CreateImage(ctx, &entity.Image{
		Id:  utils.GetUlid(),
		Img: source,
	})
	if err != nil {
		logger.Error("", map[string]string{"error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
	}
	imagejson := json.ImageEntityToJson(image)
	ctx.JSON(
		http.StatusCreated,
		gin.H{"data": imagejson},
	)
}

func (u *ImageHandler) GetImagebyId(ctx *gin.Context) {
	logger := log.New()
	id := ctx.Param("id")
	image, err := u.uc.GetImagebyId(ctx, id)
	if err != nil {
		logger.Error("", map[string]string{"error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
	}
	ctx.Data(http.StatusOK, "image/jpeg", image.Img)
}

func (u *ImageHandler) GetImageAll(ctx *gin.Context) {
	logger := log.New()
	images, err := u.uc.GetImageALL(ctx)
	if err != nil {
		logger.Error("", map[string]string{"error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	for _, image := range images {
		ctx.Data(http.StatusOK, "image/jpeg", image.Img)
	}
}

func (u *ImageHandler) DeleteImage(ctx *gin.Context) {
	logger := log.New()
	id := ctx.Param("id")
	err := u.uc.DeleteImage(ctx, id)
	if err != nil {
		logger.Error("", map[string]string{"error": err.Error()})
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"error": err.Error()},
		)
		return
	}
	ctx.JSON(
		http.StatusCreated,
		gin.H{"data": "success"},
	)
}
