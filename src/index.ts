type WysiwygOptions = {
	renderTemplate: boolean
	logging: boolean
	template: TemplateElement[]
}

type TemplateElementAttribute = {
	key: string
	value: string
}

type TemplateElement = {
	type: string
	classes: string[]
	children?: TemplateElement[]
	attributes?: TemplateElementAttribute[]
}

type WysiwygCommand = 'bold' | 'italic' | 'underline' | 'strike'

type WysiwygButtons = Object & {
	[key: string]: {
		element: HTMLElement
		activeClass: string
	}
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
}

class Wysiwyg {
	private element
	private options: WysiwygOptions
	private name: string = 'Wysiwyg Functions'
	private buttons: WysiwygButtons = {}

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

	public buttonEvent = (event: any) => {
		let target: HTMLElement =
			event.target.tagName === 'BUTTON'
				? event.target
				: event.target.parentElement

		if (!target.dataset || !target.dataset.command)
			return this.error(`No command registered for element`)

		let command: WysiwygCommand = target.dataset.command as WysiwygCommand
		this.log(`Invoking command ${command}`)
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

			if (templateElement.children) {
				this.renderTemplate(component, templateElement.children)
			}

			parent.appendChild(component)
		}
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
