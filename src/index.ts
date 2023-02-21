type WysiwygOptions = {
    renderTemplate: boolean
}

const defaultOptions: WysiwygOptions = {
    renderTemplate: false
}

class Wysiwyg {
    private element;
    private options: WysiwygOptions;
    private name: string = "Wysiwyg Functions";

    constructor(elementSelector: string = ".wysiwyg", options?: Partial<WysiwygOptions>) {
        const selector = document.querySelector(elementSelector)
        this.options = {...defaultOptions, ...options}
        
        if(selector) {
            this.element = selector
        } else {
            this.error(`${elementSelector} does not exist`)
        }
    }

    private error(...args: any[]) {
        const date = new Date().toLocaleTimeString()
        let errorMessage = `[${this.name}] ${date}:\n`

        for(let i = 0; i < args.length; i++) {
            if(typeof args[i] === 'object') {
                errorMessage += JSON.stringify(args[i], null, 2)
            } else {
                errorMessage = errorMessage + args[i]
            }

            if(i !== args.length - 1) {
                errorMessage += `\n`
            }
        }

        console.error(errorMessage)
    }

    private log(...args: any[]) {
        const date = new Date().toLocaleTimeString()
        let logMessage = `[${this.name}] ${date}:\n`

        for(let i = 0; i < args.length; i++) {
            if(typeof args[i] === 'object') {
                logMessage += JSON.stringify(args[i], null, 2)
            } else {
                logMessage = logMessage + args[i]
            }

            if(i !== args.length - 1) {
                logMessage += `\n`
            }
        }

        console.error(logMessage)
    }
}