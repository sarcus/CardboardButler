import { Sorter } from "./Sorter";
import { GameInfoPlus } from "../../models/GameInfo";

export class SuggestedPlayersSorter implements Sorter {
    playerCount?: number;

    constructor(playerCount?: number) {
        this.playerCount = playerCount;
    }

    sort(collection: GameInfoPlus[]): GameInfoPlus[] {
        const immutableCollection = [...collection];
        if (this.playerCount !== undefined) {
            return immutableCollection.sort(this.getSuggestedComparatorComparator(this.playerCount));
        }
        return immutableCollection;

    }
    private getSuggestedComparatorComparator(playerCount: number) {
        return (a: GameInfoPlus, b: GameInfoPlus) => {
            return this.getSuggestePlayerScore(playerCount, b) - this.getSuggestePlayerScore(playerCount, a);
        };
    }

    public getSuggestePlayerScore(playerCount: number, gameInfo: GameInfoPlus): number {
        if ("suggestedNumberOfPlayers" in gameInfo) {
            const votes = gameInfo.suggestedNumberOfPlayers[playerCount] || gameInfo.suggestedNumberOfPlayers[Infinity];
            if (votes !== undefined) {
                return votes.score;
            }
        }
        return -Infinity;


    }
}