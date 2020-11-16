<script>
  export let profile;
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
  import { requiredValidator } from '../validators.js'
  import { createFieldValidator } from '../validation.js'

  const [ emailValidity, emailValidate ] = createFieldValidator(requiredValidator())
  const [ pwdValidity, pwdValidate ] = createFieldValidator(requiredValidator())
  let n;
  
  let email = null;
  let password = null;

function submitApplication(email, password) {
    fetch('api/submit-scope-application', {
      method: 'POST',
      //referrerPolicy: 'no-referrer-when-downgrade',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
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
<h2>Site Role Application</h2>
<form on:submit|preventDefault={submitApplication(email, password)}>
  <label for='email'>Email</label>
  <input class='input'
    type='text'
    id='email'
    name='email'
    bind:value={email}
    class:field-danger={!$emailValidity.valid}
    class:field-success={$emailValidity.valid}
    use:emailValidate={email}
  />
  {#if $emailValidity.dirty && !$emailValidity.valid}
    <p class='validation-hint'>
      INVALID: {$emailValidity.message} 
    </p>
  {/if}
  <label for='password'>Password</label>
  <input class='input'
    type='password'
    id='password'
    name='password'
    bind:value={password} 
    class:field-danger={!$pwdValidity.valid}
    class:field-success={$pwdValidity.valid}
    use:pwdValidate={password}
  />
  {#if $pwdValidity.dirty && !$pwdValidity.valid}
    <p class='validation-hint'>
      INVALID: {$pwdValidity.message} 
    </p>
  {/if}
  <button disabled={!$emailValidity.valid || !$pwdValidity.valid}>Submit Application</button>
</form>

