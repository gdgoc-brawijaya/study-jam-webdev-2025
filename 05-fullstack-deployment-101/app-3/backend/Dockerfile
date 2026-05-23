FROM golang:1.24-alpine AS builder

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /out/server .

FROM alpine:3.20

WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
RUN mkdir -p /data && chown -R app:app /data

COPY --from=builder /out/server /usr/local/bin/server

EXPOSE 8080

USER app

CMD ["server"]
