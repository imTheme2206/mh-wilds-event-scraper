import { getMHWildsEvents } from 'quest-parser/events';
import scrape from '../scraper';

export async function parseMHWildsEvents(url: string) {
  const data = await scrape(url);
  const events = await getMHWildsEvents(data);

  return events;
}
