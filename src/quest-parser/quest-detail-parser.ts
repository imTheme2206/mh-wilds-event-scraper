import { QuestOverview } from 'types'
import { parseDate } from 'uitls'

export const parseEventDetail = (q: QuestOverview) => {
  return {
    startAt: q.startDateAndTime ? parseDate(q.startDateAndTime) : undefined,
    endAt: q.endDateAndTime ? parseDate(q.endDateAndTime) : undefined,
    requiredRank: parseInt(q.conditions.split(' ')[1] || '0'),
  }
}
