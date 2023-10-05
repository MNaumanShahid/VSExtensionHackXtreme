import * as vscode from 'vscode';

// TypeScript auto-suggestion provider
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

// GPT-2 suggestion provider
class GPT2SuggestionProvider implements vscode.CompletionItemProvider {
  constructor(private context: vscode.ExtensionContext) {}

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] | Thenable<vscode.CompletionItem[]> {
    // Your GPT-2 suggestion logic goes here.
    // You can use the example code from the previous response.

    // For now, let's return an empty array.
    return [];
  }
}

export function activate(context: vscode.ExtensionContext) {
  // Register the TypeScript auto-suggestion provider.
  const tsProvider = new TypeScriptSuggestionProvider();
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { scheme: 'file', language: 'typescript' },
      tsProvider,
      '.' // Trigger on any character
    )
  );

  // Register the GPT-2 suggestion provider.
  const gpt2Provider = new GPT2SuggestionProvider(context);
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { scheme: 'file', language: 'your_language_here' }, // Replace with your target language
      gpt2Provider,
      '.' // Trigger on any character
    )
  );

  // Display a success message in the console.
  console.log('Your TypeScript Auto-Suggestion Extension is now active!');

  // You can also use vscode.window.showInformationMessage() to display a popup message.
  vscode.window.showInformationMessage('Your TypeScript Auto-Suggestion Extension is now active!');
}
