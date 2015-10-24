# intent-utterance-expand

> Expand custom utterance slots of phrases, to use with [Alexa Skills Kit Sample Utterances](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/defining-the-voice-interface).

# Install

```bash
npm install intent-utterance-expand
```

```bash
bower install intent-utterance-expand
```

# Usage

```javascript
const intentUtteranceExpand = require('intent-utterance-expand');

console.log(intentUtteranceExpand(`(hello|hi) (|mighty) world`));
/*
[
  "hello mighty world",
  "hello world",
  "hi mighty world",
  "hi world"
]
*/

console.log(intentUtteranceExpand(`(when is|when's) the (|next) Dodger's (|baseball) game?`));
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
```

# Test

```bash
npm test
```

# License

MIT
