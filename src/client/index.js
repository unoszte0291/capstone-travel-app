import { getplan } from './js/app';

import './styles/styles.scss';

// Loading weather icons
function importAll(response) {
  return response.keys().map(response);
}
importAll(require.context("../client/media/", false, /\.(svg)$/));

import { checkForName } from './js/nameChecker'

export { getplan, checkForName}