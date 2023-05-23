## Build
FROM golang:1.17-buster AS build

RUN apk update && apk add git

WORKDIR /go/src/github.com/Doer-org/glyph

RUN go get github.com/rubenv/sql-migrate/...

COPY . .

RUN go build -o /docker-gs-ping server/cmd/migrate/main.go

## Deploy
FROM gcr.io/distroless/base-debian10

COPY --from=build /docker-gs-ping /docker-gs-ping
COPY --from=build /go/src/github.com/Doer-org/glyph/migrations ./migrations

ENTRYPOINT ["/docker-gs-ping"]