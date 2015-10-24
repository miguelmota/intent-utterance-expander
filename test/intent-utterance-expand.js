var test = require('tape');
var intentUtteranceExpand = require('../intent-utterance-expand');

test('intentUtteranceExpand', function (t) {
  'use strict';

  t.plan(5);

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

});
