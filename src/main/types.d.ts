/// <reference types="vite/client" />

import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'

declare global {
  // desk 使用
  // eslint-disable-next-line no-var
  var willQuitApp: boolean

  // eslint-disable-next-line no-var
  var db: BetterSQLite3Database
}
export {}
