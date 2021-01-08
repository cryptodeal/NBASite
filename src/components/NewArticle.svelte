<script>
  import { getContext } from 'svelte';
  import { requiredValidator } from './validators.js'
  import { createFieldValidator } from './validation.js'
  //export let message;
	//export let hasForm = false;
	export let onCancel = () => {};
	//export let onOkay = () => {};
  const [ titleValidity, titleValidate ] = createFieldValidator(requiredValidator())

  const { close } = getContext('simple-modal');

	function _onCancel() {
		onCancel();
		close();
  }
  let title = null;
  function initArticle() {
    return fetch(`admin/articles.json`, {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title
      })
    }).then(res => res.json()).then(data => {
        window.location.href = `admin/articles/edit/${data.slug}` 
    })
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
<label for='title'><h3>Article Title:</h3>
  <input
    type="text"
    bind:value={title}
    id='title'
    name="title"
    placeholder="Title..."
    class:field-danger={!$titleValidity.valid}
    class:field-success={$titleValidity.valid}
    use:titleValidate={title}
  />
</label>
{#if $titleValidity.dirty && !$titleValidity.valid}
  <p class='validation-hint'>
    INVALID: {$titleValidity.message} 
  </p>
{/if}
<br/>
<div class="buttons">
	<button on:click={_onCancel}>
		Cancel
	</button>
	<button disabled={!$titleValidity.valid} on:click={initArticle}>
		Create Article
	</button>
</div>