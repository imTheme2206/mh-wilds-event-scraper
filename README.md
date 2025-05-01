# MH Wilds Event Scraper

A Node.js package for scraping Monster Hunter Wilds event quest information.

## Usage

```typescript
import { parseMHWildsEvents } from 'mh-wilds-event-scraper';

async function getEvents() {
  const events = await parseMHWildsEvents(
    'https://info.monsterhunter.com/wilds/event-quest/en-us/schedule?utc=7'
  );
  console.log(events);
}
```

## API

### parseMHWildsEvents(url: string)

Fetches and parses event quest information from the provided Monster Hunter Wilds URL.

## License

MIT
