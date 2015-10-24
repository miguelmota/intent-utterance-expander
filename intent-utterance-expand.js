(function(root) {
  'use strict';

  function intentUtteranceExpand(phrase) {
    const phrasePartsRegex = /\{\(.*?\)\}+|\{.*?\}+|\(.*?\)+|[^[\s]+/gi;
    const slotRegex = /^\{.*\}$/i;
    const expandSlotRegex = /\(.*\|.*\)/gi;
    const expandSlotWordRegex = /([^||()]+)/gi;
    const wordsInsideExpandSlotRegex = /([^||()]+)/gi;
    const wordsInsideSlotRegex = /\{\((.*)\).*\|.*\}/i;
    const insideParensRegex = /\(.*\)/i;

    function expand(phrase) {
      if (typeof phrase !== 'string') {
        return [];
      }

      phrasePartsRegex.lastIndex = 0;
      const parts = phrase.match(phrasePartsRegex);
      const phrases = [];

      if (Array.isArray(parts)) {
        for (var i = 0; i < parts.length; i++) {
          expandSlotRegex.lastIndex = 0;
          slotRegex.lastIndex = 0;
          const part = parts[i];

          if (expandSlotRegex.test(part)) {

            if (slotRegex.test(part)) {
              wordsInsideSlotRegex.lastIndex = 0;
              const wordsMatch = part.match(wordsInsideSlotRegex);

              if (Array.isArray(wordsMatch) && wordsMatch[1]) {
                const words = wordsMatch[1].split('|');

                for (var j = 0; j < words.length; j++) {
                  insideParensRegex.lastIndex = 0;
                  const slot = part.replace(insideParensRegex, words[j]);
                  const copy = parts.slice(0);

                  copy.splice(i, 1, slot);
                  phrases.push(copy);
                }
              }
            } else {
              wordsInsideExpandSlotRegex.lastIndex = 0;
              const words = part.match(wordsInsideExpandSlotRegex);

              for (var j = 0; j < words.length; j++) {
                const word = words[j];
                var copy = parts.slice(0);

                copy.splice(i, 1, word);
                phrases.push(copy);

                // remove word, ie. (|foo)
                if (words.length === 1) {
                  copy = parts.slice(0);
                  copy.splice(i, 1);
                  phrases.push(copy);
                }
              }
            }

            break;
          }
        }

        if (!phrases.length) {
          return [phrase];
        }

        const joinedPhrases = phrases.map(function(p) {
          return p.join(' ');
        });

        return joinedPhrases.reduce(function(acc, p, i) {
          expandSlotRegex.lastIndex = 0;
          if (expandSlotRegex.test(p)) {
            acc[i] = expand(p);
          }

          return acc;
        }, joinedPhrases).reduce(function(a, b) {
          return a.concat(b);
        }, []);
      } else {
        return [phrase];
      }
    }

    return expand(phrase);
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = intentUtteranceExpand;
    }
    exports.intentUtteranceExpand = intentUtteranceExpand;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return intentUtteranceExpand;
    });
  } else {
    root.intentUtteranceExpand = intentUtteranceExpand;
  }

})(this);
