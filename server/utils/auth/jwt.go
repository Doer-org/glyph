package auth

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/Doer-org/glyph/utils/clock"
	"github.com/google/uuid"
	"github.com/lestrrat-go/jwx/jwa"
	"github.com/lestrrat-go/jwx/jwk"
	"github.com/lestrrat-go/jwx/v2/jwt"
)

const (
	Email = "email"
)

type JWTer struct {
	PrivateKey, PublicKey jwk.Key
	Clocker               clock.Clocker
}

func NewJWTer(c clock.Clocker) (*JWTer, error) {
	j := &JWTer{}
	privkey, err := parse([]byte(os.Getenv("rawPrivKey")))
	if err != nil {
		return nil, fmt.Errorf("failed in NewJWTer: private key: %w", err)
	}
	pubkey, err := parse([]byte(os.Getenv("rawPubKey")))
	if err != nil {
		return nil, fmt.Errorf("failed in NewJWTer: public key: %w", err)
	}
	j.PrivateKey = privkey
	j.PublicKey = pubkey
	j.Clocker = c
	return j, nil
}

func parse(rawKey []byte) (jwk.Key, error) {
	key, err := jwk.ParseKey(rawKey, jwk.WithPEM(true))
	if err != nil {
		return nil, err
	}
	return key, nil
}

func (j *JWTer) GenerateToken(ctx context.Context, session string) ([]byte, error) {
	tok, err := jwt.NewBuilder().
		JwtID(uuid.New().String()).
		Issuer(`github.com/Doer-org/glyph`).
		Subject("access_token").
		IssuedAt(j.Clocker.Now()).
		Expiration(j.Clocker.Now().Add(time.Duration(3600)*time.Minute)).
		Claim(Email, session).
		Build()
	if err != nil {
		return nil, fmt.Errorf("GenerateToken: failed to build token: %w", err)
	}

	// 署名
	signed, err := jwt.Sign(tok, jwt.WithKey(jwa.RS256, j.PrivateKey))
	if err != nil {
		return nil, err
	}
	return signed, nil
}
