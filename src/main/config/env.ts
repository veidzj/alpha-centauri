export const env = {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/alpha-centauri',
  port: process.env.PORT ?? 5050
}
