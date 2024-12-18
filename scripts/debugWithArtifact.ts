import fs from 'fs'
import accounts from "../dev-accounts.json" with { type: "json" }
import XueqiuApi from './api'

const debugPath = 'debug-artifact'
fs.mkdirSync(debugPath, { recursive: true })

const api = new XueqiuApi()
await api.init()
for (const account of accounts) {
  await api.screenshot(`${debugPath}/home.png`)
  const timelineRes = await api.fetchUserTimeline(account.id)
  await api.screenshot(`${debugPath}/home2.png`)
}
await api.dispose()
