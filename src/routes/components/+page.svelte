<script lang="ts">
    import Card from "$lib/components/card";
    import { BaseDeck, HonestDatingDeck, ArthurAronDeck } from "$lib/decks";
    import { CardType } from "$lib/models/card";
    import { specialName } from "$lib/decks/special-names";

    const levels = BaseDeck.levels.map((x, i) => [...x, ...HonestDatingDeck.levels[i], ...ArthurAronDeck.levels[i]]);

</script>

<div class="flex flex-col">
    {#each [0, 1, 2] as levelIndex}
        <div class="w-full flex flex-wrap justify-center gap-2">
            {#each levels[levelIndex] as card}
                {#if card.type === CardType.Regular}
                    <Card front={card.text} frontTooltip={card.tooltip} />
                {:else}
                    <Card special front={specialName(card.type) ?? ""} back={card.text} backTooltip={card.tooltip} />
                {/if}
            {/each}
        </div>
        <div class="w-full border-b border-gray-300 my-8"></div>
    {/each}
</div>