<script>
  import { getContext } from 'svelte';
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
  export let onCancel = () => {};
  const { close } = getContext('simple-modal');
  export let email;
  export let scope;
  export let _id;
  let updated = {}
  let id = {_id: _id}
  if (scope !== undefined && scope !== null && scope !== '') updated.scope = scope
  let n;
	function _onCancel() {
		onCancel();
		close();
  }
  function updateUser(){
    return fetch(`admin/users.json`, {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        updated: updated
      })
    }).then(res => {
      return res.status === 401 ? notifier.danger(`Authentication expired`)
      : res.status === 409 ? notifier.danger(`Failed to update user`)
      : res.status === 500 ? notifier.danger(`Server error`)
      : window.location.href= `admin/users` 

    })
  }
</script>
<style>
  h3 {
		text-align: center;
	}
	.buttons {
    padding-top: .5em;
		display: flex;
		justify-content: space-between;
	}
</style>

<NotificationDisplay bind:this={n} />
<h3>{email}</h3>
<form>
  <select bind:value={updated.scope}>
    <option value='admin'>admin</option>
    <option value='user'>user</option>
  </select>
</form>
<div class="buttons">
	<button on:click={_onCancel}>
		Cancel
	</button>
	<button on:click={updateUser}>
		Save
	</button>
</div>