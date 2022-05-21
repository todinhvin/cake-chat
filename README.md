# Hướng dẫn chạy demo

**_Yêu cầu_**: Đã cài đặt Docker, NodeJS thành công

## Chạy cake chat server

- Pull Docker image:
  `docker pull lukalabs/cakechat:latest`

- Run docker container
  `docker run --name cakechat-server -p 127.0.0.1:8080:8080 -it lukalabs/cakechat:latest bash -c "python bin/cakechat_server.py"`

## Chạy client server (React - port: 3000)

- Cài đặt các thư viện cần thiết
  `npm i`
- Chạy server
  `npm start`

## Chạy api server trung gian (port: 3005)

- Vào thư mục server
  `cd server`
- Cài đặt các thư viện cần thiết
  `npm i`
- Chạy api server
  `node app`
