var test = require('tape');
var intentUtteranceExpand = require('../intent-utterance-expand');

test('intentUtteranceExpand', function (t) {
  'use strict';

  t.plan(14);

  t.deepEqual(intentUtteranceExpand(), []);
  t.deepEqual(intentUtteranceExpand({}), []);
  t.deepEqual(intentUtteranceExpand([]), []);
  t.deepEqual(intentUtteranceExpand(function() {}), []);
  t.deepEqual(intentUtteranceExpand(''), ['']);
  t.deepEqual(intentUtteranceExpand('foo'), ['foo']);

  t.deepEqual(intentUtteranceExpand(`hello world`), [
    `hello world`
  ]);

  t.deepEqual(intentUtteranceExpand(`(hello|hi) world`), [
    `hello world`,
    `hi world`
  ]);

  t.deepEqual(intentUtteranceExpand(`(|hello) world`), [
    `hello world`,
    `world`
  ]);

  t.deepEqual(intentUtteranceExpand(`(hello|hi) (|mighty) world`), [
    `hello mighty world`,
    `hello world`,
    `hi mighty world`,
    `hi world`
  ]);

  t.deepEqual(intentUtteranceExpand(`(when is|when's) the (|next) Dodger's (|baseball) game?`), [
      `when is the next Dodger's baseball game?`,
      `when is the next Dodger's game?`,
      `when is the Dodger's baseball game?`,
      `when is the Dodger's game?`,
      `when's the next Dodger's baseball game?`,
      `when's the next Dodger's game?`,
      `when's the Dodger's baseball game?`,
      `when's the Dodger's game?`
    ]
  );

  t.deepEqual(intentUtteranceExpand(`hello {monday|day}`), [
    `hello {monday|day}`
  ]);

  t.deepEqual(intentUtteranceExpand(`hello {(monday|tuesday)|day}`), [
    `hello {monday|day}`,
    `hello {tuesday|day}`
  ]);

  t.deepEqual(intentUtteranceExpand(`(today is|today's) (|a) {(monday|tuesday)|day}`), [
    `today is a {monday|day}`,
    `today is a {tuesday|day}`,
    `today is {monday|day}`,
    `today is {tuesday|day}`,
    `today's a {monday|day}`,
    `today's a {tuesday|day}`,
    `today's {monday|day}`,
    `today's {tuesday|day}`
  ]);

});
