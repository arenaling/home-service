/**
 * Agency model events
 */

'use strict';

import {EventEmitter} from 'events';
var Agency = require('../../sqldb').Agency;
var AgencyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AgencyEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Agency.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    AgencyEvents.emit(event + ':' + doc._id, doc);
    AgencyEvents.emit(event, doc);
    done(null);
  }
}

export default AgencyEvents;
