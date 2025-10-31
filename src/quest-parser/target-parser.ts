import { MONSTER_LIST } from 'constants/monster-list'
import { MonsterDetails, QuestOverview } from 'types'

export const parseQuestTargetDetail: (q: QuestOverview) => MonsterDetails = (q) => {
  const questCompleteCondition = q.completionConditions

  const questType = questCompleteCondition.toLowerCase().includes('hunt')
    ? 'hunt'
    : questCompleteCondition.toLowerCase().includes('capture')
    ? 'capture'
    : 'slay'

  const variant = questCompleteCondition.toLowerCase().includes('arch-tempered')
    ? 'arch-tempered'
    : questCompleteCondition.toLowerCase().includes('tempered')
    ? 'tempered'
    : questCompleteCondition.toLowerCase().includes('frenzied')
    ? 'frenzied'
    : 'normal'

  const targetMonster =
    MONSTER_LIST.find((monster) =>
      questCompleteCondition.toLowerCase().includes(monster.toLowerCase())
    ) || 'Unknown'

  const amount = questCompleteCondition.match(/(\d+)\s*([a-zA-Z]+)/)
  const amountValue = amount ? parseInt(amount[1], 10) : 1

  return {
    targetMonster: targetMonster || '',
    variant: variant || 'normal',
    questType: questType,
    amount: amountValue,
  }
}
