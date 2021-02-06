
module.exports = {
  test: {
    database: 'mb-test',
    storage: 'test.sqlite',
    dialect: 'sqlite',
    seederStorage: 'sequelize',
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    logging: false
  },
  development: {
    database: 'mb-api-dev',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    pool: {
      max: 5,
      min: 0,
      idle: 300000,
      acquire: 300000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    },
    // timezone: '-03:00', // for writing to database
    logging: false
  },
  production: {
    host: process.env.POSTGRES_HOST,
    database: 'mb-api-prd',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    port: process.env.POSTGRES_PORT,
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    define: {
      timestamps: true,
      underscored: true
    },
    // timezone: '-03:00', // for writing to database
    logging: false
  }
}
