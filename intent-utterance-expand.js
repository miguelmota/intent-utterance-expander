(function(root) {
  'use strict';

  function intentUtteranceExpand(phrase) {
    const expandSlotRegex = /\(.*\|.*\)/gi;
    const expandSlotWordRegex = /([^||()]+)/gi;

    function expand(phrase) {
      if (typeof phrase !== 'string') {
        return [];
      }

      const parts = phrase.match(/\{.*?\}+|\(.*?\)+|[^[\s]+/gi);
      const phrases = [];

      if (Array.isArray(parts)) {
        for (var i = 0; i < parts.length; i++) {
          expandSlotRegex.lastIndex = 0;
          const part = parts[i];

          if (expandSlotRegex.test(part)) {
            const words = part.match(expandSlotWordRegex);

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
