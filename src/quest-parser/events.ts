import { JSDOM } from 'jsdom';
import { EventQuestItem, QuestOverview } from '../types';
import { parseQuestTargetDetail } from '../quest-parser/target-parser';
import { parseEventDetail } from '../quest-parser/quest-detail-parser';
import { isDefined, parseDate, splitJapaneseDateRangeFormat } from '../uitls';

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

    const { startDate: startStr, endDate: endStr } =
      splitJapaneseDateRangeFormat(dateRange);

    const startDate = parseDate(startStr);
    const endDate = parseDate(endStr);

    const tableAreas = document.querySelectorAll(
      `.tableArea#tab${index} table`
    );

    const tableEventArea = tableAreas[0]?.outerHTML;
    const tableFreeChallengeArea = tableAreas[1]?.outerHTML;

    const eventQuests = getEventQuests(tableEventArea);
    const freeChallengeQuests = getEventQuests(tableFreeChallengeArea || '');

    return {
      startDate,
      endDate,
      eventQuests,
      freeChallengeQuests,
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
      return {};
    }

    const targetDetail = parseQuestTargetDetail(overview);
    const eventDetail = parseEventDetail(overview);

    return {
      img,
      difficulty,
      questName: quest,
      locales: overview.locales || '',
      ...targetDetail,
      ...eventDetail,
    };
  });

  return eventQuests.filter(
    (quest): quest is EventQuestItem => Object.keys(quest).length > 0
  );
};
