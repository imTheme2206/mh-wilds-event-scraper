import { MHWIldsEventResponse, MHWIldsEventResponseV2 } from "types";
import { getMHWildsEvents } from "../quest-parser/events";
import scrape from "../scraper";
import { getMHWildsEventsV2 } from "quest-parser/v2/events";

export const parseMHWildsEvents: (
  url: string,
) => Promise<MHWIldsEventResponse> = async (url: string) => {
  const data = await scrape(url);
  const events = await getMHWildsEvents(data);

  return events;
};

export const parseMHWildsEventsV2: (
  url: string,
) => Promise<MHWIldsEventResponseV2> = async (url: string) => {
  const data = await scrape(url);
  const events = await getMHWildsEventsV2(data);

  return events;
};
