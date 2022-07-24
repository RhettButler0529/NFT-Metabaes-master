import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import '../styles/header.css'
import '../styles/feature.css'
import '../styles/loadmap.css'
import '../styles/faq.css'
import '../styles/about.css'
import '../styles/footer.css'
import { Provider } from 'react-redux'
//import store from '../store/index'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from '../store/configureStore'

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps}>
        </Component>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
