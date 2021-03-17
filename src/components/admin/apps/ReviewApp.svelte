<script>
  import { getContext } from 'svelte';
  export let onCancel = () => {};
  const { close } = getContext('simple-modal');
  export let user;
  export let scope;
  export let state;
  export let justification;
  export let qualifications;
  export let feedback;
  //export let dateSubmitted;
  //export let dateRevised;
  export let _id;
  let updated = {
    state: state,
  }
  feedback !== null ? updated.feedback = feedback : updated.feedback = '';
  let id = {_id: _id}

  let n;
	function _onCancel() {
		onCancel();
		close();
  }
  function saveAppReview(){
    console.log(JSON.stringify({
        id: id,
        updated: updated
      }))
    return fetch(`http://localhost:8000/api/admin/apps`, {
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
      return res.status === 401 ? addNotification({
          text: `Authentication Expired`,
          position: 'bottom-center',
          type: 'danger',
          removeAfter: 4000
        })
      : res.status === 409 ? addNotification({
          text: `Failed to Save Reviewed App`,
          position: 'bottom-center',
          type: 'danger',
          removeAfter: 4000
        })
      : res.status === 500 ? addNotification({
          text: `Server Error`,
          position: 'bottom-center',
          type: 'danger',
          removeAfter: 4000
        })
      : window.location.href= `admin/apps` 

    })
  }
</script>
<style>
  h3 {
		text-align: center;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>

<h3>Application Submitted By: {user.username}</h3>
<h4>
  Application Status:
  <select bind:value={updated.state}>
    <option value='pending review'>pending review</option>
    <option value='approved'>approved</option>
    <option value='rejected'>rejected</option>
  </select>
</h4>
<form>
  Scope Requested: {scope}
  <br>
  Justification: {justification}
  <br>
  Qualifications: {qualifications}
  <br>
  <label for='feedback'>Application Feedback:</label>
  <input class='input'
    type='text'
    id='feedback'
    name='feedback'
    bind:value={updated.feedback}
  />
</form>
<div class="buttons">
  <button on:click={_onCancel}>
    Cancel
  </button>
  <button on:click={saveAppReview}>
    Save
  </button>
</div>
