<script lang="ts">
    import Card from "$lib/components/card";
    import { BaseDeck, HonestDatingDeck, ArthurAronDeck } from "$lib/decks";
    import {toCardProps} from "$lib/util/card-helpers";

    const levels = BaseDeck.levels.map((x, i) => [...x, ...HonestDatingDeck.levels[i], ...ArthurAronDeck.levels[i]]);

</script>

<div class="flex flex-col">
    {#each [0, 1, 2] as levelIndex}
        <div class="w-full flex flex-wrap justify-center gap-2">
            {#each levels[levelIndex] as card}
                <Card {...toCardProps(card)} />
            {/each}
        </div>
        <div class="w-full border-b border-gray-300 my-8"></div>
    {/each}
</div>