// import '@renderer/lib/i18next.ts'
import './globals.css'
import { WinBar } from '@renderer/components/WinBar'
import { useClientInit } from '@renderer/hooks/useClientInit.ts'
import { ErrorBoundary } from 'react-error-boundary'
import { RouterProvider } from 'react-router'
import { router } from '@renderer/app/router/routes.tsx'
import 'dayjs/locale/zh-cn'

// const lngs = {
//   en: { nativeName: 'English' },
//   zh: { nativeName: '中文' }
// }

function App() {
  useClientInit()
  // const { t, i18n } = useTranslation()

  return (
    <ErrorBoundary fallback={<h1>error...</h1>}>
      <WinBar />
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
