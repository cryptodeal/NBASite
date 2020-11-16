<script>
  import { getContext } from 'svelte';
  import ScopeApplicationModal from './ScopeApplicationModal.svelte'
  export let profile;
  const { open } = getContext('simple-modal');
  const showScopeApplication = () => {
    open(ScopeApplicationModal, { profile: profile });
  };
</script>

<section>
  <button on:click={showScopeApplication}>Apply for Increased Permissions</button>
</section>
