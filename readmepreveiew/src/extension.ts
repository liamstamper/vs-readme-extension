import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension activated');

    let panel: vscode.WebviewPanel | undefined = undefined;

    // Function to create or show the webview panel
    const createWebView = () => {
        if (panel) {
            panel.reveal(vscode.ViewColumn.Two);
        } else {
            panel = vscode.window.createWebviewPanel(
                'markdownPreview',
                'Markdown Preview',
                vscode.ViewColumn.Two,
                {}
            );

            // Load HTML content into the webview
            panel.webview.html = getWebviewContent();
        }

        // Reset when the current panel is closed
        panel.onDidDispose(() => {
            panel = undefined;
        });
    };

    // Function to get HTML content for the webview
    const getWebviewContent = (): string => {
        const htmlPath = vscode.Uri.file(
            path.join(context.extensionPath, 'preview.html')
        );

        const htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf-8');

        return htmlContent;
    };

    // Register a command to open the preview
    let disposable = vscode.commands.registerCommand('readmepreveiew.showPreview', () => {
        createWebView();
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

