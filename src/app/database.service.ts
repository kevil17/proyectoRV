import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";

/* import { AlarmService } from './alarm.service'; */
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  databaseObj: SQLiteObject;
  tables = {
    events: "events",
  };
  
  constructor(private sqlite: SQLite) { }

  async createDatabase() {
    await this.sqlite
      .create({
        name: "ionic_sqlite_crud",
        location: "default",
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
      })
      .catch((e) => {
        alert("error on creating database " + JSON.stringify(e));
      });

    await this.createTables();
  }
  async createTables() {
    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.events} (id INTEGER PRIMARY KEY AUTOINCREMENT, name_event VARCHAR(255) NOT NULL UNIQUE,  message VARCHAR(255) NOT NULL ,  date VARCHAR(255) NOT NULL ,  hour VARCHAR(255) NOT NULL)`,
      []
    );
  }
  async addEvent(name: string, message: string, date: string, hour: string) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.events} (name_event, message, date, hour) VALUES ('${name}', '${message}','${date}', '${hour}')`,
        []
      )
      .then(() => {
        /* this.alarm.createNotifications(); */
        return "event created";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "event already exists"; // no pueden existir dos categorias con el mismo nombre
        }

        return "error on creating event " + JSON.stringify(e);
      });
      
  }

  async getEvent() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM ${this.tables.events} ORDER BY name_event ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "error on getting events " + JSON.stringify(e);
      });
  }

  async deleteEvent(id: number) {
    return this.databaseObj
      .executeSql(`DELETE FROM ${this.tables.events} WHERE id = ${id}`, [])
      .then(() => {
        /* this.alarm.createNotifications(); */
        return "event deleted";
      })
      .catch((e) => {
        return "error on deleting event " + JSON.stringify(e);
      });
      
  }

  async editEvent(name: string, message: string, date: string, hour: string,  id: number) {
    return this.databaseObj
      .executeSql(
        `UPDATE ${this.tables.events} SET name_event = '${name}', message = '${message}', date = '${date}', hour = '${hour}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        /* this.alarm.createNotifications(); */
        return "event updated";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "event already exist";
        }

        return "error on updating event " + JSON.stringify(e);
      });
      
  }
  
}
