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
exports.handleClientWindowReady = handleClientWindowReady;
exports.handleClientMessage = handleClientMessage;
const server_1 = require("../server");
function handleClientWindowReady(msg) {
    (0, server_1.sendMessageToPresentationWindows)(msg);
}
function handleClientMessage(msg) {
    (0, server_1.sendMessageToClientWindows)(msg);
}
//# sourceMappingURL=client.js.map