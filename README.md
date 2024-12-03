# Smart Bookmark Saver - Chrome Extension

A powerful Chrome extension for managing bookmarks with advanced organization features including workspaces and folders.

## Features

- 📚 **Smart Bookmark Management**: Easily save and organize your bookmarks
- 🏢 **Workspaces**: Create separate workspaces for different projects or contexts
- 📁 **Folders**: Organize bookmarks into folders within workspaces
- 📝 **Custom Descriptions**: Add descriptions to your bookmarks for better context
- 🔄 **Auto-capture**: Automatically captures current page URL and title
- 🎨 **Modern UI**: Clean and intuitive user interface

## Installation

1. Clone this repository or download the source code
```bash
git clone https://github.com/hasan-furkan/bookmark-saver.git
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top-right corner

4. Click "Load unpacked" and select the extension directory

5. The extension icon should appear in your Chrome toolbar

## Usage

### Adding Bookmarks
1. Click the extension icon in your Chrome toolbar
2. Click the "Add Bookmark" button
3. The current page's URL and title will be automatically filled
4. (Optional) Add a description
5. Select a workspace and/or folder
6. Click "Save"

### Creating Workspaces
1. Click the extension icon
2. Click "New Workspace"
3. Enter a name for your workspace
4. Press Enter to create

### Creating Folders
1. Click the extension icon
2. Click "New Folder"
3. Enter a name for your folder
4. Press Enter to create

### Managing Bookmarks
- Click on any bookmark to open it
- Use the delete button to remove bookmarks
- Organize bookmarks by moving them between workspaces and folders

## Project Structure

```
bookmark-saver/
├── manifest.json        # Extension manifest
├── popup.html          # Main popup interface
├── popup.js            # Extension functionality
├── styles.css          # Custom styles
└── icons/              # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Technical Details

- Built using Chrome Extension Manifest V3
- Uses Chrome Storage Sync API for data persistence
- Modern JavaScript (ES6+)
- Styled with Tailwind CSS

## Permissions

The extension requires the following permissions:
- `bookmarks`: To manage Chrome bookmarks
- `storage`: To store extension data
- `tabs`: To access current tab information
- `activeTab`: To interact with the active tab

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have suggestions:
1. Check the [Issues](https://github.com/hasan-furkan/bookmark-saver/issues) page
2. Open a new issue if your problem isn't already listed
3. Provide detailed information about the problem

## Acknowledgments

- Built with [Tailwind CSS](https://tailwindcss.com/)
- Icon designs inspired by modern UI principles
