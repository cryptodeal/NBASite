<script>
  //import { emailValidator, requiredValidator } from './validators.js'
  //import { createFieldValidator } from './validation.js'
  import { getNotificationsContext } from 'svelte-notifications';
  import { Form, Field, ErrorMessage } from "svelte-forms-lib";
  import * as yup from 'yup';
  import Grid from 'svelte-grid-responsive'
  const { addNotification } = getNotificationsContext();
  //const [ emailValidity, emailValidate ] = createFieldValidator(requiredValidator(), emailValidator())
  //const [ pwdValidity, pwdValidate ] = createFieldValidator(requiredValidator())  
  const formProps = {
      initialValues: { email: "", pwd: "" },
      validationSchema: yup.object().shape({
        email: yup
          .string()
          .email()
          .required(),
        pwd: yup
          .string()
          .required('password is a requied field')
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Requirements: 8 characters containing uppercase, lowercase, number, and special character"
          )
          .matches()
      }),
      onSubmit: values => {
        fetch('http://localhost:8000/api/session', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
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
    };
  
</script>
<style>
  :root {
    --primary-light: #a6f9d6;
    --primary: #5be2a9;
    --primary-dark: #53ce9a;
    --secondary: #1e2145;
    --white: #fff;
    --grey: #e6e6ff;
    --grey-dark: #6d7098;
    --red: #ff6b6b;
  }
  label {
    display: block;
    color: var(--grey-dark);
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 4px;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1.9px;
    line-height: 2;
  }
  button {
    color: #fff;
    background-color: var(--primary);
    border: none;
    text-transform: uppercase;
    letter-spacing: 1.8px;
    outline: none;
    border-radius: 4px;
    display: block;
    margin-top: 12px;
    line-height: 1.8;
    font-size: 12px;
    padding: 10px 18px;
    min-width: 120px;
    transition: all 150ms ease;
    cursor: pointer;
  }
  button:disabled {
    background-color: var(--grey);
  }
  button:focus:not(:disabled) {
    box-shadow: 0 0 0 4px var(--primary-light);
  }
  button:hover:not(:disabled) {
    background-color: var(--primary-dark);
  }
  :global(.form-field){
    font-family: inherit;
    font-size: inherit;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    border: 1px solid var(--grey);
    border-radius: 4px;
    transition: all 150ms ease;
    background: var(--white);
  }
  :global(.form-field:focus){
    outline: none;
    box-shadow: 0 0 0 4px rgb(227, 227, 245);
    border-color: var(--grey);
  }
  :global(.form-error){
    display: block;
    font-size: 12px;
    color: var(--red);
    margin-top: 10px;
    word-wrap: break-word;
  }
  flex-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0;
  }
</style>

<Form class='content' {...formProps}>
  <div>
    <label for='email'>email</label>
    <Field class='form-field' name="email" type="email" />
    <ErrorMessage class='form-error' name="email" />
  </div>

  <div>
    <label for='pwd'>password</label>
    <Field class='form-field' name="pwd" type='password'/>
    <ErrorMessage class='form-error' name="pwd" />
  </div>
  <flex-container>
    <button type="submit">submit</button>
  </flex-container>
</Form>

