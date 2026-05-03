<script lang="ts">
    import { resolve } from '$app/paths';
    import {Play, SlidersHorizontal} from "lucide-svelte";
    import {Button} from "$lib/components/button";
</script>

<div class="h-full flex flex-col gap-18 items-center justify-center p-8">
    <div class="flex flex-col items-center gap-3">
        <h1 class="text-4xl font-bold text-center">we're not <span class="text-card-primary">really</span><br>strangers</h1>
        <div class="h-[2px] mt-1 bg-card-primary w-16"></div>
        <span class="text-sm text-gray-700">спрашивай • слушай • сближайся</span>
    </div>
    <Button href={resolve("/game")}>
        <Play class="h-4" fill="currentColor"/>
        Играть
    </Button>
</div>