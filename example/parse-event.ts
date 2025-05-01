import { parseMHWildsEvents } from '../src';

async function example() {
  const events = await parseMHWildsEvents(
    'https://info.monsterhunter.com/wilds/event-quest/en-us/schedule?utc=7'
  );
  console.log(JSON.stringify(events, null, 2));
}

example();

/* 
    This function will fetch the event quests from the given URL and log them to the console.

    the format of the output will be:

    "startDate": "2025-05-13T17:00:00.000Z",
    "endDate": "2025-05-20T17:00:00.000Z",
    "events": [
      {
        "img": "https://info.monsterhunter.com/wilds/event-quest/thumbnail/mst-quest/February2025/G1CM1k94LpGV5C7v4vwp.jpg",
        "difficulty": 5,
        "questName": "Ballet in the Rain",
        "questType": "hunt",
        "targetMonster": "Lala Barina",
        "variant": "tempered",
        "startAt": "5/14/2025, 7:00:00 AM",
        "endAt": "5/21/2025, 6:59:00 AM",
        "requiredRank": 21
      },
      {
        "img": "https://info.monsterhunter.com/wilds/event-quest/thumbnail/mst-quest/February2025/tzOMg5CCDyLMTyG0EFUX.jpg",
        "difficulty": 5,
        "questName": "Sand-Scarred Soul",
        "questType": "hunt",
        "targetMonster": "Doshaguma",
        "variant": "normal",
        "startAt": "5/14/2025, 7:00:00 AM",
        "endAt": "5/21/2025, 6:59:00 AM",
        "requiredRank": 9
      }
    ]
}

*/
