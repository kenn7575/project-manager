<script>
  import './app.css'
  import Restricted from './components/restricted.svelte';
  import Home from './pages/Home.svelte'
</script>

<main class="w-screen">
  <Restricted>
    <!-- app -->
    <Home />
  </Restricted>
</main>