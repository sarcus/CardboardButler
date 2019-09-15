import * as React from "react";
import { GameInfo } from "../models/GameInfo";
import { Item } from "semantic-ui-react";
import DescriptionGenerator from "../services/GameDescriptionGenerator";

export interface AppProps {
    item: GameInfo;
}

const gameDescription = new DescriptionGenerator();

/**
 * PureComponent that renders  a given GameInfo item into a list like view.
 */
export default class GameListItem extends React.PureComponent<AppProps> {
    render() {
        const { item } = this.props;
        const { owners = [] } = item;
        return (
            <Item >
                <Item.Image size="small"><img data-testid="GameImage" src={item.imageUrl} /></Item.Image>
                <Item.Content verticalAlign={"middle"}>
                    <Item.Header data-testid="GameName" href={"https://boardgamegeek.com/boardgame/" + item.id} as="a" size={"medium"} target="_blank">{item.name}</Item.Header>
                    <Item.Meta data-testid="GameYear">
                        <span>{item.yearPublished}</span>
                        {item.owners && <span data-testid="Owners"> - <span>{owners.join(", ")}</span></span>}
                    </Item.Meta >
                    <Item.Description data-testid="GameDescription">
                        {gameDescription.generateDescription(item)}
                    </Item.Description>
                    {/* <Item.Extra>{game.get("mechanics").map(mec => mec.get("value")).join(", ")}</Item.Extra> */}
                </Item.Content>
            </Item>
        );
    }
}
