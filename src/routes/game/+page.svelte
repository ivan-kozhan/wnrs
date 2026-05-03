<script lang="ts">
    import {Selector} from "$lib/components/selector";
    import {LevelNames} from "$lib/decks/level-names";
    import {BaseDeck, HonestDatingDeck, ArthurAronDeck} from "$lib/decks";
    import {Button} from "$lib/components/button";
    import {ArrowRight, Layers, Loader, LogOut, MousePointerClick} from "lucide-svelte";
    import Card from "$lib/components/card";
    import { type Card as CardData } from "\$lib/models/card";
    import {toCardProps} from "$lib/util/card-helpers";
    import {takeRandom} from "$lib/util/array";
    import { tick } from "svelte";
    import {resolve} from "$app/paths";

    type PlacedCard = {
        data: CardData;
        rotation: number;
        element?: HTMLElement;
    }

    const levelBadges = LevelNames.map(((x, i) => ({ value: i, label: x })));

    let decks = $state(BaseDeck.levels.map((x, i) => [...x, ...HonestDatingDeck.levels[i], ...ArthurAronDeck.levels[i]]));
    let counts = $state(levelBadges.map(_ => 0));

    let level = $state(0);
    let placedCards: PlacedCard[] = $state([]);

    async function addCard() {
        const currentDeck = decks[level];

        if (!currentDeck.length) {
            return;
        }

        const newCard: PlacedCard = {
            data: takeRandom(currentDeck)!,
            rotation: Math.random() * 15 - 7.5
        };

        counts[level]++;
        placedCards = [...placedCards.slice(-10), newCard];

        await tick();

        const cardElement = placedCards[placedCards.length - 1]?.element;
        cardElement && flyInFromCamera(cardElement);
    }

    function flyInFromCamera(element: HTMLElement) {
        const finalTransform = getComputedStyle(element).transform;
        const startTransform = `translate(calc(50vw - 50%), calc(50vh - 50%)) scale(2) rotate(0deg)`;

        element.animate(
           [
               { transform: startTransform, opacity: 0 },
               { transform: finalTransform, opacity: 1 }
           ],
           {
               duration: 400,
               easing: 'cubic-bezier(0.2, 0.9, 0.4, 1.1)',
               fill: 'forwards'
           }
        );
   }
</script>

<div class="flex flex-col h-full gap-16">
    <Selector bind:selected={level} items={levelBadges} />
    <button class="flex-1 flex flex-col items-center justify-center" onclick={addCard}>
        {#if placedCards.length === 0}
            <div class="flex flex-col items-center gap-2 text-gray-400">
                <Loader class="size-24" strokeWidth="1" />
                <span class="text-lg">Нажмите, чтобы начать</span>
            </div>
        {/if}
        <div class="relative">
            {#each placedCards as card, i (card.data.text)}
                <Card bind:ref={card.element} style="transform: rotate({card.rotation}deg) translateY(-{i}px)" class="absolute -translate-1/2" {...toCardProps(card.data)} />
            {/each}
        </div>
    </button>
    <div class="flex flex-col justify-center items-center gap-6">
        <div class="flex gap-2">
            <Button variant="secondary" size="small" onclick={addCard} class="w-fit">
                <ArrowRight class="w-4"/>
                Следующая карта
            </Button>
            <div class="flex items-center px-4 gap-1 bg-gray-200 text-xs rounded-full">
                <Layers class="w-3"/>
                Осталось {decks[level].length}
            </div>
        </div>
        <Button href={resolve("/")} variant="muted" size="small" class="w-fit">
            <LogOut class="w-4"/>
            Выйти в главное меню
        </Button>
    </div>
</div>