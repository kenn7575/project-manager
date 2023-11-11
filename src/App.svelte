<script>
  import "./app.css";
  import Restricted from "./components/restricted.svelte";
  import Home from "./pages/Home.svelte";
  import ErrorRenderer from "./components/ErrorRenderer.svelte";
  import Error from "./pages/Error.svelte";
  import { onMount } from "svelte";
  let isMobileWithTouch;
  onMount(() => {
    isMobileWithTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0 ||
      window.innerWidth <= 768;
  });
</script>

{#if isMobileWithTouch}
  <Error />
{:else}
  <main class="w-screen">
    <ErrorRenderer />
    <Restricted>
      <!-- app -->
      <Home />
    </Restricted>
  </main>
{/if}
