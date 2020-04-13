import { isStoreEmpty, } from './store.js';
import { firstTimeHandler, notFirstTimeHandler } from './handlers.js';
import { displayLandingPage } from './DOM.js'
function onLoad() {
  if (isStoreEmpty()) {
    displayLandingPage();
  }
  else {
    notFirstTimeHandler();
  }
}
onLoad();




