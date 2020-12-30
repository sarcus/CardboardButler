import {ExtendedGameInfo, GameInfo, FullGameInfo} from "../models/GameInfo";

import { FilterAndSortOptions } from "../models/FilterOptions";
const memoize = require("fast-memoize");

export class GameFilterer {

    constructor() {
        this.filterCollectionInner = this.filterCollectionInner.bind(this);
        this.filterCollection = memoize(this.filterCollectionInner);
    }

    public filterCollection: (collection: GameInfo[], options: FilterAndSortOptions) => GameInfo[];

    private filterCollectionInner(collection: GameInfo[], options: FilterAndSortOptions) {
        const { playtime, playerCount, minNPScore= 1.5 } = options;
        if (playtime) {
            collection = this.filterOnTime(collection, playtime);
        }
        if (playerCount) {
            collection = this.filterOnPlayerCount(collection, playerCount);
            if (minNPScore) {
                collection = this.filterOnNPScore(collection, playerCount, minNPScore);
            }
        }
        return collection;
    }

    private filterOnTime(collection: GameInfo[], playtime: { minimum?: number; maximum?: number; }) {
        const { minimum = 0, maximum = Infinity } = playtime;
        return collection.filter((game) =>
            minimum <= (game.minPlaytime || 0) && (game.maxPlaytime || Infinity) <= maximum
        );
    }

    private filterOnPlayerCount(collection: GameInfo[], playerCount: number) {
        return collection.filter((game) => game.minPlayers <= playerCount && playerCount <= game.maxPlayers);
    }

    private filterOnNPScore(collection: GameInfo[], playerCount: number, minNPScore: number) {
        let getScore = function (game: FullGameInfo) {
          if (game.suggestedNumberOfPlayers[playerCount] !== undefined) {
              return game.suggestedNumberOfPlayers[playerCount].score;
          }
          return 0;
        };
        return collection.filter((game) => getScore(game as FullGameInfo) >= minNPScore);
    }
}

