import * as React from "react";
import GameListItem from "./GameListItem";
import { GameInfoPlus } from "../models/GameInfo";
import { Item } from "semantic-ui-react";

interface Props {
    games: GameInfoPlus[];
    playerCount: number | undefined;
}

export default class CollectionList extends React.PureComponent<Props> {
    render() {
        const { games, playerCount } = this.props;
        return (
            <Item.Group>
                {games.map((game) => <GameListItem key={game.id} item={game} playerCount={playerCount}/>)}
            </Item.Group>
        );
    }
}
