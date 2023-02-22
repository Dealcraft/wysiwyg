export type WysiwygOptions = {
    renderTemplate: boolean
    logging: boolean
    template: TemplateElement[],
    emitInputEventOnChange: boolean,
    historySize: number
}

export type TemplateElementAttribute = Object & {
    key: string
    value: string
}

export type TemplateElement = {
    type: string
    classes: string[]
    children?: TemplateElement[]
    attributes?: TemplateElementAttribute[]
}

export type WysiwygCommand = 'bold' | 'italic' | 'underline' | 'strike' | 'headline' | 'code' | 'undo' | 'redo'

type WysiwygButtons = Object & {
    [key: string]: {
        element: HTMLElement
        activeClass: string
    }
}

type WysiwygHistoryEntry = string

type WysiwygHistory = Object & {
    pointer: number
    entries: WysiwygHistoryEntry[]
    timeout: number | null
    commands: WysiwygCommand[]
}

const template: TemplateElement[] = [
    {
        type: 'div',
        classes: ['wysiwyg-functions-template'],
        children: [
            {
                type: 'div',
                classes: ['wysiwyg-functions-toolbar'],
                children: [
                    {
                        type: 'div',
                        classes: ['wysiwyg-functions-toolbar-group'],
                        children: [
                            {
                                type: 'button',
                                classes: ['wysiwyg-functions-toolbar-button'],
                                children: [
                                    {
                                        type: 'i',
                                        classes: ['fa-solid', 'fa-bold'],
                                    },
                                ],
                                attributes: [
                                    {
                                        key: 'type',
                                        value: 'button',
                                    },
                                    {
                                        key: 'data-command',
                                        value: 'bold',
                                    },
                                ],
                            },
                            {
                                type: 'button',
                                classes: ['wysiwyg-functions-toolbar-button'],
                                children: [
                                    {
                                        type: 'i',
                                        classes: ['fa-solid', 'fa-italic'],
                                    },
                                ],
                                attributes: [
                                    {
                                        key: 'type',
                                        value: 'button',
                                    },
                                    {
                                        key: 'data-command',
                                        value: 'italic',
                                    },
                                ],
                            },
                            {
                                type: 'button',
                                classes: ['wysiwyg-functions-toolbar-button'],
                                children: [
                                    {
                                        type: 'i',
                                        classes: ['fa-solid', 'fa-underline'],
                                    },
                                ],
                                attributes: [
                                    {
                                        key: 'type',
                                        value: 'button',
                                    },
                                    {
                                        key: 'data-command',
                                        value: 'underline',
                                    },
                                ],
                            },
                            {
                                type: 'button',
                                classes: ['wysiwyg-functions-toolbar-button'],
                                children: [
                                    {
                                        type: 'i',
                                        classes: ['fa-solid', 'fa-strikethrough'],
                                    },
                                ],
                                attributes: [
                                    {
                                        key: 'type',
                                        value: 'button',
                                    },
                                    {
                                        key: 'data-command',
                                        value: 'strike',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'div',
                        classes: ['wysiwyg-functions-toolbar-group'],
                        children: [
                            {
                                type: 'button',
                                classes: ['wysiwyg-functions-toolbar-button'],
                                children: [
                                    {
                                        type: 'i',
                                        classes: ['fa-solid', 'fa-heading'],
                                    },
                                ],
                                attributes: [
                                    {
                                        key: 'type',
                                        value: 'button',
                                    },
                                    {
                                        key: 'data-command',
                                        value: 'headline',
                                    },
                                ],
                            },
                            {
                                type: 'button',
                                classes: ['wysiwyg-functions-toolbar-button'],
                                children: [
                                    {
                                        type: 'i',
                                        classes: ['fa-solid', 'fa-code'],
                                    },
                                ],
                                attributes: [
                                    {
                                        key: 'type',
                                        value: 'button',
                                    },
                                    {
                                        key: 'data-command',
                                        value: 'code',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'div',
                        classes: ['wysiwyg-functions-toolbar-group'],
                        children: [
                            {
                                type: 'button',
                                classes: ['wysiwyg-functions-toolbar-button'],
                                children: [
                                    {
                                        type: 'i',
                                        classes: ['fa-solid', 'fa-list-ul'],
                                    },
                                ],
                                attributes: [
                                    {
                                        key: 'type',
                                        value: 'button',
                                    },
                                ],
                            },
                            {
                                type: 'button',
                                classes: ['wysiwyg-functions-toolbar-button'],
                                children: [
                                    {
                                        type: 'i',
                                        classes: ['fa-solid', 'fa-list-ol'],
                                    },
                                ],
                                attributes: [
                                    {
                                        key: 'type',
                                        value: 'button',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'div',
                        classes: ['wysiwyg-functions-toolbar-group'],
                        children: [
                            {
                                type: 'button',
                                classes: ['wysiwyg-functions-toolbar-button'],
                                children: [
                                    {
                                        type: 'i',
                                        classes: ['fa-solid', 'fa-undo'],
                                    },
                                ],
                                attributes: [
                                    {
                                        key: 'type',
                                        value: 'button',
                                    },
                                    {
                                        key: 'data-command',
                                        value: 'undo',
                                    },
                                ],
                            },
                            {
                                type: 'button',
                                classes: ['wysiwyg-functions-toolbar-button'],
                                children: [
                                    {
                                        type: 'i',
                                        classes: ['fa-solid', 'fa-redo'],
                                    },
                                ],
                                attributes: [
                                    {
                                        key: 'type',
                                        value: 'button',
                                    },
                                    {
                                        key: 'data-command',
                                        value: 'redo',
                                    },
                                ],
                            },
                        ],
                    }
                ],
            },
            {
                type: 'div',
                classes: ['wysiwyg-functions-editor'],
                attributes: [
                    {
                        key: 'contenteditable',
                        value: 'true',
                    },
                ],
            },
        ],
    },
]

const defaultOptions: WysiwygOptions = {
    renderTemplate: false,
    logging: true,
    template: template,
    emitInputEventOnChange: true,
    historySize: 10
}

export class Wysiwyg {
    private element
    private options: WysiwygOptions
    private name: string = 'Wysiwyg Functions'
    private buttons: WysiwygButtons = {}
    private history: WysiwygHistory = {
        pointer: 0,
        entries: [],
        timeout: null,
        commands: ['bold', 'italic', 'underline', 'strike', 'headline', 'code']
    }
    private isUndo: boolean = false
    private isRedo: boolean = false
    private commandElements = {
        bold: 'strong',
        italic: 'em',
        underline: 'u',
        strike: 's',
        heading: 'h1',
        code: 'code'
    }


    /**
     * @Param {string} elementSelector - The selector of the element that is used as the wysiwyg editor output
     * @Param {WysiwygOptions} options - Additional options for the wysiwyg element
     **/
    constructor(
        elementSelector: string = '.wysiwyg',
        options?: Partial<WysiwygOptions>
    ) {
        const selector = document.querySelector(elementSelector)
        this.options = { ...defaultOptions, ...options }

        if (selector) {
            this.element = selector
        } else {
            this.error(`${elementSelector} does not exist`)
            throw new Error(`${elementSelector} does not exist`)
        }

        if (this.options.renderTemplate) {
            this.log('Rendering template')
            this.renderTemplate()
            this.log('Finished rendering template')
        }

        this.log('Hooking editor')
        this.hookEditor()
        this.log('Finished hooking editor')

        this.log('Creating history')
        this.createHistory()
        this.log('Finished creating history')

        this.log('Adding selection change event listener')
        this.addSelectionChangeEventlistener()
        this.log('Finished adding selection change event listener')

        this.log(`Successfully mounted on ${elementSelector}`)
    }

    public registerButton(
        buttonElement: HTMLElement,
        command: WysiwygCommand,
        activeClass: string = 'active'
    ) {
        if (this.buttons.hasOwnProperty(command))
            return this.error(`${command} already registered`)

        this.log(`Registering command ${command}`)
        this.buttons[command] = {
            element: buttonElement,
            activeClass: activeClass,
        }
        this.buttons[command].element.dataset.command = command
        this.buttons[command].element.addEventListener('click', this.buttonEvent)
        this.log(`Registered command ${command}`)
    }

    public unregisterButton(buttonElement: HTMLElement, command: WysiwygCommand) {
        if (!this.buttons.hasOwnProperty(command))
            return this.error(`${command} not registered`)
        if (this.buttons[command].element !== buttonElement)
            return this.error(`${command} not registered on current element`)

        this.log(`Unregistering command ${command}`)
        this.buttons[command].element.removeEventListener('click', this.buttonEvent)
        delete this.buttons[command]
        this.log(`Unregistered command ${command}`)
    }

    private buttonEvent = (event: any) => {
        let target: HTMLElement =
            event.target.tagName === 'BUTTON'
                ? event.target
                : event.target.parentElement

        if (!target.dataset || !target.dataset.command)
            return this.error(`No command registered for element`)

        let command = target.dataset.command as WysiwygCommand
        if(!this.buttons.hasOwnProperty(command)) return this.error(`Command ${command} not registered`)

        this.log(`Invoking command ${command}`)
        this[command]()

        this.toggleActiveClass(command)

        if(this.history.commands.includes(command)) this.pushHistory(this.element.innerHTML)
    }

    private bold() {
        const selection = this.getSelection()
        if (!selection || !selection.anchorNode || !selection.focusNode) return
        //if (selection.anchorNode !== selection.focusNode && selection.anchorNode.nextSibling !== selection.focusNode) return

        if(!this.isInParents('strong', selection.anchorNode)) {
            this.wrapRange(document.createElement('strong'))
        } else {
            this.unwrapRange('strong')
        }
    }

    private italic() {
        const selection = this.getSelection()
        if (!selection || !selection.anchorNode || !selection.focusNode) return
        //if (selection.anchorNode !== selection.focusNode && selection.anchorNode.nextSibling !== selection.focusNode) return

        if(!this.isInParents('em', selection.anchorNode)) {
            this.wrapRange(document.createElement('em'))
        } else {
            this.unwrapRange('em')
        }
    }

    private underline() {
        const selection = this.getSelection()
        if (!selection || !selection.anchorNode || !selection.focusNode) return
        //if (selection.anchorNode !== selection.focusNode && selection.anchorNode.nextSibling !== selection.focusNode) return

        if(!this.isInParents('u', selection.anchorNode)) {
            this.wrapRange(document.createElement('u'))
        } else {
            this.unwrapRange('u')
        }
    }

    private strike() {
        const selection = this.getSelection()
        if (!selection || !selection.anchorNode || !selection.focusNode) return
        //if (selection.anchorNode !== selection.focusNode && selection.anchorNode.nextSibling !== selection.focusNode) return

        if(!this.isInParents('s', selection.anchorNode)) {
            this.wrapRange(document.createElement('s'))
        } else {
            this.unwrapRange('s')
        }
    }

    private headline() {
        const selection = this.getSelection()
        if (!selection || !selection.anchorNode || !selection.focusNode) return
        //if (selection.anchorNode !== selection.focusNode && selection.anchorNode.nextSibling !== selection.focusNode) return

        if(!this.isInParents('h1', selection.anchorNode)) {
            this.wrapRange(document.createElement('h1'))
        } else {
            this.unwrapRange('h1')
        }
    }

    private code() {
        const selection = this.getSelection()
        if (!selection || !selection.anchorNode || !selection.focusNode) return
        //if (selection.anchorNode !== selection.focusNode && selection.anchorNode.nextSibling !== selection.focusNode) return

        if(!this.isInParents('code', selection.anchorNode)) {
            this.wrapRange(document.createElement('code'))
        } else {
            this.unwrapRange('code')
        }
    }

    private undo() {
        if(!this.isUndoAvailable()) return this.log('Nothing to undo')
        this.toggleActiveClass('undo', true, true)
        this.isUndo = true
        this.changeHistoryPointer(-1)
        this.element.innerHTML = this.history.entries[this.history.pointer]
    }

    private redo() {
        if(!this.isRedoAvailable()) return this.log('Nothing to redo')
        this.isRedo = true
        this.changeHistoryPointer(1)
        this.element.innerHTML = this.history.entries[this.history.pointer]
    }

    private toggleActiveClass(command: WysiwygCommand, force?: boolean, allowHistoryButtons: boolean = false) {
        if(!allowHistoryButtons && (command === 'redo' || command === 'undo')) return
        const button = this.buttons[command]
        const element = button.element
        element.classList.toggle(button.activeClass, force)
    }

    private toggleAllActiveClasses(force?: boolean) {
        for (const command of Object.keys(this.buttons)) {
            this.toggleActiveClass(command as WysiwygCommand, force)
        }
    }

    private isInParents(elementName: string, element: HTMLElement | Node) {

        while(element.nodeName.toLowerCase() !== this.element.nodeName.toLowerCase()) {
            if (!element.parentElement) return false
            if (element.parentElement.tagName.toLowerCase() === elementName) return true
            element = element.parentElement
        }

        return false
    }

    private getParentOfType(elementName: string, element: HTMLElement | Node) {
        if (!this.isInParents(elementName, element)) return null

        while(element.nodeName.toLowerCase() !== this.element.nodeName.toLowerCase()) {
            if (!element.parentElement) return null
            if (element.parentElement.nodeName.toLowerCase() === elementName) return element.parentElement
            element = element.parentElement
        }

        return null
    }

    private getBeforeParentOfType(elementName: string, element: HTMLElement | Node) {
        if (!this.isInParents(elementName, element)) return null

        while(element.nodeName.toLowerCase() !== this.element.nodeName.toLowerCase()) {
            if (!element.parentElement) return null
            if (element.parentElement.nodeName.toLowerCase() === elementName) return element
            element = element.parentElement
        }

        return null
    }

    private isInEditor(element: HTMLElement | Node) {
        while(element.nodeName.toLowerCase() !== document.documentElement.nodeName.toLowerCase()) {
            if (!element.parentElement) return false
            if (element.parentElement.tagName.toLowerCase() === this.element.tagName.toLowerCase()) return true
            element = element.parentElement
        }

        return false
    }

    private wrapRange(element: HTMLElement) {
        const selection = this.getSelection()
        if(!selection) return

        const range = selection.getRangeAt(0)
        const isRange = selection.type === 'Range'

        range.surroundContents(element)

        selection.removeAllRanges()
        if(!isRange) element.innerHTML = '&nbsp;'
        range.selectNode(element.childNodes[0])
        selection.addRange(range)
    }

    private unwrapRange(elementName: string) {
        const selection = this.getSelection()
        if(!selection || !selection.anchorNode || !selection.focusNode) return
        const range = selection.getRangeAt(0)

        const parent = this.getParentOfType(elementName, selection.anchorNode!)
        if(!parent) return

        let newNode = null;

        if(parent === selection.anchorNode.parentElement!) {
            newNode = document.createTextNode(selection.anchorNode.textContent!)
        } else {
            const before = this.getBeforeParentOfType(elementName, selection.anchorNode.parentElement!)
            if(!before) return this.error('Cannot unwrap range')
            newNode = before
        }


        parent.replaceWith(newNode)

        selection.removeAllRanges()
        range.selectNodeContents(newNode)
        selection.addRange(range)
    }

    private isUndoAvailable() {
        this.toggleActiveClass('undo', this.history.pointer > 0, true)
        return this.history.pointer > 0
    }

    private isRedoAvailable() {
        let available = this.history.pointer < (this.options.historySize - 1) && this.history.pointer < (this.history.entries.length - 1)
        this.toggleActiveClass('redo', available, true)
        return available
    }

    private getSelection() {
        const selection = document.getSelection()
        return selection
    }

    private addSelectionChangeEventlistener() {
        document.addEventListener('selectionchange', this.selectionChangeEvent)
    }

    private selectionChangeEvent = (event: any) => {
        const selection = this.getSelection()
        if(!selection) return
        if(!selection.anchorNode) return
        if(!this.isInEditor(selection.anchorNode!)) return this.toggleAllActiveClasses(false)

        for(const command of Object.keys(this.buttons)) {
            // @ts-ignore
            if(this.isInParents(this.commandElements[command], selection.anchorNode)) {
                this.toggleActiveClass(command as WysiwygCommand, true)
            } else {
                this.toggleActiveClass(command as WysiwygCommand, false)
            }
        }
    }

    private editorEvent = (event: any) => {
        event.preventDefault()
        if(this.history.timeout) window.clearTimeout(this.history.timeout)
        if(this.isUndo) return this.isUndo = false
        if(this.isRedo) return this.isRedo = false

        this.history.timeout = setTimeout(() => {
            this.pushHistory(event.target.innerHTML)
        }, 1000)
    }

    private changeHistoryPointer(diff: number) {
        this.history.pointer = this.history.pointer + diff
        this.isUndoAvailable()
        this.isRedoAvailable()
    }

    private pushHistory(entry: WysiwygHistoryEntry) {
        if(this.history.pointer !== this.history.entries.length - 1) {
            this.history.entries.splice(this.history.pointer)
        }

        this.history.entries.push(entry)
        this.changeHistoryPointer(1)
        if (this.history.entries.length >= this.options.historySize) {
            this.history.entries.shift()
            this.history.pointer = 9
        }

        this.isUndoAvailable()
        this.isRedoAvailable()
    }

    private createHistory() {
        this.history.entries.push(this.element.innerHTML)
    }

    private renderTemplate(
        parent = this.element,
        components: TemplateElement[] = this.options.template
    ) {
        for (const templateElement of components) {
            const component = document.createElement(templateElement.type)
            component.classList.add(...templateElement.classes)

            if (templateElement.attributes) {
                for (const attribute of templateElement.attributes) {
                    component.setAttribute(attribute.key, attribute.value)
                }
            }

            if (templateElement.type === 'button' && component.dataset.command) {
                this.registerButton(
                    component,
                    component.dataset.command as WysiwygCommand,
                    'active'
                )
            }

            if (component.contentEditable) {
                this.element = component
            }

            if (templateElement.children) {
                this.renderTemplate(component, templateElement.children)
            }

            parent.appendChild(component)
        }
    }

    private hookEditor() {
        this.element.addEventListener('input', this.editorEvent)
    }

    private error(...args: any[]) {
        if (!this.options.logging) return

        const date = new Date().toLocaleTimeString()
        let errorMessage = `[${this.name}] ${date}:\n`

        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] === 'object') {
                errorMessage += JSON.stringify(args[i], null, 2)
            } else {
                errorMessage = errorMessage + args[i]
            }

            if (i !== args.length - 1) {
                errorMessage += `\n`
            }
        }

        console.error(errorMessage)
    }

    private log(...args: any[]) {
        if (!this.options.logging) return

        const date = new Date().toLocaleTimeString()
        let logMessage = `[${this.name}] ${date}:\n`

        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] === 'object') {
                logMessage += JSON.stringify(args[i], null, 2)
            } else {
                logMessage = logMessage + args[i]
            }

            if (i !== args.length - 1) {
                logMessage += `\n`
            }
        }

        console.log(logMessage)
    }
}
