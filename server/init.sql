CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    date_of_birth DATE,
    gender VARCHAR(10),
    provider VARCHAR(50),  -- Тип провайдера (google, yandex, vk и т.д.)
    provider_id VARCHAR(255),  -- Уникальный идентификатор пользователя от провайдера
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (provider, provider_id)  -- Уникальная пара provider + provider_id
);