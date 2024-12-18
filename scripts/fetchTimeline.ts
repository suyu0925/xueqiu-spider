import XueqiuApi from './api'
import fs from 'fs'
import accounts from "../dev-accounts.json" with { type: "json" }
import type { UserTimelineStatus } from './api.types'

const loadExistingTimeline = async (userId: number): Promise<UserTimelineStatus[]> => {
  const file = `./data/timeline_${userId}.json`
  return (
    fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file, 'utf-8'))
      : []
  )
}

const saveTimeline = async (userId: number, timeline: UserTimelineStatus[]): Promise<void> => {
  const file = `./data/timeline_${userId}.json`
  fs.writeFileSync(file, JSON.stringify(timeline, null, 4))
}

const mergeTimeline = (a: UserTimelineStatus[], b: UserTimelineStatus[]): UserTimelineStatus[] => {
  const map = new Map<number, UserTimelineStatus>()
  for (const status of a) {
    map.set(status.id, status)
  }
  for (const status of b) {
    map.set(status.id, status)
  }
  return Array.from(map.values())
}

const tasks = accounts.map(async (account) => {
  const api = new XueqiuApi()
  await api.init()
  const timelineRes = await api.fetchUserTimeline(account.id)
  const oldTimeline = await loadExistingTimeline(account.id)
  const timeline = mergeTimeline(oldTimeline, timelineRes.statuses)
  await saveTimeline(account.id, timeline)
  await api.dispose()
})

for (const task of tasks) {
  await task
}
