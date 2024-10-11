// /**
//  author: william   email:362661044@qq.com
//  create_at: 2024/8/30
//  **/
// import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3'
// import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
// import Database from 'better-sqlite3'
// import log from 'electron-log'
// import { app } from 'electron'
// import fsExtra from 'fs-extra'
// import path from 'node:path'
// import { record, users } from './schema'
//
// export const InitDB = async () => {
//   const userData = app.getPath('userData')
//   const dbPath = path.join(userData, './DataBase/data.db')
//   fsExtra.createFileSync(dbPath)
//   console.log('Database', Database)
//   const sqlite = new Database(dbPath)
//   console.log('sqlite', sqlite)
//   const db: BetterSQLite3Database = drizzle(sqlite)
//   // 判断一下才 migrate
//   // migrate(db, { migrationsFolder: path.join(__dirname, './migrations') })
//   //
//   // setTimeout(async () => {
//   //   await db.insert(users).values({ name: 'william2', age: 12 })
//   //   await db.insert(record).values({ text: 'rizzle-orm/better-sqlite3/migrator' })
//   //   const result = await db.select().from(users)
//   //   log.info('data=>>>>>', JSON.stringify(result))
//   // }, 1000)
// }
