export interface Card {
    text: string;
    tooltip?: string;
    type: CardType;
}

export function regular(text: string, tooltip?: string): Card {
    return {
        text, tooltip, type: CardType.Regular
    }
}

export function action(text: string, tooltip?: string): Card {
    return {
        text, tooltip, type: CardType.Action
    }
}

export function reminder(text: string, tooltip?: string): Card {
    return {
        text, tooltip, type: CardType.Reminder
    }
}

export enum CardType {
    Regular,
    Action,
    Reminder
}