<script>
  import { getContext } from 'svelte';
  import ReviseAppModal from './ReviseAppModal.svelte'
  export let app;
  const { open } = getContext('simple-modal');
  const showReviseApp = () => {
    open(ReviseAppModal, { app: app });
  };
</script>

<section>
  <button on:click={showReviseApp}>Revise Application</button>
</section>
