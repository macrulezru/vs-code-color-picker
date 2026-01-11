// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Smart Color Picker" is now active!');

	// Hello World command
	const disposable = vscode.commands.registerCommand('smartColorPicker.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Smart Color Picker!');
	});
	context.subscriptions.push(disposable);

	// Show Selected Color command (Webview)
	const showSelectedColor = vscode.commands.registerCommand('smartColorPicker.showSelectedColor', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			if (selectedText) {
				const panel = vscode.window.createWebviewPanel(
					'smartColorPicker',
					'Smart Color Picker',
					vscode.ViewColumn.Beside,
					{}
				);
				panel.webview.html = `
					<!DOCTYPE html>
					<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Smart Color Picker</title>
						<style>
							body { font-family: sans-serif; padding: 20px; }
							.color-value { font-size: 1.5em; color: ${selectedText}; }
						</style>
					</head>
					<body>
						<h2>Selected Color</h2>
						<div class="color-value">${selectedText}</div>
						<div style="width:60px;height:30px;background:${selectedText};border:1px solid #ccc;margin-top:10px;"></div>
					</body>
					</html>
				`;
			} else {
				vscode.window.showWarningMessage('No text selected.');
			}
		} else {
			vscode.window.showWarningMessage('No active editor.');
		}
	});
	context.subscriptions.push(showSelectedColor);
}

// This method is called when your extension is deactivated
export function deactivate() {}
