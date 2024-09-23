# Installing an Unpacked Chrome Extension

This guide explains how to enable **Development Mode** in Google Chrome and install an **unpacked** extension. This is useful when testing an extension during development.

## Steps

### 1. Open the Chrome Extensions Page

1. Open Google Chrome.
2. Type the following in the address bar and press **Enter**:
`chrome://extensions/`

3. This will open the Chrome Extensions page, where you can see all installed extensions.

### 2. Enable Developer Mode

1. In the top-right corner of the Extensions page, you will see a toggle for **Developer mode**.
2. Click the toggle to turn on **Developer mode**. The page will refresh and show additional options like **Load unpacked** and **Pack extension**.

### 3. Load an Unpacked Extension

1. Click the **Load unpacked** button.
2. A file selection dialog will appear. Navigate to the directory where your extension’s files are stored. Make sure to select the folder that contains the `manifest.json` file.
3. Once the folder is selected, Chrome will load the extension and it will appear in the list of installed extensions.

### 4. Verify the Extension Installation

- After the extension is loaded, it should be visible in the list of installed extensions.
- If you make changes to the extension’s code, you can click the **Reload** button under the extension to apply the changes without reinstalling it.

### Troubleshooting

- Ensure that your extension contains a correctly configured `manifest.json` file, as Chrome will throw an error if the manifest is invalid.
- If the extension is not working as expected, you can open the **Chrome Developer Console** to check for errors by pressing `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac).

---

Congratulations! You have successfully installed an **unpacked** Chrome extension in **Developer Mode**.
