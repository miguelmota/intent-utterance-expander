(function(root) {
  'use strict';

  function intentUtteranceExpander(originalPhrase) {
    if (Array.isArray(originalPhrase)) {
      return originalPhrase.map(intentUtteranceExpander);
    }

    const phrasePartsRegex = /\{\(.*?\)\}+|\{.*?\}+|\(.*?\)+|[^[\s]+/gi;
    const slotRegex = /^\{.*\}$/i;
    const expandSlotRegex = /\(.*\|.*\)/gi;
    const expandSlotWordRegex = /([^||()]+)/gi;
    const singleWordInsideExpandSlotRegex = /\((\w+)\)/gi;
    const wordsInsideExpandSlotRegex = /([^||()]+)/gi;
    const wordsInsideSlotRegex = /\{\((.*)\).*\|.*\}/i;
    const insideParensRegex = /\(.*\)/i;

    function expand(phrase) {
      if (typeof phrase !== 'string') {
        return [];
      }

      singleWordInsideExpandSlotRegex.lastIndex = 0;
      phrase = phrase.replace(singleWordInsideExpandSlotRegex, '$1');

      phrasePartsRegex.lastIndex = 0;
      const parts = phrase.match(phrasePartsRegex);
      const phrases = [];

      if (Array.isArray(parts)) {
        for (var i = 0; i < parts.length; i++) {
          expandSlotRegex.lastIndex = 0;
          slotRegex.lastIndex = 0;
          var part = parts[i];

          if (expandSlotRegex.test(part)) {

            if (slotRegex.test(part)) {
              wordsInsideSlotRegex.lastIndex = 0;
              const wordsMatch = part.match(wordsInsideSlotRegex);

              if (Array.isArray(wordsMatch) && wordsMatch[1]) {
                const words = wordsMatch[1].split('|');

                for (var j = 0; j < words.length; j++) {
                  insideParensRegex.lastIndex = 0;
                  const slot = part.replace(insideParensRegex, words[j]);
                  var copy = parts.slice(0);

                  copy.splice(i, 1, slot);
                  phrases.push(copy);
                }
              }
            } else {
              wordsInsideExpandSlotRegex.lastIndex = 0;
              const words = part.match(wordsInsideExpandSlotRegex);

              for (var j = 0; j < words.length; j++) {
                var word = words[j];
                var copy = parts.slice(0);

                copy.splice(i, 1, word);
                phrases.push(copy);
              }
            }

            if (part.startsWith('(|')) {
              copy = parts.slice(0);
              copy.splice(i, 1);
              phrases.push(copy);
            } else if (part.endsWith('|)')) {
              copy = parts.slice(0);
              copy.splice(i, 1);
              phrases.push(copy);
            } else if (part.includes('||')) {
              copy = parts.slice(0);
              var a = copy.slice(0, i);
              var b = copy.slice(i + 1, 1);
              phrases.push(a.concat(b));
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

    return expand(originalPhrase);
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = intentUtteranceExpander;
    }
    exports.intentUtteranceExpander = intentUtteranceExpander;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return intentUtteranceExpander;
    });
  } else {
    root.intentUtteranceExpander = intentUtteranceExpander;
  }

})(this);
