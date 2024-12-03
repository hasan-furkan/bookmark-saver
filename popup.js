document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const addBookmarkBtn = document.getElementById('addBookmarkBtn');
    const addBookmarkModal = document.getElementById('addBookmarkModal');
    const bookmarkForm = document.getElementById('bookmarkForm');
    const cancelBookmark = document.getElementById('cancelBookmark');
    const addWorkspaceBtn = document.getElementById('addWorkspaceBtn');
    const addFolderBtn = document.getElementById('addFolderBtn');
    const workspacesList = document.getElementById('workspacesList');
    const foldersList = document.getElementById('foldersList');
    const bookmarksList = document.getElementById('bookmarksList');

    // Initialize data from storage
    loadData();

    // Event Listeners
    addBookmarkBtn.addEventListener('click', showAddBookmarkModal);
    cancelBookmark.addEventListener('click', hideAddBookmarkModal);
    bookmarkForm.addEventListener('submit', handleBookmarkSubmit);
    addWorkspaceBtn.addEventListener('click', createWorkspace);
    addFolderBtn.addEventListener('click', createFolder);

    // Functions
    function loadData() {
        chrome.storage.sync.get(['workspaces', 'folders', 'bookmarks'], function(result) {
            console.log('Loaded data:', result);
            if (result.workspaces) displayWorkspaces(result.workspaces);
            if (result.folders) displayFolders(result.folders);
            if (result.bookmarks) displayBookmarks(result.bookmarks);
        });
    }

    function showAddBookmarkModal() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                document.getElementById('url').value = tabs[0].url;
                document.getElementById('title').value = tabs[0].title;
            }
        });
        addBookmarkModal.classList.remove('hidden');
    }

    function hideAddBookmarkModal() {
        addBookmarkModal.classList.add('hidden');
        bookmarkForm.reset();
    }

    async function handleBookmarkSubmit(e) {
        e.preventDefault();
        
        const bookmarkData = {
            url: document.getElementById('url').value,
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            workspace: document.getElementById('workspace').value,
            folder: document.getElementById('folder').value,
            dateAdded: new Date().toISOString()
        };

        chrome.storage.sync.get(['bookmarks'], function(result) {
            const bookmarks = result.bookmarks || [];
            bookmarks.push(bookmarkData);
            
            chrome.storage.sync.set({ bookmarks }, function() {
                if (chrome.runtime.lastError) {
                    console.error('Error saving bookmark:', chrome.runtime.lastError);
                    alert('Error saving bookmark. Please try again.');
                } else {
                    displayBookmarks(bookmarks);
                    hideAddBookmarkModal();
                }
            });
        });
    }

    function createWorkspace() {
        const name = prompt('Enter workspace name:');
        if (!name) return;

        chrome.storage.sync.get(['workspaces'], function(result) {
            const workspaces = result.workspaces || [];
            const newWorkspace = {
                id: Date.now().toString(),
                name: name,
                dateCreated: new Date().toISOString()
            };
            workspaces.push(newWorkspace);

            chrome.storage.sync.set({ workspaces }, function() {
                if (chrome.runtime.lastError) {
                    console.error('Error creating workspace:', chrome.runtime.lastError);
                    alert('Error creating workspace. Please try again.');
                } else {
                    displayWorkspaces(workspaces);
                    updateWorkspaceSelect();
                }
            });
        });
    }

    function createFolder() {
        const name = prompt('Enter folder name:');
        if (!name) return;

        chrome.storage.sync.get(['folders'], function(result) {
            const folders = result.folders || [];
            const newFolder = {
                id: Date.now().toString(),
                name: name,
                dateCreated: new Date().toISOString()
            };
            folders.push(newFolder);

            chrome.storage.sync.set({ folders }, function() {
                if (chrome.runtime.lastError) {
                    console.error('Error creating folder:', chrome.runtime.lastError);
                    alert('Error creating folder. Please try again.');
                } else {
                    displayFolders(folders);
                    updateFolderSelect();
                }
            });
        });
    }

    function displayWorkspaces(workspaces) {
        workspacesList.innerHTML = workspaces.map(workspace => `
            <div class="workspace-item flex justify-between items-center">
                <span>${workspace.name}</span>
                <button class="text-red-500 hover:text-red-600" onclick="deleteWorkspace('${workspace.id}')">
                    Delete
                </button>
            </div>
        `).join('');
        updateWorkspaceSelect();
    }

    function displayFolders(folders) {
        foldersList.innerHTML = folders.map(folder => `
            <div class="folder-item flex justify-between items-center">
                <span>${folder.name}</span>
                <button class="text-red-500 hover:text-red-600" onclick="deleteFolder('${folder.id}')">
                    Delete
                </button>
            </div>
        `).join('');
        updateFolderSelect();
    }

    function displayBookmarks(bookmarks) {
        bookmarksList.innerHTML = bookmarks.map(bookmark => `
            <div class="bookmark-item">
                <div class="flex justify-between items-start">
                    <div>
                        <a href="${bookmark.url}" target="_blank" class="text-blue-600 hover:text-blue-800 font-medium">
                            ${bookmark.title}
                        </a>
                        ${bookmark.description ? `<p class="text-gray-600 text-sm mt-1">${bookmark.description}</p>` : ''}
                    </div>
                    <button class="text-red-500 hover:text-red-600" onclick="deleteBookmark('${bookmark.url}')">
                        Delete
                    </button>
                </div>
                <div class="mt-2 text-sm text-gray-500">
                    ${bookmark.workspace ? `<span class="mr-2">📁 ${bookmark.workspace}</span>` : ''}
                    ${bookmark.folder ? `<span>📂 ${bookmark.folder}</span>` : ''}
                </div>
            </div>
        `).join('');
    }

    function updateWorkspaceSelect() {
        const select = document.getElementById('workspace');
        chrome.storage.sync.get(['workspaces'], function(result) {
            const workspaces = result.workspaces || [];
            select.innerHTML = '<option value="">Select Workspace</option>' +
                workspaces.map(ws => `<option value="${ws.name}">${ws.name}</option>`).join('');
        });
    }

    function updateFolderSelect() {
        const select = document.getElementById('folder');
        chrome.storage.sync.get(['folders'], function(result) {
            const folders = result.folders || [];
            select.innerHTML = '<option value="">Select Folder</option>' +
                folders.map(f => `<option value="${f.name}">${f.name}</option>`).join('');
        });
    }

    // Global functions for delete operations
    window.deleteWorkspace = function(id) {
        if (!confirm('Are you sure you want to delete this workspace?')) return;
        
        chrome.storage.sync.get(['workspaces'], function(result) {
            const workspaces = result.workspaces.filter(ws => ws.id !== id);
            chrome.storage.sync.set({ workspaces }, function() {
                displayWorkspaces(workspaces);
            });
        });
    };

    window.deleteFolder = function(id) {
        if (!confirm('Are you sure you want to delete this folder?')) return;
        
        chrome.storage.sync.get(['folders'], function(result) {
            const folders = result.folders.filter(f => f.id !== id);
            chrome.storage.sync.set({ folders }, function() {
                displayFolders(folders);
            });
        });
    };

    window.deleteBookmark = function(url) {
        if (!confirm('Are you sure you want to delete this bookmark?')) return;
        
        chrome.storage.sync.get(['bookmarks'], function(result) {
            const bookmarks = result.bookmarks.filter(b => b.url !== url);
            chrome.storage.sync.set({ bookmarks }, function() {
                displayBookmarks(bookmarks);
            });
        });
    };
});
