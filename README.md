# Active Event Stack

[![npm](https://img.shields.io/npm/v/active-event-stack.svg?style=flat-square)](https://www.npmjs.com/package/active-event-stack)

This maintains one central stack, where each item is a series of event handlers. This stack allows multiple dialogs to overlap, but a keyboard action to only affect the top item.

# Usage

```javascript
var eventStack = require('active-event-stack');

// On mounting or creating an element, add a new listenable (a series of event listeners)
this.eventToken = eventStack.addListenable([
  ['click', this.clickHandler],
  ['keydown', this.keydownHandler]
]);

// On dismounting or removing an element, remove the listenable by its token
eventStack.removeListenable(this.eventToken);
```