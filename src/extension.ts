import * as vscode from 'vscode';

class TypeScriptSuggestionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] | Thenable<vscode.CompletionItem[]> {
    // Get the text up to the current cursor position.
    const currentLine = document.lineAt(position).text;
    const textBeforeCursor = currentLine.substr(0, position.character);

    // Define some example suggestions.
    const suggestions: vscode.CompletionItem[] = [
      new vscode.CompletionItem('console.log'),
      new vscode.CompletionItem('if'),
      new vscode.CompletionItem('for'),
      new vscode.CompletionItem('while'),
    ];

    // Filter suggestions based on user input.
    const filteredSuggestions = suggestions.filter((suggestion) =>
      (suggestion.label as string).startsWith(textBeforeCursor)
    );

    return filteredSuggestions;
  }
}

export function activate(context: vscode.ExtensionContext) {
  // Register the completion provider for TypeScript.
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { scheme: 'file', language: 'typescript' },
      new TypeScriptSuggestionProvider(),
      '.' // Trigger on any character
    )
  );
}
