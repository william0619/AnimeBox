/**
 author: william   email:362661044@qq.com
 create_at: 2024/8/30
 **/

export class UtilCommon {
  static get dirname() {
    try {
      if (__dirname) return __dirname
      return import.meta.dirname
    } catch (e) {
      return import.meta.dirname
    }
  }
}
