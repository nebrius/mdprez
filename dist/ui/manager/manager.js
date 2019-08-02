"use strict";
/*
Copyright (c) Bryan Hughes <bryan@nebri.us>

This file is part of RPrez.

RPrez is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

RPrez is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with RPrez.  If not, see <http://www.gnu.org/licenses/>.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../../message");
const util_1 = require("../../util");
let screens = [];
function createMonitorEntry(parent, screenInfo, screenIndex, defaultOption) {
    const container = document.createElement('div');
    const label = document.createElement('span');
    label.innerText = `Screen ${screenIndex} (${screenInfo.width}x${screenInfo.height})`;
    container.appendChild(label);
    const select = document.createElement('select');
    select.setAttribute('data-screenid', screenInfo.id.toString());
    for (const monitorView in message_1.MonitorViews) {
        if (!message_1.MonitorViews.hasOwnProperty(monitorView)) {
            continue;
        }
        const noneOption = document.createElement('option');
        noneOption.value = monitorView;
        noneOption.innerText = monitorView;
        if (defaultOption === message_1.MonitorViews[monitorView]) {
            noneOption.selected = true;
        }
        select.appendChild(noneOption);
    }
    container.appendChild(select);
    parent.appendChild(container);
}
const connection = new WebSocket('ws://localhost:3000/ws');
let isConnected = false;
connection.addEventListener('open', () => {
    console.log('Connected to bridging server');
    isConnected = true;
});
connection.addEventListener('error', (err) => {
    console.error(`Could not connect to bridging server: ${err}`);
});
function sendMessage(msg) {
    if (!isConnected) {
        throw new Error('Tried to send message before connection is available');
    }
    connection.send(JSON.stringify(msg));
}
connection.addEventListener('message', (msg) => {
    const parsedMessage = JSON.parse(msg.data);
    switch (parsedMessage.type) {
        case message_1.MessageType.ScreenUpdated:
            const monitorListContainer = document.getElementById('monitorList');
            if (!monitorListContainer) {
                throw new Error(util_1.createInternalError('"monitorListContainer" is unexpectedly null'));
            }
            for (const child of monitorListContainer.childNodes) {
                monitorListContainer.removeChild(child);
            }
            screens = parsedMessage.screens;
            for (let i = 0; i < screens.length; i++) {
                let defaultScreen;
                if (i === 0) {
                    defaultScreen = message_1.MonitorViews.Audience;
                }
                else if (i === 1) {
                    defaultScreen = message_1.MonitorViews.Speaker;
                }
                createMonitorEntry(monitorListContainer, screens[i], i, defaultScreen);
            }
            break;
        case message_1.MessageType.ProjectLoaded:
            const presentationView = document.getElementById('presentationView');
            if (!presentationView) {
                throw new Error(util_1.createInternalError('presentationView is unexpectedly null'));
            }
            const loadView = document.getElementById('loadView');
            if (!loadView) {
                throw new Error(util_1.createInternalError('loadView is unexpectedly null'));
            }
            presentationView.style.display = 'inherit';
            loadView.style.display = 'none';
            break;
        default:
            throw new Error(util_1.createInternalError(`Received unexpected message type ${parsedMessage.type}`));
    }
});
function selectPresentationFile() {
    const selectedFile = document.getElementById('presentationInput');
    if (!selectedFile) {
        throw new Error(util_1.createInternalError('"selectedFile" is unexpectedly null'));
    }
    const filenames = selectedFile.files;
    if (!filenames) {
        throw new Error(util_1.createInternalError('"filenames" is unexpectedly null'));
    }
    const message = {
        type: message_1.MessageType.RequestLoadPresentation,
        filename: filenames[0].path
    };
    sendMessage(message);
}
function requestPresenterShow() {
    const screenAssignments = {};
    const monitorListElement = document.getElementById('monitorList');
    if (!monitorListElement) {
        throw new Error(util_1.createInternalError('"monitorListElement" is unexpectedly null'));
    }
    for (const monitorSelect of document.querySelectorAll('#monitorList select')) {
        const monitorView = monitorSelect.selectedOptions[0].value;
        const monitorId = parseInt(monitorSelect.getAttribute('data-screenid'), 10);
        screenAssignments[monitorId] = monitorView;
    }
    const message = {
        type: message_1.MessageType.RequestPresentShow,
        screenAssignments
    };
    sendMessage(message);
}
const presentationInput = document.getElementById('presentationInput');
if (!presentationInput) {
    throw new Error(util_1.createInternalError('"presentationInput" is unexpectedly null'));
}
presentationInput.onchange = selectPresentationFile;
const presentButton = document.getElementById('presentButton');
if (!presentButton) {
    throw new Error(util_1.createInternalError('"presentButton" is unexpectedly null'));
}
presentButton.onclick = requestPresenterShow;
const managerReadyMessage = {
    type: message_1.MessageType.ManagerReady,
};
sendMessage(managerReadyMessage);
//# sourceMappingURL=manager.js.map