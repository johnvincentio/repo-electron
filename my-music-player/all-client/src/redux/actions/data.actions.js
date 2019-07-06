//

import { ipcRenderer } from 'electron';

import jsondata from '../../apis/jsonPlaceHolder';

import { SERVER_FOLDERS_DATA, SERVER_META_DATA } from '../../config';

import { FETCH_MUSIC_DATA, FETCH_MUSIC_METADATA } from '../constants';

/* eslint-disable import/prefer-default-export */

export const fetchMusicData = () => async dispatch => {
	console.log('data.actions.fetchMusicData');

	ipcRenderer.on('folders:complete', (event, folders) => {
		// prettier-ignore
		console.log('data.actions.fetchMusicData::folders:complete; folders ', folders);
		dispatch({ type: FETCH_MUSIC_DATA, payload: folders });
	});
};

export const fetchMusicMetaData = folderId => async dispatch => {
	console.log('data.actions.fetchMusicMetaData; folderId ', folderId);
	ipcRenderer.send('metadata:request', folderId);

	ipcRenderer.on('metadata:complete', (event, folders) => {
		// prettier-ignore
		console.log('data.actions.fetchMusicMetaData::metadata:complete; folders ', folders);
		dispatch({ type: FETCH_MUSIC_METADATA, payload: folders });
	});
};

export const fetchMusicDataOld = () => async dispatch => {
	// console.log('data.actions.fetchMusicData');
	const response = await jsondata.get(SERVER_FOLDERS_DATA, {
		crossDomain: true
	});
	// console.log('data.actions.fetchMusicData; response ', response);
	dispatch({ type: FETCH_MUSIC_DATA, payload: response.data });
};

export const fetchMusicMetaDataOld = folderId => async dispatch => {
	// console.log('data.actions.fetchMusicMetaData; folderId ', folderId);
	const response = await jsondata.get(`${SERVER_META_DATA}/${folderId}`, {
		crossDomain: true
	});
	// console.log('data.actions.fetchMusicMetaData; response ', response);
	dispatch({ type: FETCH_MUSIC_METADATA, payload: response.data });
};
