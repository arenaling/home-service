/**
 * Sale model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Sale = require('../../sqldb').Sale;
var SaleEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
SaleEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Sale.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    SaleEvents.emit(event + ':' + doc._id, doc);
    SaleEvents.emit(event, doc);
    done(null);
  };
}

exports.default = SaleEvents;
//# sourceMappingURL=sale.events.js.map
