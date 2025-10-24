export type QuestOverview = {
  locales: string;
  conditions: string;
  completionConditions: string;
  startDateAndTime: string;
  endDateAndTime: string;
};

export type MonsterDetails = {
  targetMonster: string;
  variant: "normal" | "tempered" | "arch-tempered" | "frenzied";
  questType: "hunt" | "slay" | "capture";
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
  isNewEvent: boolean;
  description: string;
} & MonsterDetails;

export type EventQuestItemV2 = {
  img: string;
  questName: string;
  difficulty: number;
  requiredRank: number;
  startAt: string;
  endAt: string;
  locales: string;
  isNewEvent: boolean;
  description: string;
  targetDetails: MonsterDetails[];
  isPermanent: boolean;
};

export type LimitedEventQuestItem = {
  startDate: Date;
  endDate: Date;
  eventQuests: EventQuestItem[];
  freeChallengeQuests: EventQuestItem[];
};

export type MHWIldsEventResponse = {
  limitedEventQuests: LimitedEventQuestItem[];
  permanentQuests: PermanentQuestItem;
};

export type MHWIldsEventResponseV2 = {
  // startDate: Date;
  // endDate: Date;
  eventQuests: EventQuestItemV2[];
};

export type PermanentQuestItem = EventQuestItem[];
