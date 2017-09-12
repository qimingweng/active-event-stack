let idCounter = 0;

function uid(prefix) {
  ++idCounter;
  return String(prefix) + idCounter;
}

function last(array) {
  return array[array.length - 1];
}

// ---

if (typeof document != 'undefined') {
  document.addEventListener('click', onEvent.bind(null, 'click'), true);
  document.addEventListener('keydown', onEvent.bind(null, 'keydown'));
  document.addEventListener('keyup', onEvent.bind(null, 'keyup'));
}

let listenables = [];

function onEvent(type, event) {
  const listenable = last(listenables);
  if (listenable) {
    const handler = listenable.events[type];
    if (typeof handler == 'function') {
      handler(event);
    }
  }
}

const EventStack = {
  addListenable(listenArray) {
    /* ex: [['click', clickHandler], ['keydown', keydownHandler]] */
    const id = uid('active_event_');
    listenables.push({
      id,
      events: listenArray.reduce(
        (memo, [ type, fn ]) => {
          memo[type] = fn;
          return memo;
        },
        {}
      ),
    });
    return id;
  },
  removeListenable(id) {
    const idx = listenables.findIndex(x => x.id === id)
    listenables.splice(idx, 1);
  }
};

export default EventStack;