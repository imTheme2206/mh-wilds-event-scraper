import { MHWIldsEventResponse, MHWIldsEventResponseV2 } from 'types'
import scrape from '../scraper'
import { getMHWildsEventsV2 } from 'quest-parser/events'

export const parseMHWildsEvents: (
  url: string
) => Promise<MHWIldsEventResponseV2> = async (url: string) => {
  const data = await scrape(url)
  const events = await getMHWildsEventsV2(data)

  return events
}
