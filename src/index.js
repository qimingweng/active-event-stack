import {OrderedMap, Map} from 'immutable';
import {uniqueId} from 'lodash';

const uniqueEventId = uniqueId.bind(null, 'active_event_');

if (typeof document != 'undefined') {
  document.addEventListener('click', onEvent.bind(null, 'click'), true);
  document.addEventListener('keydown', onEvent.bind(null, 'keydown'));
  document.addEventListener('keyup', onEvent.bind(null, 'keyup'));
}

let listenables = OrderedMap();

function onEvent(type, event) {
  const listenable = listenables.last();
  if (listenable) {
    let handler = listenable.get(type);
    if (typeof handler == 'function') {
      handler(event);
    }
  }
};

const EventStack = {
  addListenable(listenArray) {
    /* ex: [['click', clickHandler], ['keydown', keydownHandler]] */
    const id = uniqueEventId();
    const listenable = Map(listenArray);
    listenables = listenables.set(id, listenable);
    return id;
  },
  removeListenable(id) {
    listenables = listenables.delete(id);
  }
};

export default EventStack;