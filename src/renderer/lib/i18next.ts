/**
 author: william   email:362661044@qq.com
 create_at: 2024/10/10
 **/
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
// import dayjs from 'dayjs'
import HttpApi from 'i18next-http-backend'

i18n
  .use(HttpApi)
  // 检测用户当前使用的语言
  // 文档: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // 注入 react-i18next 实例
  .use(initReactI18next)
  // 初始化 i18next
  // 配置参数的文档: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  })

// i18n.services.formatter.add('DD/MM/YY', (value) => {
//   return dayjs(value).format('DD/MM/YY')
// })
//
// i18n.services.formatter.add('YYYY-MM-DD', (value, lng, options) => {
//   return dayjs(value).format('YYYY-MM-DD')
// })

export const i18next = i18n
