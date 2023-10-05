import * as vscode from 'vscode';
import { PythonShell } from 'python-shell';

export class GPT2SuggestionProvider {
  constructor(private context: vscode.ExtensionContext) {}

  async provideSuggestions(
    document: vscode.TextDocument,
    position: vscode.Position
  ): Promise<vscode.CompletionItem[]> {
    const currentLine = document.lineAt(position).text;
    const textBeforeCursor = currentLine.substr(0, position.character);

    // Call a Python script to generate code suggestions using GPT-2.
    const pythonShell = new PythonShell('gpt2_code_suggest.py', {
      mode: 'json',
      scriptPath: this.context.extensionPath, // Path to your extension directory
      args: [textBeforeCursor],
    });

    return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
      pythonShell.on('message', (message) => {
        // Process and format suggestions received from the Python script.
        const suggestions = message.suggestions.map((suggestion: string) => {
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
