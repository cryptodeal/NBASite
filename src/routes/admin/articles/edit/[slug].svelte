<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
    // this file is called [slug].svelte
    return this.fetch(`http://localhost:8000/api/admin/articles/edit/${params.slug}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }).then(r => r.json()).then(data => {
			return { article: data.article[0], contributors: data.contributors, categories: data.categories };
		});
	}
</script>

<script>
	export let article;
  export let contributors;
  export let categories;
	import { goto, stores } from '@sapper/app'
  import { onMount } from 'svelte'
  import Select from 'svelte-select';
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
  import TextArea from "../../../../components/admin/articles/edit/TextAreaAutosize.svelte";
  import Grid from 'svelte-grid-responsive'
  import 'quill/dist/quill.snow.css'
  import Datepicker from 'svelte-calendar'
  let updatedArticle = {
    content: {},
  }
  let quill;
  let _id = article._id
  article.content.brief ? updatedArticle.content.brief = article.content.brief : updatedArticle.content.brief = '';
  let editor;
  let stateOptions = ['draft', 'published', 'archived']
  updatedArticle.state = article.state;
  updatedArticle.title = article.title;
  const today = new Date();
  let start = new Date();
  let dateFormat = '#{m}-#{d}-#{Y}';
  let formattedSelected
  let selected
  let selectedDate
  let dateChosen
  let isDateChosen
  if (article.publishedDate || updatedArticle.publishedDate){
    let date = {
      month: article.publishedDate.slice(5,7),
      day: article.publishedDate.slice(8,10),
      year: article.publishedDate.slice(0,4)
    }
    updatedArticle.publishedDate = `${date.month}-${date.day}-${date.year}`
    selectedDate = new Date(parseInt(date.year, 10), parseInt(date.month, 10)-1, parseInt(date.day, 10))
    isDateChosen = true;
  } else {
    isDateChosen = false;
  }

  updatedArticle.author = []
  updatedArticle.categories = []
  article.author.map(auth => {
    updatedArticle.author.push({value: auth._id, label: auth.email})
  })
  article.categories.map(cat => {
    updatedArticle.categories.push({value: cat._id, label: cat.name})
  })

  function apiPostNewsImage(fd) {
    return fetch('http://localhost:8000/api/content/images/picture', {
      method: 'POST',
      body: fd
    }).then(res => res.json())
    .then(result => {
      console.log(result)
      return result[0].location
    })
  }
  function imageHandler(){
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      console.log(file)

      formData.append('sampleFile', file);

      // Save current cursor state
      const range = this.quill.getSelection(true);

      // Insert temporary loading placeholder image
      //this.quill.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);

      // Move cursor to right side of image (easier to continue typing)
      //this.quill.setSelection(range.index + 1);

      const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

      // Remove placeholder image
      //this.quill.deleteText(range.index, 1);

      // Insert uploaded image
      // this.quill.insertEmbed(range.index, 'image', res.body.image);
      this.quill.insertEmbed(range.index, 'image', res);
    };
  }
  
	onMount(async() => {
    const { default: Quill } = await import('quill')
    const BaseBlock = Quill.import('blots/block/embed');
    class TwitterBlot extends BaseBlock {
      static create(data) {
        const node = super.create(data);
        function buildInnerHtml(data) {
          window.twitter = function () {
            const loadScript = function (url) {
              return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = url;
                script.onload = function () {
                  resolve(true);
                };
                script.onerror = function () {
                  reject();
                };
                document.head.appendChild(script);
              });
            };
            if (!window.twttr) {
              loadScript('//platform.twitter.com/widgets.js').then(() => {
                setTimeout(() => {
                  window.twttr.widgets.load();
                }, 100);
              });
            } else {
              setTimeout(() => {
                window.twttr.widgets.load();
              }, 100);
            }
          };
          return `
              <div contenteditable="false" style="display: flex; max-width: 100%;">
                <blockquote class="twitter-tweet tw-align-center"><a tabindex="-1" href="${data.url}"></a>Twitter</blockquote>
                <img src="*" onerror="event.stopPropagation(); event.preventDefault(); window.twitter();" style="display: none;"/>
              </div>
            `;
        }
        const innerHTML = buildInnerHtml(data);
        node.innerHTML = innerHTML;
        // node.setAttribute('contenteditable', false);
        // store data
        node.setAttribute('data-url', data.url);
        return node;
      }
      static value(domNode) {
        const { url } = domNode.dataset;
        return { url };
      }
      index() {
        return 1;
      }
    }
    TwitterBlot.blotName = 'tweet';
    TwitterBlot.className = 'ql-tweet';
    TwitterBlot.tagName = 'div';
    Quill.register({
      //'modules/imageUploader': ImageUploader,
      'formats/twitter': TwitterBlot,
    });

    // BEGIN allow image alignment styles
    const ImageFormatAttributesList = [
      'alt',
      'height',
      'width',
      'style'
    ];

    const BaseImageFormat = Quill.import('formats/image');
    class ImageFormat extends BaseImageFormat {
      static formats(domNode) {
        return ImageFormatAttributesList.reduce(function(formats, attribute) {
          if (domNode.hasAttribute(attribute)) {
            formats[attribute] = domNode.getAttribute(attribute);
          }
          return formats;
        }, {});
      }
      format(name, value) {
        if (ImageFormatAttributesList.indexOf(name) > -1) {
          if (value) {
            this.domNode.setAttribute(name, value);
          } else {
            this.domNode.removeAttribute(name);
          }
        } else {
          super.format(name, value);
        }
      }
    }

    Quill.register(ImageFormat, true);
    var ColorClass = Quill.import('attributors/class/color');
    var SizeStyle = Quill.import('attributors/style/size');
    Quill.register(ColorClass, true);
    Quill.register(SizeStyle, true);
		quill = new Quill(editor, {
      modules: {
        toolbar: {
          container: [
            [{ header: [2, 3, false] }],
            [{ 'align': [] }],
            ["bold", "italic", "underline", "strike", "blockquote", "clean"],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['image', 'tweet']
          ],
          handlers: {
            'tweet': async function(){
              let value = prompt(`Enter the tweet's url:`)
              if(value === '' || value == null){
                return null;
              } else{
                const cursorPosition = this.quill.getSelection().index;
                quill.insertEmbed(cursorPosition, 'tweet', { url: value });
              }
            },
            image: imageHandler
          }
        }
      },
      placeholder: "Compose an article...",
      theme: "snow", // or 'bubble'
    });
    document.querySelector('.ql-tweet').innerHTML = '<svg viewBox="0 0 275 275" xmlns="http://www.w3.org/2000/svg"><path d="M91.1 239c94.4 0 146-78 146-145.8 0-2.3 0-4.5-.2-6.7 10-7.2 18.7-16.2 25.6-26.5-9.4 4.1-19.3 6.8-29.5 8a51.5 51.5 0 0 0 22.6-28.3c-10 6-21 10.2-32.6 12.4A51.3 51.3 0 0 0 135.6 99C94.4 96.9 56 77.4 30 45.3a51.3 51.3 0 0 0 15.9 68.5 51 51 0 0 1-23.3-6.4v.6a51.3 51.3 0 0 0 41.1 50.3c-7.5 2-15.4 2.4-23.1.9a51.3 51.3 0 0 0 48 35.6 103 103 0 0 1-76 21.3c23.5 15 50.7 23 78.6 23" fill="#444" fill-rule="nonzero"/></svg>'
  })

  async function saveArticle() {
    //console.log(updatedArticle.publishedDate)
    updatedArticle.content.extended = quill.root.innerHTML
    if (updatedArticle.state) updatedArticle.state = updatedArticle.state.value
    let id = {_id: _id}
    console.log(JSON.stringify({
        updatedArticle,
        id
    }))
    console.log(updatedArticle)
    return fetch(`http://localhost:8000/api/content/articles`, {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        updatedArticle,
        id
      })
    }).then(res => {
      if(res.status === 409){
        notifier.danger('Post already exists')
      } else if(res.status === 201){
        notifier.success('Post saved successfully')
      }
    })
  };

  async function deleteArticle() {
    //console.log(`here is the inner html: ${quill.root.innerHTML}`)
    console.log(JSON.stringify({
        id: _id
      }))
    let res = await fetch(`api/content/articles`, {
      method: "DELETE",
      mode: 'cors',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: _id
      })
    })
    window.location.href= `admin/articles` 
  };
  function printDate(){
    console.log(updatedArticle.publishedDate)
  }
  function upload (e){
    const file = e.target.files[0]
    const fd = new FormData();
    fd.append('sampleFile', file);
    return fetch('api/content/images/picture', {
      method: 'POST',
      body: fd
    }).then(res => {
      return res.status === 400 ? notifier.danger(`File not sent in upload`)
      : res.status === 500 ? notifier.danger(`Upload failed`)
      : notifier.success(`Upload successful`)
    });
  }
</script>

<style>
	* {
    box-sizing: border-box;
  }
  .custom-button {
	  display: inline-block;
	  background: #d74e4d;
	  color: #eee;
	  border: 1px solid black;
	  text-align: center;
	  padding: 15px 30px;
	  cursor: pointer;
	}
  .savebtn {
    padding: 5px;
    font-size: 13px;
    cursor: pointer;
    background-color: #2f4fff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 2px;
  }
  .deletebtn{
    float: right;
    font-size: 13px;
    cursor: pointer;
    background-color: #d74e4d;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 2px;
  }
  .savebtn:hover {
    background-color: #0f33ff;
  }
	form {
		display: grid;
  	max-width: 80%;
  	gap: 10px;
	}
</style>

<svelte:head>
	<title>Edit: {article.title}</title>
</svelte:head>

<h1>Edit Article</h1>
<Grid container gutter={12}>
  <Grid xs={12} md={2} lg={1}>
    Title:
  </Grid>
  <Grid xs={12} md={10} lg={11}>
    <input type="text" bind:value={updatedArticle.title} />
  </Grid>
</Grid>
<br/>
<Grid container gutter={12}>
  <Grid xs={12} md={2} lg={1}>
    Featured Image:
  </Grid>
  <Grid xs={12} md={10} lg={11}>
    <input on:change={upload} type='file' >
  </Grid>
</Grid>
<br/>
<Grid container gutter={12}>
  <Grid xs={12} md={2} lg={1}>
    State:
  </Grid>
  <Grid xs={12} md={10} lg={11}>
    <Select items={stateOptions} bind:selectedValue={updatedArticle.state} inputStyles="box-sizing: border-box;"></Select>
  </Grid>
</Grid>
<br/>
{#if updatedArticle.state.value == 'published'}
  <Grid container gutter={12}>
    <Grid xs={12} md={2} lg={1}>
      Published Date:
    </Grid>
    <Grid xs={12} md={10} lg={11}>
      <Datepicker
      format={dateFormat}
      bind:formattedSelected={updatedArticle.publishedDate}
      bind:selected={selectedDate}
      bind:dateChosen={isDateChosen}
      highlightColor='#d74e4d'
      dayBackgroundColor='#efefef'
      dayTextColor='#333'
      dayHighlightedBackgroundColor='#d74e4d'
      dayHighlightedTextColor='#fff'
      >
        <button class='custom-button' on:click={printDate}>
          {#if isDateChosen} Chosen: {updatedArticle.publishedDate} {:else} Pick a date {/if}
        </button>
      </Datepicker>
    </Grid>
  </Grid>
  <br/>
{/if}
<Grid container gutter={12}>
  <Grid xs={12} md={2} lg={1}>
    Authors:
  </Grid>
  <Grid xs={12} md={10} lg={11}>
    <Select items={contributors} isMulti={true} bind:selectedValue={updatedArticle.author}></Select>
  </Grid>
</Grid>
<br/>
<Grid container gutter={12}>
  <Grid xs={12} md={2} lg={1}>
    Categories:
  </Grid>
  <Grid xs={12} md={10} lg={11}>
    <Select items={categories} isMulti={true} bind:selectedValue={updatedArticle.categories}></Select>
  </Grid>
</Grid>
<br/>
<Grid container gutter={12}>
  <Grid xs={12} md={2} lg={1}>
    Content Brief:
  </Grid>
  <Grid xs={12} md={10} lg={11}>
    <form>
      <TextArea 
        bind:value={updatedArticle.content.brief}  
        minRows={4}
        maxRows={10}
      />
    </form>
  </Grid>
</Grid>
<br/>
<Grid container gutter={12}>
  <Grid xs={12} md={2} lg={1}>
    Content Extended:
  </Grid>
  <Grid xs={12} md={10} lg={11}>
    <div class="editor-wrapper">
      <div bind:this={editor}>
        {@html article.content.extended}
      </div>
    </div>
    <br/>
    <button class='savebtn' on:click|preventDefault={saveArticle}>Save</button>
    <button class='deletebtn' on:click={deleteArticle}>Delete</button>
  </Grid>
</Grid>