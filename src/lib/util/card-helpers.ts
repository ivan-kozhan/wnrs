import {type Card, CardType} from "$lib/models/card";
import {specialName} from "$lib/decks/special-names";

export function toCardProps(card: Card) {
    return card.type == CardType.Regular
        ? {
            front: card.text,
            frontTooltip: card.tooltip
        }
        : {
            special: true,
            front: specialName(card.type) ?? "",
            back: card.text,
            backTooltip: card.tooltip
        };
}