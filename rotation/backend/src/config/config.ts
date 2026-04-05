export default {
    port: process.env.PORT || 4000,
    corsOrigin: process.env["CORS_ORIGIN"] || "http://localhost:3000",
    databaseUrl: process.env["DIRECT_URL"] || "postgresql://postgres.yjadbcmbwmdvqvhpgktu:R9DE.Z7J2K!_zn*@aws-1-us-east-2.pooler.supabase.com:5432/postgres",
}