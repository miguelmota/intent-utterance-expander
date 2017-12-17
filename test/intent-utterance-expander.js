var test = require('tape');
var intentUtteranceExpander = require('../intent-utterance-expander');

test('intentUtteranceExpander', function (t) {
  'use strict';

  t.plan(17);

  t.deepEqual(intentUtteranceExpander(), []);
  t.deepEqual(intentUtteranceExpander({}), []);
  t.deepEqual(intentUtteranceExpander([]), []);
  t.deepEqual(intentUtteranceExpander(function() {}), []);
  t.deepEqual(intentUtteranceExpander(''), ['']);
  t.deepEqual(intentUtteranceExpander('foo'), ['foo']);

  t.deepEqual(intentUtteranceExpander(`hello world`), [
    `hello world`
  ]);

  t.deepEqual(intentUtteranceExpander([`hello (|mighty) world`, `(great|good) day`]), [
    [
      `hello mighty world`,
      `hello world`
    ],
    [
      `great day`,
      `good day`
    ]
  ]);

  t.deepEqual(intentUtteranceExpander(`hello (mighty) (world)`), [
    `hello mighty world`
  ]);

  t.deepEqual(intentUtteranceExpander(`(hello|hi) world`), [
    `hello world`,
    `hi world`
  ]);

  t.deepEqual(intentUtteranceExpander(`(|hello) world`), [
    `hello world`,
    `world`
  ]);

  t.deepEqual(intentUtteranceExpander(`(hello|hi) (|mighty) world`), [
    `hello mighty world`,
    `hello world`,
    `hi mighty world`,
    `hi world`
  ]);

  t.deepEqual(intentUtteranceExpander(`(when is|when's) the (|next) Dodger's (|baseball) game?`), [
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

  t.deepEqual(intentUtteranceExpander(`hello {monday|day}`), [
    `hello {monday|day}`
  ]);

  t.deepEqual(intentUtteranceExpander(`hello {(monday|tuesday)|day}`), [
    `hello {monday|day}`,
    `hello {tuesday|day}`
  ]);

  t.deepEqual(intentUtteranceExpander(`(today is|today's) (|a) {(monday|tuesday)|day}`), [
    `today is a {monday|day}`,
    `today is a {tuesday|day}`,
    `today is {monday|day}`,
    `today is {tuesday|day}`,
    `today's a {monday|day}`,
    `today's a {tuesday|day}`,
    `today's {monday|day}`,
    `today's {tuesday|day}`
  ]);

  t.deepEqual(intentUtteranceExpander(`(hello|hi) (|mighty|wonder) world`), [
    `hello mighty world`,
    `hello wonder world`,
    `hello world`,
    `hi mighty world`,
    `hi wonder world`,
    `hi world`
  ]);
});
