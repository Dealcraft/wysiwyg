# Wysiwyg functions
A framework providing an alternative for document.execCommand

Since `document.execCommand` is officially deprecated, this is meant to be alternative which features all the important functions from `document.execCommand` to build a Wysiwyg-Editor. This library doesn't need to render its own template but rather is implemented in your existing design. However it is possible to render a standard template.


## Installation

To add the library to your project run the following command in your terminal
```bash
npm install wysiwyg-functions
```
After running that command you find the precompiled javascript class in `dist/wysiwyg.js` and the typescript source in `src/index.ts`


## Using

To use the functions you have create a new Instance of the Wysiwyg-Class giving an optional element selector for the container as the first parameter and options as the second parameter. The default element selector is `.wysiwyg` and the template isn't rendered per default.
Here is an example of how your application might look.
```html
<html>
  <header>
    <script src="js/wysiwyg.js"><script>
  </header>
  <body>
    <div class="wysiwyg-editor">
      <div class="wysiwyg-toolbar">
        <button>Bold</button>
        <button>Italic</button>
        <button>Underline</button>
      </div>
      <div class="wysiwyg" contenteditable>
        <!-- Your content will be rendered here -->
      </div>
    </div>

    <script lang="text/javascript">
      const wysiwyg = new Wysiwyg()
    </script>
  </body>
</html>
```
