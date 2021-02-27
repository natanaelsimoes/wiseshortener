import { Sequelize, Options } from "sequelize";
import Config from "./DatabaseConfig.json";

const config: Options = {
  ...Config[process.env.NODE_ENV ?? "development"],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: false,
  },
};

if (process.env.DATABASE_SSL === "false") delete config.dialectOptions;

class Database {
  public connection!: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = process.env.DATABASE_URL
      ? new Sequelize(process.env.DATABASE_URL, config)
      : new Sequelize(config);
  }
}

const database: Database = new Database();

export const DatabaseOptions = {
  sequelize: database.connection,
  freezeTableName: true,
};

export default database;
