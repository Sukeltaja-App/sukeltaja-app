import { AppRegistry, YellowBox } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import AppEntry from './src/AppEntry'

// List for warnings that do not give any useful information.
// These warnings will be ignored.
const ignoredWarnings = []

ignoredWarnings[0] = 'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, \
`key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'

YellowBox.ignoreWarnings(ignoredWarnings)

const ProviderPackedApp = () => {
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  )
}

AppRegistry.registerComponent('SukeltajaApp', () => ProviderPackedApp)

export default ProviderPackedApp
