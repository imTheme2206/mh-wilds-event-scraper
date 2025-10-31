export type QuestOverview = {
  locales: string
  conditions: string
  completionConditions: string
  startDateAndTime: string
  endDateAndTime: string
}

export type MonsterDetails = {
  targetMonster: string
  variant: 'normal' | 'tempered' | 'arch-tempered' | 'frenzied'
  questType: 'hunt' | 'slay' | 'capture'
  amount: number
}

export type EventQuestItem = {
  img: string
  questName: string
  difficulty: number
  requiredRank: number
  startAt: string
  endAt: string
  locales: string
  isNewEvent: boolean
  description: string
  isPermanent: boolean
} & MonsterDetails

export type MHWIldsEventResponse = {
  // startDate: Date;
  // endDate: Date;
  eventQuests: EventQuestItem[]
}
