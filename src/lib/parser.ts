import { MHWIldsEventResponse } from '../types'
import scrape from '../scraper'
import { getMHWildsEvents } from '../quest-parser/events'

export const parseMHWildsEvents: (url: string) => Promise<MHWIldsEventResponse> = async (
  url: string
) => {
  const data = await scrape(url)
  const events = await getMHWildsEvents(data)

  return events
}
