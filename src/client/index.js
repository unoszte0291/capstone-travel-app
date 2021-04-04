import { getplan } from './js/app';

import './styles/styles.scss';

// Loading weather icons
function importAll(r) {
  return r.keys().map(r);
}
importAll(require.context("../client/media/", false, /\.(svg)$/));

export { getplan };