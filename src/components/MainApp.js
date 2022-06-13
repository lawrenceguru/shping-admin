import React, { useEffect, useState, lazy, Suspense } from 'react'
import intl from 'react-intl-universal'
import { Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styledTheme from 'themes/primary'
import LoginPage from './pages/LoginPage'
import RestorePasswordPage from './pages/RestorePasswordPage'
import RestoreSendEmailPage from './pages/RestoreSendEmailPage'
import Loader from './templates/Loader'
import locales from '../intl'
import PrivateRoute from '../containers/PrivateRoute'
import UnprivateRoute from '../containers/UnprivateRoute'

const App = lazy(() => import('./App'))

toast.configure({
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnVisibilityChange: true,
  draggable: true,
  pauseOnHover: true
})

const MainApp = () => {
  const [init, isInit] = useState(false)
  const [locale] = useState('en')

  const loadLocales = () => {
    let currentLocale = localStorage.getItem('lang')
    if (currentLocale === '' || currentLocale === null) {
      currentLocale = locale
      localStorage.setItem('lang', 'en')
    }
    intl
      .init({
        currentLocale,
        locales
      })
      .then(() => {
        isInit(true)
      })
  }
  useEffect(() => {
    loadLocales()
  }, [locale])
  return (
    <ThemeProvider theme={styledTheme}>
      {init && (
        <Suspense fallback={<Loader />}>
          <Switch>
            <UnprivateRoute component={LoginPage} exact path='/' redirect='/admin' />
            <UnprivateRoute component={RestorePasswordPage} exact path='/reset-password/:code' />
            <UnprivateRoute component={RestoreSendEmailPage} exact path='/reset-password' />
            <PrivateRoute component={App} path='/admin' redirect='/' />
            <UnprivateRoute component={LoginPage} path='/:token?' redirect='/admin' />
          </Switch>
        </Suspense>
      )}
    </ThemeProvider>
  )
}

export default MainApp
