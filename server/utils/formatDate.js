export const formatDate = (dateString) => {
    if (!dateString) return null; // Если дата отсутствует, возвращаем null

    // Разделяем строку на день, месяц и год
    const [day, month, year] = dateString.split('.');

    // Формируем дату в формате гггг-мм-дд
    return `${year}-${month}-${day}`;
};