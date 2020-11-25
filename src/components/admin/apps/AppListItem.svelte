<script>
  import Grid from 'svelte-grid-responsive'
  //import EditUserModal from './EditUserModal.svelte';
	export let user;
  export let scope;
  export let state;
  export let justification;
  export let qualifications;
  export let dateSubmitted;
  export let dateRevised;
  export let _id;
  //export let showEditUserModal = false;
  import { getContext } from 'svelte';
  import ReviewApp from '../../../components/admin/apps/ReviewApp.svelte';
  if (name == null || name == undefined){
    name = {
      first: '',
      last: ''
    }
  }
  const { open } = getContext('simple-modal');

  const showReviewApp = () => {
    open(ReviewApp, {_id: _id, user: user, scope: scope, state: state, justification: justification, qualifications: qualifications, dateSubmitted: dateSubmitted, dateRevised: dateRevised});
  };
</script>
<style>
  @media screen and (min-width: 575px) {
    button {
      margin: 0;
      position: absolute;
      top: 50%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }
  }
  .card {
		position: inherit;
		margin: 0.5em;
		padding: 0.5em 0.5em 0.5em 3em;
		border: 1px solid #eee;
		border-radius: 4px;
		box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    height: auto;
	}
	.card::after {
		clear: both;
		display: block;
	}
</style>
  <div class='card'>
    <Grid container gutter={12}>
      <Grid xs={12} md={4} lg={4}>
        <p>{user.email}</p>
      </Grid>
      <Grid xs={12} md={4} lg={4}>
        <p>{scope}</p>
      </Grid>
      <Grid xs={12} md={4} lg={4}>
        <div class=button>
          <button on:click={showReviewApp}>Edit</button>
        </div>
      </Grid>
    </Grid>
  </div>

