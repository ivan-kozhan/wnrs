<script lang="ts">
    type Props = {
        text: string;
        active?: boolean;
        onclick?: () => void;
    }

    let {
        text,
        active = false,
        onclick,
    } : Props = $props();
</script>

<button {onclick} class={[
    "p-2 rounded-full  font-semibold text-xs border-2 transition-all truncate",
    active && "w-40 bg-card-primary text-card-background border-card-primary shadow-sm shadow-card-primary",
    !active && "w-12 text-gray-400 border-current hover:text-card-primary"
]}>
    {text}
</button>