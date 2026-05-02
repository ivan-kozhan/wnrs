<script lang="ts">
    type Props = {
        front: string;
        back?: string;
        special?: boolean;
    };

    const {
        front,
        back,
        special = false
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

<div class="[perspective:1000px] w-80 h-56">
    <button
        onclick={handleClick}
        ontransitionend={onTransitionEnd}
        class="relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] rounded-4xl shadow-card cursor-pointer"
        class:animate-flip-forward={animating && !flipped}
        class:animate-flip-back={animating && flipped}
        class:rotate-y-180={flipped && !animating}
        class:rotate-y-0={!flipped && !animating}>

        <div
            class="absolute inset-0 [backface-visibility:hidden] rounded-4xl flex flex-col justify-center items-center"
            class:bg-card-primary={special}
            class:text-card-background={special}
            class:bg-card-background={!special}
            class:text-card-primary={!special}>
            <span class="text-lg font-bold">{front}</span>
        </div>

        {#if back}
            <div class="absolute inset-0 [backface-visibility:hidden] rotate-y-180 rounded-4xl flex flex-col justify-center items-center bg-card-primary text-card-background">
                <span class="text-lg font-bold">{back}</span>
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
        }
        30% {
            transform: rotateY(0deg) scale(1.1) translateZ(50px);
        }
        70% {
            transform: rotateY(180deg) scale(1.1) translateZ(50px);
        }
        100% {
            transform: rotateY(180deg) scale(1) translateZ(0);
        }
    }

    @keyframes liftFlipBack {
        0% {
            transform: rotateY(180deg) scale(1) translateZ(0);
        }
        30% {
            transform: rotateY(180deg) scale(1.1) translateZ(50px);
        }
        70% {
            transform: rotateY(0deg) scale(1.1) translateZ(50px);
        }
        100% {
            transform: rotateY(0deg) scale(1) translateZ(0);
        }
    }

    .animate-flip-forward {
        animation: liftFlipForward 0.7s ease-in-out forwards;
    }

    .animate-flip-back {
        animation: liftFlipBack 0.7s ease-in-out forwards;
    }
</style>