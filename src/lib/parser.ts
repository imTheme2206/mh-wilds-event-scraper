import { MHWIldsEventResponse } from 'types';
import { getMHWildsEvents } from '../quest-parser/events';
import scrape from '../scraper';

export const parseMHWildsEvents: (
  url: string
) => Promise<MHWIldsEventResponse[]> = async (url: string) => {
  const data = await scrape(url);
  const events = await getMHWildsEvents(data);

  return events;
};
