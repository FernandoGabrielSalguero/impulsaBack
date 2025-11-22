export const jwtConstants = {
    accessSecret: 'impulsa_access_dev_secret',   // 👈 en producción usá variables de entorno
    refreshSecret: 'impulsa_refresh_dev_secret',
    accessExpiresIn: '15m',   // token de acceso
    refreshExpiresIn: '7d',   // refresh token
};
