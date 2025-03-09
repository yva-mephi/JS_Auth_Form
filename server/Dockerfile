FROM node:22 AS bun-installer
RUN npm install -g bun

FROM node:22
# Копируем Bun из первого этапа
COPY --from=bun-installer /usr/local/bin/bun /usr/local/bin/bun

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Устанавливаем postgresql-client
RUN apt update && apt install -y postgresql-client

# Копируем package.json и bun.lockb
COPY package.json bun.lockb ./

# Устанавливаем зависимости
RUN bun install

# Копируем исходный код
COPY . .

# Открываем порт
EXPOSE 5000

# Запускаем сервер
CMD ["bun", "run", "server.js"]