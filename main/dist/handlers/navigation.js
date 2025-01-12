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
exports.handleRequestNextSlide = handleRequestNextSlide;
exports.handleRequestPreviousSlide = handleRequestPreviousSlide;
const project_1 = require("../project");
const timer_1 = require("./timer");
function handleRequestNextSlide() {
    const currentProject = (0, project_1.getCurrentProject)();
    if (!currentProject) {
        return;
    }
    const currentSlide = (0, project_1.getSlideNumber)();
    if (currentSlide < currentProject.slides.length - 1) {
        (0, project_1.setSlideNumber)(currentSlide + 1);
        (0, timer_1.handleRequestStartTimer)();
    }
}
function handleRequestPreviousSlide() {
    const currentProject = (0, project_1.getCurrentProject)();
    if (!currentProject) {
        return;
    }
    const currentSlide = (0, project_1.getSlideNumber)();
    if (currentSlide > 0) {
        (0, project_1.setSlideNumber)(currentSlide - 1);
    }
}
//# sourceMappingURL=navigation.js.map