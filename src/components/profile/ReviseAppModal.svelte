<script>
  //profile included so user info can be submitted w/ form automatically w/o requiring user to re-enter info
  export let app;
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
  import dayjs from 'dayjs'
  import { requiredValidator } from '../validators.js'
  import { createFieldValidator } from '../validation.js'

  const [ justificationValidity, justificationValidate ] = createFieldValidator(requiredValidator())
  const [ qualificationsValidity, qualificationsValidate ] = createFieldValidator(requiredValidator())
  let n;

function submitApplication(email, password) {
  console.log(JSON.stringify(app))
    fetch('http://localhost:8000/api/user/scope/app', {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        app
      })
    }).then(res => {
      if(res.status === 401){
        notifier.danger('Authentication failed; Application not submitted')
      } else {
        window.location.href = 'profile'
        //console.log('finish fetch request')
      }
    })
  }
</script>
<style>
	input {
		outline: none;
		border-width: 2px;
    border-style: solid;
    width: 100%;
	}	
	.validation-hint {
		color: red;
    padding: 6px 0;
	}
	.field-danger {
		border-color: red;
	}
	.field-success {
		border-color: green;
	}
</style>

<NotificationDisplay bind:this={n} />
<h2>Site Role Application:</h2>
<br>
<h3>Feedback from INSERT DATE HERE ONCE FEEDBACK DATE IMPLEMENTED:</h3>
<p>{app.feedback}</p>
<form on:submit|preventDefault={submitApplication(app)}>
  <label for='justification'>Justification for New Role:</label>
  <input class='input'
    type='text'
    id='justification'
    name='justification'
    bind:value={app.justification}
    class:field-danger={!$justificationValidity.valid}
    class:field-success={$justificationValidity.valid}
    use:justificationValidate={app.justification}
  />
  {#if $justificationValidity.dirty && !$justificationValidity.valid}
    <p class='validation-hint'>
      INVALID: {$justificationValidity.message} 
    </p>
  {/if}
  <label for='qualifications'>Qualifications for New Role:</label>
  <input class='input'
    type='text'
    id='qualifications'
    name='qualifications'
    bind:value={app.qualifications} 
    class:field-danger={!$qualificationsValidity.valid}
    class:field-success={$qualificationsValidity.valid}
    use:qualificationsValidate={app.qualifications}
  />
  {#if $qualificationsValidity.dirty && !$qualificationsValidity.valid}
    <p class='validation-hint'>
      INVALID: {$qualificationsValidity.message} 
    </p>
  {/if}
  <button disabled={!$justificationValidity.valid || !$qualificationsValidity.valid}>Update Application</button>
</form>

