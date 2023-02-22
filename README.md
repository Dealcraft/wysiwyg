# Wysiwyg functions
A framework providing an alternative for document.execCommand

Since `document.execCommand` is officially deprecated, this is meant to be alternative which features all the important functions from `document.execCommand` to build a Wysiwyg-Editor. This library doesn't need to render its own template but rather is implemented in your existing design. However, it is possible to render a standard template or a template you provide.


## Installation

To add the library to your project run the following command in your terminal
```bash
npm install wysiwyg-functions
```

After running that command you'll find the `Wysiwyg` class in the `./node_modules/wysiwyg-functions/dist/` directory.
Include your script as a module into your html file.

**Note**: The following examples requires you to already have a wysiwyg structure with buttons and an editor output. If you don't have a structure (yet) check the examples section.

Add the following lines to your script file
```javascript
import { Wysiwyg } from './node_modules/wysiwyg-functions/dist/index.min.mjs';

const wysiwyg = new Wysiwyg();
...
```
The Wysiwyg class will automatically try to mount on an element with the class `wysiwyg` unless you provide a valid query selector string as the first parameter to the constructor.
Once you've finished that, you can register your editor buttons in order for them to work.

```javascript
...
const boldButton = document.querySelector('<bold-button-selector>')
const italicButton = document.querySelector('<italic-button-selector>')
const underlineButton = document.querySelector('<underline-button-selector>')
const strikethroughButton = document.querySelector('<strikethrough-button-selector>')

// Wysiwyg().registerButton(buttonElement, command, activeClass)
wysiwyg.registerButton(boldButton, 'bold', 'active')
wysiwyg.registerButton(italicButton, 'italic', 'active')
wysiwyg.registerButton(underlineButton, 'underline', 'active')
wysiwyg.registerButton(strikethroughButton, 'strikethrough', 'active')
...
```

The `registerButton()` method accepts the following parameters:

| parameter     | optional/default      | description                                                                                       |
|---------------|-----------------------|---------------------------------------------------------------------------------------------------|
| buttonElement | not optional          | The HTMLElement Object of the button you want to register for the command                         |
| command       | not optional          | The Wysiwyg command to register with the button                                                   |
| activeClass   | default&nbsp;`active` | The class which will be assigned to the button if it's command is active on the current selection |

Currently available commands:
* bold
* italic
* underline
* strike
* headline
* code (experimental)
* undo
* redo

At this point your wysiwyg editor should work properly if not so please report the issue on the GitHub repository.


## Customization

The wysiwyg class provides a couple of options to customize the behavior of your editor. If you want to change the default options pass an object containing the changed options as the second parameter to the class constructor.

### Available options
| option key                               | default         | type              | description                                                                                                                                                                      |
|------------------------------------------|-----------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| renderTemplate                           | false           | boolean           | If set to true, the constructor will render the template provided via the `template` option inside the Wysiwyg element instead of just mounting itself to the existing component |
| template                                 | wysiwygTemplate | TemplateElement[] | The template rendered when the `renderTemplate` option is set to true                                                                                                            |
| logging                                  | true            | boolean           | If set to false, the Wysiwyg class won't log any event's to the console                                                                                                          |
| historySize                              | 10              | integer           | The max size of the wysiwyg history. A history entry is added to the history if the last user interaction is longer than 1 second ago                                            |
| emitInputEventOnChange (not implemented) | true            | boolean           | If set to false, the html editor element doesn't emit a input event when one of the buttons is pressed                                                                           |


## Templating

The wysiwyg module comes with a build in template, but the template can easily be changed.

A template is represented by and array which contains the elements which will be appended to the wysiwyg element. Each of the elements in the template array has a type which represents the type of HTMLElement created, an array of classes which will be added to the HTML Element, an optional array of children which are also TemplateElements and finally an optional array of attributes.

Spoken in types, it looks like the following
```typescript
type templateElementAttribute = {
    key: string
    value: string
}

type TemplateElement = {
    type: string
    classes: string[]
    children?: TemplateElement[]
    attributes?: TemplateElementAttribute[]
}

const template: TemplateElement[];
```

As already said, the module comes with a build in template, which requires fontawesome and additional styling.

The rendered, standard template looks like the following:
```
 div.wysiwyg-functions-template
 |
  --- div.wysiwyg-functions-toolbar
 |    |
 |     --- div.wysiwyg-functions-toolbar-group
 |    |    |
 |    |     --- button.wysiwyg-functions-toolbar-button (bold)
 |    |    |
 |    |     --- button.wysiwyg-functions-toolbar-button (italic)
 |    |    |
 |    |     --- button.wysiwyg-functions-toolbar-button (underline)
 |    |    |
 |    |     --- button.wysiwyg-functions-toolbar-button (strikethrough)
 |    |
 |     --- div.wysiwyg-functions-toolbar-group
 |    |    |
 |    |     --- button.wysiwyg-functions-toolbar-button (heading)
 |    |    |
 |    |     --- button.wysiwyg-functions-toolbar-button (code experimental)
 |    |
 |     --- div.wysiwyg-functions-toolbar-group
 |    |    |
 |    |     --- button.wysiwyg-functions-toolbar-button (list ul not implemented)
 |    |    |
 |    |     --- button.wysiwyg-functions-toolbar-button (list ol not implemented)
 |    |
 |     --- div.wysiwyg-functions-toolbar-group
 |         |
 |          --- button.wysiwyg-functions-toolbar-button (undo)
 |         |
 |          --- button.wysiwyg-functions-toolbar-button (redo)
 |     
 |
  --- div.wysiwyg-funcionts-editor
      |
       --- content
```


## Removing buttons

If you want to remove the command association of a button previously registered, call the `unregisterButton()` method on your wysiwyg instance and pass in the button element and the command to remove.
If the command was registered to that button element, the command will be removed from the button otherwise nothing will be changed.

```javascript
...
// Wysiwyg().unregisterButton(element, command)
wysiwyg.unregisterButton(boldButton, 'bold')
...
```

This is to ensure that the button was registered for the specified command and nothing will break after unregistering.


## Examples

This section contains three examples
* An example for working with the default template
* An example for working with a non-default template
* An example for working with no template


### Default template

For working with the default template, you need the proper html setup.

Your html file needs to contain an element which then will be the parent of the wysiwyg editor's html.
Furthermore, the template needs fontawesome to be included in the html page in order for the button icons to be displayed correctly.

#### Advantages
+ Quick
+ No additional packages required

#### Disadvantages
- More or less no customization options
- Proper HTML setup required

Here is an example of how your html file should look like
```html
...
<script src="https://kit.fontawesome.com/<your_kit_code>.js" crossorigin="anonymous"></script>

<div class=".wysiwyg"></div>
<script type="module">
    import { Wysiwyg } from "./node_modules/wysiwyg-functions/dist/index.min.mjs";
    
    const wysiwyg = new Wysiwyg('.wysiwyg', { renderTemplate: true });
</script>
...
```

The above code will render the template's contents inside the div with the class `.wysiwyg` and hook the buttons to the right command. For the styling of the template have a look at the structure in the templating section.


### Non-default template

Working with a non-default template is by far the fastest way.

You still need an element which becomes the parent element of the wysiwyg editor's html but you most likely don't need your own styling.

#### Advantages
+ Quick
+ No standard UI

#### Disadvantages
- Additional packages required
- Proper HTML setup required

Here is an example of how your html file should look like
```html
...
<link rel="stylesheet" href="path/to/template/styling">
<div class=".wysiwyg"></div>
<script type="module">
    import { Wysiwyg } from "./node_modules/wysiwyg-functions/dist/index.min.mjs";
    import { Template } from "./path/to/template";
    
    const wysiwyg = new Wysiwyg('.wysiwyg', { renderTemplate: true, template: Template});
</script>
...
```

The above code will render the template's contents inside the div with the class `.wysiwyg` and hook the buttons to the right command if set up properly otherwise please check the documentation of the template and how you should proceed.


### No template

Working with no templates at all might be the slowest but most customizable way of using the wysiwyg module

You need the whole editor structure and buttons etc. already in your html document and then manually hook the wysiwyg module to the editor's output as well as the buttons to their right command. The advantage of this method is that the buttons can be literally everywhere on the page.

#### Advantages
+ Completely personalized
+ No additional packages required

#### Disadvantages
- More work required

Here is an example of how your html could look like
```html
...
<button class="bold">B</button>

<div class=".wysiwyg">
    <div class="toolbar">
        <button class="underline">U</button>
        <button class="italic">I</button>
        <button class="strikethrough">S</button>
    </div>
    <div class="wysiwyg-editor" contenteditable></div>
</div>
<script type="module">
    import { Wysiwyg } from "./node_modules/wysiwyg-functions/dist/index.min.mjs";
    
    const wysiwyg = new Wysiwyg('.wysiwyg-editor');
    
    const boldButton = document.querySelector('.bold')
    const underlineButton = document.querySelector('.underline')
    const italicButton = document.querySelector('.italic')
    const strikeThroughButton = document.querySelector('.strikethrough')
    
    wysiwyg.registerButton(boldButton, 'bold')
    wysiwyg.registerButton(underlineButton, 'underline', 'text-underlined')
    wysiwyg.registerButton(italicButton, 'italic')
    wysiwyg.registerButton(strikeThroughButton, 'strike')
</script>
...
```

As you can see the buttons don't have to be inside the direct parent of the editor's output. The `registerButton()` methods takes the button you want to register as the first parameter, the command as the second parameter and an optional active class as the third parameter.
If no active class is given, the module will default to `active` as the active class. The active class is only for design purposes and doesn't affect the functionality of the module. The active class will be added to the button if the current selection is affected by the button's command.