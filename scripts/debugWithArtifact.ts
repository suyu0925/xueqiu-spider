import fs from 'fs'
import accounts from '../dev-accounts.json' with { type: 'json' }
import XueqiuApi from './api'

const debugPath = 'debug-artifact'
fs.mkdirSync(debugPath, { recursive: true })

const api = new XueqiuApi()
await api.init()
await api.screenshot(`${debugPath}/home.png`)
for (const account of accounts) {
  console.log(`Fetching timeline for ${account.screen_name}`)
}
await api.dispose()
