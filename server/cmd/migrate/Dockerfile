## Build
FROM golang:1.17-buster AS build

RUN apk update && apk add git

WORKDIR /go/src/github.com/Doer-org/glyph

RUN go get github.com/rubenv/sql-migrate/...

COPY . .

RUN go build -o /docker-gs-ping cmd/migrate/main.go

## Deploy
FROM gcr.io/distroless/base-debian10

COPY --from=build /docker-gs-ping /docker-gs-ping

ENTRYPOINT ["/docker-gs-ping"]