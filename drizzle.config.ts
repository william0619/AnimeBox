/**
 author: william   email:362661044@qq.com
 create_at: 2024/8/30
 **/

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite', // "mysql" | "sqlite"
  schema: './src/main/db/schema.ts',
  out: './migrations'
})
// export default {
//   schema: './db/schema.ts',
//   out: './db/migrations',
//   dialect: 'sqlite',
//   dbCredentials: {
//     url: './db/demo.db'
//   }
// } satisfies Config
