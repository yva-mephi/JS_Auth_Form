# JS_Auth_Form

Данный проект создан для учебных целей.

Проект реализует модуль авторизации и регистрации пользователя на вашем сервисе. Разработан с целью изучить минимально необходимый функционал для реализации такого модуля в каком-либо приложении, а также с целью изучить существующие возможности популярных сервисов (таких как Google, Yandex и др.) для авторизации своих пользователей на сторонних ресурсах.

**Frontend**: Bun, Vite, JS, CSS, HTML  
**Backend**: Bun, NodeJS, Docker, PostgreSQL

![Auth2](https://github.com/user-attachments/assets/d6edcc4d-23bd-450b-a785-b485ae7d7026)
![Auth](https://github.com/user-attachments/assets/0ea8fbe0-6b5e-4fb7-b821-dc2aa08454a5)


## Как поднять сервер?

1. Создать файл `.env` в корне проекта, со следующим содержимым:

    ```env
    DB_HOST=db
    DB_USER=user
    DB_PASSWORD=password
    DB_NAME=auth_db
    DB_PORT=5432  # Порт внутри контейнера, а не на хосте
    HOST_PORT=5000
    FRONTEND_URL=http://localhost:3000 # URL вашего фронтенда
    GOOGLE_CLIENT_ID=# Ваш client_id
    GOOGLE_CLIENT_SECRET=# Ваш client_secret
    GOOGLE_CALLBACK=# Ваш указанный редирект
    YANDEX_CLIENT_ID=# Ваш client_id
    YANDEX_CLIENT_SECRET=# Ваш client_secret
    YANDEX_REDIRECT_URI=# Ваш указанный редирект
    MAILRU_CLIENT_ID=# Ваш client_id
    MAILRU_CLIENT_SECRET=# Ваш client_secret
    MAILRU_REDIRECT_URI=# Ваш указанный редирект
    GITHUB_CLIENT_ID=# Ваш client_id
    GITHUB_CLIENT_SECRET=# Ваш client_secret
    GITHUB_REDIRECT_URI=# Ваш указанный редирект
    ```

2. Запустить сервер:

    ```bash
    docker-compose up --build
    ```

## Что сделать, чтобы узнать свои `client_id`, `client_secret`, `redirect_uri`?

По следующим ссылкам создать приложение и взять данные оттуда:

- **Google**: [https://console.cloud.google.com/](https://console.cloud.google.com/)
- **Yandex**: [https://oauth.yandex.ru/](https://oauth.yandex.ru/)
- **Mail.ru**: [https://o2.mail.ru/app/](https://o2.mail.ru/app/)
- **GitHub**: [https://github.com/settings/developers](https://github.com/settings/developers)

## Как реализовать вход через другие сервисы?

1. Перевести проект на протокол HTTPS.
2. Найти сайты нужных сервисов с пометкой для разработчиков.

## Что сделать, чтобы посмотреть БД?

1. Узнайте идентификатор контейнера:

    ```bash
    docker ps
    ```

2. Подключитесь к контейнеру:

    ```bash
    docker exec -it <container_id> psql -U user -d auth_db
    ```

3. Выведите список таблиц:

    ```sql
    \dt
    ```

4. Посмотрите структуру таблицы:

    ```sql
    \d users
    ```

5. Проверьте данные:

    ```sql
    SELECT * FROM users;
    ```

## Как поднять клиентскую часть?

1. Перейти в директорию `frontend`.
2. Ввести команду:

    ```bash
    bun start
    ```
