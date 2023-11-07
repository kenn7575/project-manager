<script>
  import './app.css'
  import Restricted from './components/restricted.svelte';
  import Home from './pages/Home.svelte'
import ErrorRenderer from "./components/ErrorRenderer.svelte"
</script>

<main class="w-screen ">
  <ErrorRenderer />
  <Restricted>
    <!-- app -->
    <Home />
  </Restricted>
</main>