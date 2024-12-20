import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export let sequelize;

const initDb = () => {
  const dbType = process.env.DB_TYPE || "sqlite"; // Default to SQLite
  const dbStorage = process.env.DB_STORAGE || ":memory:"; // Default SQLite file
  const dbName = process.env.DB_NAME || "database";
  const dbUser = process.env.DB_USER || "user";
  const dbPass = process.env.DB_PASS || "password";
  const dbHost = process.env.DB_HOST || "localhost";

  try {
    switch (dbType) {
      case "sqlite":
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: dbStorage,
          logging: false
        });
        break;   
      case "mysql":
        sequelize = new Sequelize(dbName, dbUser, dbPass, {
          host: dbHost,
          dialect: "mysql",
          logging: false
        });
        break;    
      case "postgres":
        sequelize = new Sequelize(dbName, dbUser, dbPass, {
          host: dbHost,
          dialect: "postgres",
          logging: false
        });
        break;    
      default:
        throw new Error(`Unsupported database type: ${dbType}`);
    }    
    console.log(`Database initialized: ${dbType}`);
  } catch (err) {
    console.error(`Error initializing database: ${err.message}`);
  }
};

initDb();

export default sequelize;