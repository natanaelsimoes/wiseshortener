import sequelize, { Model } from "sequelize";
import { DatabaseOptions } from "../Database";

class URL extends Model {
  public url!: string;
  private hash!: string;
  private expiresIn!: Date;

  public getHash(): string {
    return this.hash;
  }

  public getExpiresIn(): Date {
    return this.expiresIn;
  }

  public isExpired(): boolean {
    return this.expiresIn < new Date();
  }

  public renewExpiration(): void {
    this.expiresIn = new Date();
    this.expiresIn.setDate(this.expiresIn.getDate() + 30);
  }
}

export const URLAttributes = {
  hash: {
    type: sequelize.STRING(10),
    primaryKey: true,
  },
  url: {
    type: sequelize.STRING,
    allowNull: false,
  },
  expiresIn: {
    type: sequelize.DATE,
    allowNull: false,
  },
};

URL.init(URLAttributes, DatabaseOptions);

URL.addHook('beforeValidate', (url: URL) => {
  url.renewExpiration();
});

export default URL;
