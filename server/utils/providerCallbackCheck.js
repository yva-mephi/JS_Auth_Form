import { findUserByProviderId } from '../database/findUserByProviderId';
import { registerUser } from '../database/registerUser';

export async function providerCallbackCheck(userData, provider, providerId) {
    let user = await findUserByProviderId(provider, providerId);

    if (!user) {
        // Если пользователь новый, сохраняем его в базу данных
        user = await registerUser(
            userData.email,
            userData.password || null,
            userData.first_name || null,
            userData.last_name || null,
            userData.date_of_birth || null,
            userData.gender || null,
            provider,
            providerId
        );
    }

    // Проверяем, какие данные отсутствуют
    const missingFields = [];
    if (!user.first_name) missingFields.push('first_name');
    if (!user.last_name) missingFields.push('last_name');
    if (!user.date_of_birth) missingFields.push('date_of_birth');
    if (!user.gender) missingFields.push('gender');
    if (!user.password) missingFields.push('password');

    // Возвращаем данные пользователя и список отсутствующих полей
    return {
        user,
        missingFields,
    };
}