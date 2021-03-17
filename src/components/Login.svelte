<script>
  import { emailValidator, requiredValidator } from './validators.js'
  import { createFieldValidator } from './validation.js'
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  const [ emailValidity, emailValidate ] = createFieldValidator(requiredValidator(), emailValidator())
  const [ pwdValidity, pwdValidate ] = createFieldValidator(requiredValidator())  
  let email = null;
  let password = null;
  function login (email, pwd) {
    fetch('http://localhost:8000/api/session', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        pwd
      })
    }).then(res => {
      if(res.status === 401){
        addNotification({
          text: 'Authentication Failed',
          position: 'bottom-center',
          type: 'danger',
          removeAfter: 4000
        })
      } else {
        window.location.href = 'profile'
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

<form on:submit|preventDefault={login(email, password)}>
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
  <button disabled={!$emailValidity.valid || !$pwdValidity.valid}>Login</button>
</form>

