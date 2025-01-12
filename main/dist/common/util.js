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
exports.PORT = void 0;
exports.createInternalError = createInternalError;
exports.numToString = numToString;
exports.sleep = sleep;
exports.PORT = 3087;
function createInternalError(msg) {
    return `Internal Error: ${msg}. This is a bug, please report it at https://github.com/nebrius/RPrez.`;
}
function numToString(num) {
    let convertedNum = num.toString();
    if (convertedNum.length === 1) {
        convertedNum = '0' + convertedNum;
    }
    return convertedNum;
}
async function sleep(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
}
//# sourceMappingURL=util.js.map