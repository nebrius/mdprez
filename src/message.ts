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

export enum MessageType {
  ManagerReady,
  ScreenUpdated,
  RequestLoadPresentation,
  ProjectLoaded,
  RequestPresentShow,
  RequestExistShow,
  RequestNextSlide,
  RequestPreviousSlide,
  currentSlideUpdated
}

export interface IMessage {
  type: MessageType;
}

export interface IScreenInfo {
  width: number;
  height: number;
  id: number;
}

export enum MonitorViews {
  None = 'None',
  Speaker = 'Speaker',
  Audience = 'Audience',
  Clock = 'Clock'
}

export interface IScreenUpdatedMessage extends IMessage {
  screens: IScreenInfo[];
}

export interface IRequestPresentShowMessage extends IMessage {
  screenAssignments: { [ id: number ]: MonitorViews };
}

export interface IRequestLoadPresentationMessage extends IMessage {
  filename: string;
}

export interface IProjectLoaded extends IMessage {
  project: IProject;
}

export interface ICurrentSlideUpdatedMessage extends IMessage {
  currentSlideIndex: number;
  currentSlideUrl: string;
  currentNotesUrl: string;
  nextSlideUrl?: string;
}

export interface IProjectSlide {
  slide: string;
  notes: string;
}

export interface IProject {
  slides: IProjectSlide[];
}

export const ProjectSchema = {
  type: 'object',
  properties: {
    slides: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          slide: {
            type: 'string'
          },
          notes: {
            type: 'string'
          }
        },
        required: [ 'slide' ]
      }
    }
  },
  required: [ 'slides' ]
};
