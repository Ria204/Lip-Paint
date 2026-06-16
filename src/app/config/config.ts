import dotenv from "dotenv";

dotenv.config();

export default {
    db_url : process.env.DB_URL,
    port : process.env.PORT,
    node_env: process.env.NODE_ENV,
    bcrypt_salt_round : process.env.BCRYPT_SALT_ROUND,
    jwt_access_secret : process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in : process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_secret : process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires_in : process.env.JWT_REFRESH_EXPIRES_IN,
    reset_password_url : process.env.RESET_PASSWORD_URL,
    smtp_user : process.env.SMTP_USER,
    smtp_pass : process.env.SMTP_PASS,
}