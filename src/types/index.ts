export type QuestOverview = {
  locales: string;
  conditions: string;
  completionConditions: string;
  startDateAndTime: string;
  endDateAndTime: string;
};

export type MonsterDetails = {
  targetMonster: string;
  variant: 'normal' | 'tempered' | 'arch-tempered';
  questType: 'hunt' | 'slay' | 'capture';
  amount: number;
};

export type EventQuestItem = {
  img: string;
  questName: string;
  difficulty: number;
  requiredRank: number;
  startAt: string;
  endAt: string;
  locales: string;
} & MonsterDetails;

export type MHWIldsEventResponse = {
  startDate: string;
  endDate: string;
  eventQuests: EventQuestItem[];
  freeChallengeQuests: EventQuestItem[];
};
