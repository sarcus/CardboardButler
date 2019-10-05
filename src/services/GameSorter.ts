import { GameInfoPlus } from "../models/GameInfo";
import { SortOption } from "../models/FilterOptions";
import { UserRatingSorter } from "./sorters/UserRatingSorter";
import { Sorter } from "./sorters/Sorter";
import { YoungSorter } from "./sorters/YoungSorter";
import { OldSorter } from "./sorters/OldSorter";
import { HeavySorter } from "./sorters/HeavySorter";
import { LightSorter } from "./sorters/LightSorter";
import { BggRatingSorter } from "./sorters/BggRatingSorter";
import { NameSorter } from "./sorters/NameSorter";
import { SuggestedPlayersSorter } from "./sorters/SuggestedPlayersSorter";
import { MultiSorter } from "./sorters/MultiSorter";
import { RecentlyPlayedSorter } from "./sorters/RecentlyPlayedSorter";

const sortMap = {
    alphabetic: new NameSorter(),
    bggrating: new BggRatingSorter(),
    new: new YoungSorter(),
    old: new OldSorter(),
    userrating: new UserRatingSorter(),
    "weight-heavy": new HeavySorter(),
    "weight-light": new LightSorter(),
    "playedRecently": new RecentlyPlayedSorter()
};

const DEFAULT_OPTION = "bggrating";

export class GameSorter {

    public sortCollection(collection: GameInfoPlus[], sortOption: (SortOption | SortOption[])): GameInfoPlus[] {
        return this.getSorter(sortOption).sort([...collection]);
    }

    private getSorter(sortOption: (SortOption | SortOption[]) = DEFAULT_OPTION): Sorter {
        if (Array.isArray(sortOption)) {
            const innerSorters = sortOption.map(this.getSorter);
            return new MultiSorter(innerSorters);
        }
        if (typeof sortOption === "object") {
            return new SuggestedPlayersSorter(sortOption.numberOfPlayers);
        }
        return sortMap[sortOption];
    }

}
