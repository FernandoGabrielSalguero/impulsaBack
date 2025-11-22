export const jwtConstants = {
    accessSecret: 'impulsa_access_dev_secret',
    refreshSecret: 'impulsa_refresh_dev_secret',

    // tiempo en segundos (number) → TypeScript queda feliz
    accessExpiresIn: 60 * 15,         // 15 minutos
    refreshExpiresIn: 60 * 60 * 24 * 7, // 7 días
};
