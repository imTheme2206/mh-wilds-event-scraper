import { JSDOM } from 'jsdom';
import { EventQuestItem, QuestOverview } from '../types';
import { parseQuestTargetDetail } from '../quest-parser/target-parser';
import { parseEventDetail } from '../quest-parser/quest-detail-parser';

const isDefined = (value: any): boolean => {
  return value !== undefined && value !== null;
};

export const getMHWildsEvents = async (rawHTML: string) => {
  const document = new JSDOM(rawHTML).window.document;
  if (!document) {
    console.error('Failed to parse HTML document');
    return [];
  }

  const eventDateRangeTab = Array.from(
    document.querySelectorAll('ul.tab1.bottom-tabs > li > p')
  ).map((element, index) => {
    const dateRange = element.textContent?.trim() || '';

    const cleaned = dateRange.split('\n')[0].trim();
    const [startStr, endStr] = cleaned.split(' 〜 ').map((date) => date.trim());

    const parseDate = (str: string) => {
      const [month, day, year] = str.split('.').map(Number);
      return new Date(year, month - 1, day); // month is 0-indexed
    };

    const startDate = parseDate(startStr);
    const endDate = parseDate(endStr);

    const tableAreas = document.querySelectorAll(
      `.tableArea#tab${index} table`
    );
    const tableArea =
      tableAreas.length > 1
        ? tableAreas[0].outerHTML
        : Array.from(tableAreas)
            .map((table) => table.outerHTML)
            .join(' ');

    const events = getEventQuests(tableArea);

    return {
      startDate,
      endDate,
      events,
    };
  });

  return eventDateRangeTab;
};

export const getEventQuests: (rawHTML: string) => EventQuestItem[] = (
  rawHTML: string
) => {
  const document = new JSDOM(rawHTML).window.document;

  if (!document) {
    console.error('Failed to parse HTML document');
    return [];
  }

  const eventQuestElements = document.querySelectorAll('tbody tr');

  const eventQuestElementsFiltered =
    Array.from(eventQuestElements).filter(isDefined);

  const eventQuests = eventQuestElementsFiltered.map((element) => {
    const imgCell = element.querySelector('td.image');
    const difficultyCell = element.querySelector('td.level');
    const questCell = element.querySelector('td.quest');
    const overviewCell = element.querySelector('td.overview');
    const img = imgCell?.querySelector('img')?.getAttribute('src') || '';
    const difficulty = parseInt(difficultyCell?.textContent?.trim() || '0');
    const quest =
      questCell?.querySelector('.title > span')?.textContent?.trim() || '';

    const liList = overviewCell?.querySelectorAll('li');
    const overview =
      liList && liList.length > 0
        ? Array.from(liList.entries()).reduce((acc, [_, li]) => {
            const liText = li.textContent || '';
            const cleanedText = liText.replace(/\n/g, '').trim();
            const [key, ...rest] = cleanedText.split(':');
            const value = rest.join(':').trim();

            const trimmedKey = key
              ?.toLowerCase()
              .split(/[\s:]+/)
              .map((word, index) =>
                index === 0
                  ? word
                  : word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join('');
            if (trimmedKey && value)
              acc[trimmedKey as keyof QuestOverview] = value;
            return acc;
          }, {} as QuestOverview)
        : null;

    if (!overview) {
      return null;
    }

    const { questType, targetMonster, variant } =
      parseQuestTargetDetail(overview);
    const { startAt, endAt, requiredRank } = parseEventDetail(overview);

    return {
      img,
      difficulty,
      questName: quest,
      questType,
      targetMonster,
      variant,
      startAt,
      endAt,
      requiredRank,
      locales: overview.locales || '',
    };
  });

  return eventQuests.filter((quest): quest is EventQuestItem => quest !== null);
};
