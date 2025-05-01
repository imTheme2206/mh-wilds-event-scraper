import { QuestOverview } from '../types';

export const parseEventDetail = (q: QuestOverview) => {
  return {
    startAt: new Date(q.startDateAndTime).toLocaleString(),
    endAt: new Date(q.endDateAndTime).toLocaleString(),
    requiredRank: parseInt(q.conditions.split(' ')[1] || '0'),
  };
};
