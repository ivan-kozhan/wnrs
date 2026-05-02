<script lang="ts">
    import {Badge} from "$lib/components/selector/index";

    type Props = {
        items: { value: number, label: string }[],
        selected?: number
    }

    let {
        items,
        selected = $bindable(0),
    } : Props = $props();
</script>

<div class="flex flex-wrap justify-center gap-2">
    {#each items as item, i}
        {@const active = item.value === selected}
        <Badge {active} text={active ? item.label : `${i + 1}`} onclick={() => selected = item.value} />
    {/each}
</div>