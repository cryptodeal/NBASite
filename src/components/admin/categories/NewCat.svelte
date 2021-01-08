<script>
  import { getContext } from 'svelte';
  import { requiredValidator } from '../../../components/validators.js'
  import { createFieldValidator } from '../../../components/validation.js'
  //export let message;
	//export let hasForm = false;
	export let onCancel = () => {};
	//export let onOkay = () => {};
  const [ catValidity, catValidate ] = createFieldValidator(requiredValidator())

  const { close } = getContext('simple-modal');

	function _onCancel() {
		onCancel();
		close();
  }
  let name = null;
  function addCategory() {
    return fetch(`admin/categories.json`, {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name
      })
    }).then(res => window.location.href= 'admin/categories')
  };
</script>

<style>
  h3 {
		text-align: center;
	}
	input {
		width: 100%;
    outline: none;
  	border-width: 2px;
    border-style: solid;
	}
	.buttons {
    padding-top: .5em;
		display: flex;
		justify-content: space-between;
	}
  .field-danger {
		border-color: red;
	}
	.field-success {
		border-color: green;
	}
	.validation-hint {
		color: red;
	}
</style>
<label for='category-name'><h3>Category Name:</h3>
  <input
    type="text"
    bind:value={name}
    id='category-name'
    name="Category Name"
    placeholder="Category name..."
    class:field-danger={!$catValidity.valid}
    class:field-success={$catValidity.valid}
    use:catValidate={name}
  />
</label>
{#if $catValidity.dirty && !$catValidity.valid}
  <p class='validation-hint'>
    INVALID: {$catValidity.message} 
  </p>
{/if}
<br/>
<div class="buttons">
	<button on:click={_onCancel}>
		Cancel
	</button>
	<button disabled={!$catValidity.valid} on:click={addCategory}>
	  Add Category
	</button>
</div>