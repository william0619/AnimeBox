/**
 author: william   email:362661044@qq.com
 create_at: 2024/10/11
 **/
import { createHashRouter } from 'react-router-dom'
import MainLayout from '@renderer/app/layout/MainLayout.tsx'
import CollectedPage from '@renderer/app/module/Collected'
import { RouteObject } from 'react-router/dist/lib/context'
import { Binoculars, Download, SquareLibrary } from 'lucide-react'
import { i18next } from '@renderer/lib/i18next.ts'
import DiscoverPage from '@renderer/app/module/Discover'
import DownloadPage from '@renderer/app/module/Download'
import SettingPage from '@renderer/app/module/Setting'
import { ExoticComponent } from 'react'

export const navRoutes: Array<
  RouteObject & {
    extMate: {
      icon: ExoticComponent<any>
      label: string
    }
  }
> = [
  {
    path: '/discover',
    element: <DiscoverPage />,
    extMate: {
      icon: Binoculars,
      label: i18next.t('发现')
    }
  },
  {
    path: '/collected',
    element: <CollectedPage />,
    extMate: {
      icon: SquareLibrary,
      label: i18next.t('收藏')
    }
  },
  {
    path: '/download',
    element: <DownloadPage />,
    extMate: {
      icon: Download,
      label: i18next.t('下载')
    }
  }
]

export const navList = navRoutes.map((item) => {
  return { ...item.extMate, path: item.path }
})

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      ...navRoutes,
      {
        path: 'setting',
        element: <SettingPage />
      }
    ]
  }
])
