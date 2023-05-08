import { IFrame } from 'https://unpkg.com/liaison-core@latest/lib/index.js'

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const iframe = IFrame({
    // parentOrigin: 'https://drew-daniels.github.io/liaison-parent-app',
    parentOrigin: 'http://localhost:5500',
    effects: {
        onTokenReceived: ({ args: { token }, callParentEffect }) => {
            localStorage.setItem('token', token);
            console.log('iframe saved token')
            callParentEffect({ name: 'onIFrameUserLoggedIn', args: {} });
        },
        onLogoutRequested: ({ callParentEffect }) => {
            localStorage.removeItem('token');
            console.log('iframe removed token')
            callParentEffect({ name: 'onIFrameLogoutComplete', args: {} });
        }
    }
});

const requestTokenButton = document.getElementById('request-token-button');
requestTokenButton.onclick = () => {
    iframe.callParentEffect({ name: 'onTokenRequested', args: {} });
}