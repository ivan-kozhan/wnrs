import { CardType } from "$lib/models/card";

export function specialName(type: CardType): string | null {
    switch (type) {
        case CardType.Action:
            return "Действие";

        case CardType.Reminder:
            return "Напоминание";

        default:
            return null;
    }
}