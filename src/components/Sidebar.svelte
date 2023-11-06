<script>
    let sidebarSizeToggle = false

    let sidebarSize = "18rem"

    $: if (sidebarSizeToggle) { sidebarSize = "4rem" } else sidebarSize = "18rem"
</script>

<div class={`fixed right-0 bg-neutral h-screen w-[${sidebarSize}] justify-center text-center sidebar`}>
    <div class="flex p-10">
        <button on:click={() => sidebarSizeToggle = !sidebarSizeToggle}>
                <p class="font-bold">{sidebarSizeToggle ? "<--" : "-->"}</p>
        </button>
        <h1 class="font-bold center m-auto">Sidebar</h1>
    </div>
</div>

<style>
.sidebar {
    transition: width 0.5s;
    
}
</style>