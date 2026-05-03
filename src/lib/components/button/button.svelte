<script lang="ts">
    import {Play} from "lucide-svelte";
    import type {Snippet} from "svelte";
    import type {HTMLAttributes} from "svelte/elements";

    type Variant = "primary" | "secondary" | "muted";
    type Size = "small" | "medium";

    type Props = {
        children: Snippet;
        variant?: Variant;
        href?: string;
        size?: Size;
        class?: HTMLAttributes<HTMLElement>["class"]
        onclick?: () => void;
    };

    let {
        children,
        variant = "primary",
        size = "medium",
        href,
        class: className,
        onclick
    }: Props = $props();

    const baseClass = "flex items-center justify-center gap-1 rounded-full shadow-sm transition-all hover:scale-[102%] active:scale-[98%]";

    const sizes: Record<Size, HTMLAttributes<HTMLElement>["class"]> = {
        "small": "px-4 py-2 w-30 border-1 text-sm",
        "medium": "p-4 w-40 border-2 font-bold",
    }

    const variants: Record<Variant, HTMLAttributes<HTMLElement>["class"]> = {
        "primary": "bg-card-primary text-card-background shadow-card-primary border-card-primary hover-active:bg-card-primary-muted hover-active:border-card-primary-muted hover:shadow-md hover:shadow-card-primary-muted/50",
        "secondary": "bg-card-secondary text-card-primary border-card-primary hover-active:bg-card-secondary-muted",
        "muted": "font-normal bg-card-secondary text-gray-500 border-current hover-active:bg-card-secondary-muted hover-active:text-card-primary"
    }
</script>

{#if href}
    <a {href} class={[baseClass, sizes[size], variants[variant], className]}>
        {@render children()}
    </a>
{:else}
    <button {onclick} class={[baseClass, sizes[size], variants[variant], className]}>
        {@render children()}
    </button>
{/if}

