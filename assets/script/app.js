import { isStorageEmpty, } from './storage.js';
import { firstTimeHandler, notFirstTimeHandler } from './handlers.js';

function onLoad() {
  if (isStorageEmpty()) {
    firstTimeHandler();
  }
  else {
    notFirstTimeHandler();
  }
}

onLoad();




