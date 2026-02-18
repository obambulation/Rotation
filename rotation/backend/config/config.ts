export default {
    port: process.env.PORT || 4000,
    corsOrigin: process.env["CORS_ORIGIN"] || "http://localhost:3000",
    databaseUrl: process.env["DATABASE_URL"],
}