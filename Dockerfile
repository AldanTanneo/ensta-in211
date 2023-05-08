FROM node:18 as builder

WORKDIR /build-front

COPY ./frontend/package*.json .
RUN npm install

COPY ./frontend .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

COPY ./backend /app
COPY --from=builder /build-front/build /app/public

RUN npm install

CMD ["npm", "run", "start"]
