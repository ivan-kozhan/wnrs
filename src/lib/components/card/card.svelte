<script lang="ts">
    import type {HTMLAttributes} from "svelte/elements";

    type Props = {
        front: string;
        frontTooltip?: string;
        back?: string;
        backTooltip?: string;
        special?: boolean;
        class?: HTMLAttributes<HTMLDivElement>["class"];
        style?: string;
        ref?: HTMLElement
    };

    let {
        front,
        frontTooltip,
        back,
        backTooltip,
        class: className,
        style,
        special = false,
        ref = $bindable()
    }: Props = $props();

    let flipped = $state(false);
    let animating = $state(false);

    function handleClick(event: MouseEvent) {
        if (!special || flipped) {
            return;
        }

        event.stopPropagation();

        if (animating) {
            return;
        }

        animating = true;
    }

    function onTransitionEnd() {
        animating = false;
        flipped = true;
    }
</script>

<div bind:this={ref} {style} class={["[perspective:1000px] w-80 h-68", className]}>
    <button
        onclick={handleClick}
        onanimationend={onTransitionEnd}
        class="relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] rounded-4xl shadow-card cursor-pointer"
        class:animate-flip-forward={animating && !flipped}
        class:rotate-y-180={flipped && !animating}
        class:rotate-y-0={!flipped && !animating}>

        <div
            class="absolute inset-0 [backface-visibility:hidden] rounded-4xl flex flex-col justify-center items-center gap-3 p-4"
            class:bg-card-primary={special}
            class:text-card-background={special}
            class:bg-card-background={!special}
            class:text-card-primary={!special}>
            <span class="text-lg font-bold">{front}</span>
            {#if frontTooltip}
                <span class="italic">{frontTooltip}</span>
            {/if}
        </div>

        {#if back}
            <div class="absolute inset-0 [backface-visibility:hidden] rotate-y-180 rounded-4xl flex flex-col justify-center items-center gap-3 p-4 bg-card-primary text-card-background">
                <span class="text-lg font-bold">{back}</span>
                {#if backTooltip}
                    <span class="italic">{backTooltip}</span>
                {/if}
            </div>
        {/if}
    </button>
</div>

<style>
    .rotate-y-0 {
        transform: rotateY(0deg);
    }
    .rotate-y-180 {
        transform: rotateY(180deg);
    }

    @keyframes liftFlipForward {
        0% {
            transform: rotateY(0deg) scale(1) translateZ(0);
            z-index: 1;
        }
        30% {
            transform: rotateY(0deg) scale(1.1) translateZ(50px);
            z-index: 10;
        }
        70% {
            transform: rotateY(180deg) scale(1.1) translateZ(50px);
            z-index: 10;
        }
        100% {
            transform: rotateY(180deg) scale(1) translateZ(0);
            z-index: 1;
        }
    }

    .animate-flip-forward {
        animation: liftFlipForward 0.7s ease-in-out forwards;
    }
</style>