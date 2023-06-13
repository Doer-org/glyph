package gcs

import (
	"context"
	"os"

	"cloud.google.com/go/storage"
)

type Bucket struct {
	bucket *storage.BucketHandle
}

func NewBucket() *Bucket {
	client, _ := storage.NewClient(context.Background())

	bucket := client.Bucket(os.Getenv("GCP_BUCKET"))
	bc := &Bucket{
		bucket: bucket,
	}
	return bc
}
