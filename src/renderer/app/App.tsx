import '@renderer/lib/i18next.ts'
import './globals.css'
import { useTranslation } from 'react-i18next'
import { WinBar } from '@renderer/components/WinBar'
import { useClientInit } from '@renderer/hooks/useClientInit.ts'
import { ErrorBoundary } from 'react-error-boundary'

const lngs = {
  en: { nativeName: 'English' },
  zh: { nativeName: '中文' }
}

function App() {
  useClientInit()
  const { t, i18n } = useTranslation()

  return (
    <ErrorBoundary fallback={<h1>error...</h1>}>
      <div id={'layout'} className={'grid grid-cols-[12rem_1fr] w-screen h-screen'}>
        <WinBar />
        <div className={'bg-zinc-50 pt-8 '}>
          <div className={'px-3 py-1'}>
            <div className={'flex gap-2'}>
              <h1>Anime Box</h1>
              <div>img</div>
            </div>
            <nav></nav>
          </div>
        </div>
        <section className={'pt-8'}></section>
      </div>
    </ErrorBoundary>
  )
}

export default App
