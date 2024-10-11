/**
 author: william   email:362661044@qq.com
 create_at: 2024/8/30
 **/
import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3'
import log from 'electron-log'
import { app } from 'electron'
import fsExtra from 'fs-extra'
import path from 'node:path'
import { record, users } from './schema'
import { UtilCommon } from '../utils/util.common'

export class DB {
  get dbPath() {
    const userData = app.getPath('userData')
    return path.join(userData, './DataBase/data.db')
  }

  get migratePath() {
    return path.join(UtilCommon.dirname, './migrations')
  }

  db: BetterSQLite3Database

  constructor() {
    this.checkAndCreatedDb()
    const sqlite = new Database(this.dbPath)
    this.db = drizzle(sqlite)
    this.migrate()
  }

  static Init() {
    if (globalThis.db) {
      return globalThis.db
    }
    const db = new DB()
    globalThis.db = db.db
    return db
  }

  private checkAndCreatedDb() {
    fsExtra.createFileSync(this.dbPath)
  }

  private migrate() {
    // 检查版本
    migrate(this.db, { migrationsFolder: this.migratePath })
  }

  async insert() {
    setTimeout(async () => {
      await this.db.insert(users).values({ name: 'william2', age: 12 })
      await this.db.insert(record).values({ text: 'rizzle-orm/better-sqlite3/migrator' })
      const result = await this.db.select().from(users)
      log.info('data=>>>>>', JSON.stringify(result))
    }, 1000)
  }
}
