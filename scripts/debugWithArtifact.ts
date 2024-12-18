import fs from 'fs'
import XueqiuApi from './api'

const debugPath = 'debug-artifact'
fs.mkdirSync(debugPath, { recursive: true })

const api = new XueqiuApi()
await api.init()
await api.screenshot(`${debugPath}/home.png`)
await api.dispose()
