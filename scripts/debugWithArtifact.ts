import fs from 'fs'
import puppeteer from 'puppeteer'
import type { Browser, Page } from 'puppeteer'

const ignoreImages = async (page: Page) => {
  await page.setRequestInterception(true)

  page.on('request', (request) => {
    if (request.isInterceptResolutionHandled()) {
      return
    }
    const resourceType = request.resourceType()
    if (resourceType === 'image') {
      request.abort()
    } else {
      request.continue()
    }
  })
}

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1080, height: 1024 })
await ignoreImages(page)

const debugPath = 'debug-artifact'
fs.mkdirSync(debugPath, { recursive: true })

await page.goto('https://google.com')

await page.screenshot({ path: `${debugPath}/screenshot_google.png` })

await page.goto('https://xueqiu.com/')

await page.screenshot({ path: `${debugPath}/screenshot_xueqiu.png` })

await browser.close()
