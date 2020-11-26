<script>
  import { getContext } from 'svelte';
  import ScopeApplicationModal from './ScopeApplicationModal.svelte'
  export let profile;
  export let app;
  const { open } = getContext('simple-modal');
  const showScopeApplication = () => {
    open(ScopeApplicationModal, { profile: profile, app: app });
  };
</script>

<section>
  <button on:click={showScopeApplication}>Apply for Increased Permissions</button>
</section>
