import { getMHWildsEvents } from 'quest-parser/events';
import scrape from '../scraper';

export async function parseMHWildsEvents(url: string) {
  const data = await scrape(url);
  const eventDateRangeTab = await getMHWildsEvents(data);
  console.log(JSON.stringify(eventDateRangeTab, null, 2));
}
