"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPT2SuggestionProvider = void 0;
const vscode = require("vscode");
const python_shell_1 = require("python-shell");
class GPT2SuggestionProvider {
    constructor(context) {
        this.context = context;
    }
    async provideSuggestions(document, position) {
        const currentLine = document.lineAt(position).text;
        const textBeforeCursor = currentLine.substr(0, position.character);
        // Call a Python script to generate code suggestions using GPT-2.
        const pythonShell = new python_shell_1.PythonShell('gpt2_code_suggest.py', {
            mode: 'json',
            scriptPath: this.context.extensionPath,
            args: [textBeforeCursor],
        });
        return new Promise((resolve, reject) => {
            pythonShell.on('message', (message) => {
                // Process and format suggestions received from the Python script.
                const suggestions = message.suggestions.map((suggestion) => {
                    return new vscode.CompletionItem(suggestion, vscode.CompletionItemKind.Method);
                });
                resolve(suggestions);
            });
            pythonShell.end((err) => {
                if (err) {
                    reject(err);
                }
            });
        });
    }
}
exports.GPT2SuggestionProvider = GPT2SuggestionProvider;
//# sourceMappingURL=suggestionProvider.js.map