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

import {
  RequestLoadPresentationMessage,
  RequestPresentShowMessage,
  ProjectLoadedMessage
} from '../common/message';
import {
  loadProject,
  getSlideNumber,
  setSlideNumber,
  sendSlideUpdatedMessage
} from '../project';
import {
  createPresentationWindow,
  closePresentationWindows,
  getDisplayForId
} from '../windows';
import { sendMessageToManager } from '../server';

async function loadPresentation(filename: string): Promise<void> {
  console.log(`Loading presentation at ${filename}`);

  let presentationProject;
  try {
    presentationProject = await loadProject(filename);
  } catch (err) {
    // TODO: display error in the UI
    console.error(err);
    return;
  }

  setSlideNumber(
    Math.min(presentationProject.slides.length - 1, getSlideNumber())
  );
  const message: ProjectLoadedMessage = {
    type: 'ProjectLoaded',
    project: presentationProject
  };
  sendMessageToManager(message);
}

let currentProjectFile = '';

export async function handleRequestLoadPresentation(
  loadMessage: RequestLoadPresentationMessage
): Promise<void> {
  currentProjectFile = loadMessage.filename;
  await loadPresentation(currentProjectFile);
}

export async function handleRequestReloadPresentation() {
  await loadPresentation(currentProjectFile);
}

export function handleRequestPresentShow(
  presentMessage: RequestPresentShowMessage
) {
  console.log('Starting presentation');
  for (const [monitorId, screenAssignment] of Object.entries(
    presentMessage.screenAssignments
  )) {
    if (screenAssignment === 'None') {
      continue;
    }
    // eslint-disable-next-line no-prototype-builtins
    if (!presentMessage.screenAssignments.hasOwnProperty(monitorId)) {
      continue;
    }
    if (!screenAssignment) {
      throw new Error(
        'Internal Error: screenAssignment is unexepctedly undefined'
      );
    }
    const display = getDisplayForId(parseInt(monitorId, 10));
    console.log(
      `Opening ${screenAssignment} view on monitor ` +
        `${monitorId} (${display.bounds.width}x${display.bounds.height})`
    );
    createPresentationWindow(
      screenAssignment,
      display.bounds.x,
      display.bounds.y,
      presentMessage.developerMode,
      presentMessage.fullscreen
    );
    setTimeout(sendSlideUpdatedMessage, 1000);
  }
}

export function handleRequestExitShow() {
  console.log('Exiting presentation');
  closePresentationWindows();
}
