import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { TABLES } from './tables-consts';

@Injectable()
export class SqlLiteService {
  constructor(public sqlite: SQLite) {}

  async createDB(): Promise<void> {
    this.getDb()
      .then((db: SQLiteObject) => {
        this.createTables(db);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async query(sql: string, params: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.getDb()
        .then(async (db: SQLiteObject) => {
          const data = await db.executeSql(sql, params);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public getDb(): Promise<SQLiteObject> {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default',
    });
  }

  private async createTables(db: SQLiteObject): Promise<void> {
    const tables = TABLES;
    try {
      for (const table of tables) {
        const data = await db.executeSql(table, []);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
