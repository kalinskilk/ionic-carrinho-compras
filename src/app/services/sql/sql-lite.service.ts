import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { browserDBInstance } from './browser-instance';
import { TABLES } from './tables-consts';

@Injectable()
export class SqlLiteService {
  private dataBase: SQLiteObject;
  constructor(public sqlite: SQLite, private platform: Platform) {}

  async createDB(): Promise<void> {
    this.getDb()
      .then((db: SQLiteObject) => {
        this.createTables(db);
        this.dataBase = db;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async query(sql: string, params: any[]): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const data = await this.dataBase.executeSql(sql, params);
        const result = [];
        for (let i = 0; i < data?.rows?.length; i++) {
          const item = data.rows.item(i);
          result.push(item);
        }

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async delete(sql: string, params: any[]): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const data = await this.dataBase.executeSql(sql, params);

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  getDb(): Promise<SQLiteObject> {
    if (!this.platform.is('cordova')) {
      return new Promise<any>((resolve) => {
        const db = (window as any).openDatabase(
          'DB_FINAN',
          '1.0',
          'WebSQL Database',
          2 * 1024 * 1024
        );
        resolve(browserDBInstance(db));
      });
    } else {
      return this.sqlite.create({
        name: 'DB_FINAN.db',
        location: 'default',
      });
    }
  }

  private async createTables(db: SQLiteObject): Promise<void> {
    const tables = TABLES;
    try {
      for (const table of tables) {
        const data = await db.executeSql(table, []);
        console.log(table);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
