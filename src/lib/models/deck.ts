import type {Card} from "$lib/models/card";

export interface Deck {
    id: string;
    name: string;
    levels: Card[][];
}