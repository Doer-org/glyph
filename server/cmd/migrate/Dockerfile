## Build
FROM golang:1.19-buster AS build

WORKDIR /go/src/github.com/Doer-org/glyph

RUN go mod init docker-gs-ping

RUN go get github.com/rubenv/sql-migrate/...
RUN go get github.com/go-sql-driver/mysql/...
RUN go get github.com/seipan/logdis

COPY . .

RUN go build -o /docker-gs-ping

## Deploy
FROM gcr.io/distroless/base-debian10

COPY --from=build /docker-gs-ping /docker-gs-ping

ENTRYPOINT ["/docker-gs-ping"]