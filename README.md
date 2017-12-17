# intent-utterance-expander

> Expand custom utterance slots of phrases, to use with [Alexa Skills Kit Sample Utterances](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/defining-the-voice-interface).

# Demo

[https://lab.miguelmota.com/intent-utterance-expander](https://lab.miguelmota.com/intent-utterance-expander)

# Install

```bash
npm install intent-utterance-expander
```

# Usage

```javascript
const intentUtteranceExpander = require('intent-utterance-expander');

console.log(intentUtteranceExpander(`(hello|hi) (|mighty) world`));
/*
[
  "hello mighty world",
  "hello world",
  "hi mighty world",
  "hi world"
]
*/

console.log(intentUtteranceExpander([`hello (|mighty) world`, `(great|good) day`]);
/*
[
  [
    "hello mighty world",
    "hello world"
  ],
  [
    "great day",
    "good day"
  ]
]
*/

console.log(intentUtteranceExpander(`(when is|when's) the (|next) Dodger's (|baseball) game?`));
/*
[
  "when is the next Dodger's baseball game?",
  "when is the next Dodger's game?",
  "when is the Dodger's baseball game?",
  "when is the Dodger's game?",
  "when's the next Dodger's baseball game?",
  "when's the next Dodger's game?",
  "when's the Dodger's baseball game?",
  "when's the Dodger's game?"
]
*/

console.log(intentUtteranceExpander(`(today is|today's) (|a) {(monday|tuesday)|day}`));
/*
[
  "today is a {monday|day}",
  "today is a {tuesday|day}",
  "today is {monday|day}",
  "today is {tuesday|day}",
  "today's a {monday|day}",
  "today's a {tuesday|day}",
  "today's {monday|day}",
  "today's {tuesday|day}"
]
*/
```

# Test

```bash
npm test
```

# License

MIT
