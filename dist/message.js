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
var MessageType;
(function (MessageType) {
    MessageType[MessageType["ManagerReady"] = 0] = "ManagerReady";
    MessageType[MessageType["RequestPresentShow"] = 1] = "RequestPresentShow";
    MessageType[MessageType["RequestExistShow"] = 2] = "RequestExistShow";
    MessageType[MessageType["RequestNextSlide"] = 3] = "RequestNextSlide";
    MessageType[MessageType["RequestPrevious"] = 4] = "RequestPrevious";
    MessageType[MessageType["ScreenUpdated"] = 5] = "ScreenUpdated";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var MonitorViews;
(function (MonitorViews) {
    MonitorViews["None"] = "None";
    MonitorViews["Speaker"] = "Speaker";
    MonitorViews["Audience"] = "Audience";
    MonitorViews["Clock"] = "Clock";
})(MonitorViews = exports.MonitorViews || (exports.MonitorViews = {}));
//# sourceMappingURL=message.js.map