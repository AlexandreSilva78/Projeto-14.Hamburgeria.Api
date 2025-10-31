module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: '123456',
  database: 'sanny-burguer-db',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
