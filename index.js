import { IFrame } from 'https://unpkg.com/liaison-core@latest/lib/index.js'

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const iframe = IFrame({
    // parentOrigin: 'https://drew-daniels.github.io/liaison-parent-app',
    parentOrigin: 'http://localhost:5500',
    effects: {
        sayHiFromIFrame: () => {
            const messagesList = document.getElementById('sync-messages');
            const message = document.createElement('li');
            message.innerText = 'Synchronous message received from parent';
            message.classList.add('message');
            messagesList.appendChild(message);
        },
        sayHiFromIFrameAsync: async () => {
            await timeout(3000);
            const messagesList = document.getElementById('async-messages');
            const message = document.createElement('li');
            message.innerText = 'Asynchronous message received from parent';
            message.classList.add('message');
            messagesList.appendChild(message);
        }
    }
});

const buttonSync = document.getElementById('iframe-btn-sync');
buttonSync.onclick = () => {
    iframe.callParentEffect({ name: 'sayHiFromParentSync', args: {} })
}

const buttonAsync = document.getElementById('iframe-btn-async');
buttonAsync.onclick = () => {
    iframe.callParentEffect({ name: 'sayHiFromParentAsync', args: {} })
}