import { IFrame } from 'https://unpkg.com/liaison-core@latest/lib/index.js'

const iframe = IFrame({
    // parentOrigin: 'https://drew-daniels.github.io/liaison-parent-app',
    parentOrigin: 'http://localhost:5500',
    effects: {
        sayHiFromIFrame: () => {
            console.log('Hello from iframe!')
        }
    }
});
iframe.init();

const button = document.getElementById('iframe-btn');
button.onclick = () => {
    iframe.callParentEffect({ name: 'sayHiFromParent', args: {} })
}