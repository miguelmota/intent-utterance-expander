(function() {
  'use strict';

  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var button = document.getElementById('expand');

  button.addEventListener('click', expand, false);

  expand();

  function expand() {
    var phrases = input.value.split('\n');
    var result = intentUtteranceExpander(phrases).reduce(function(acc, col) {
      return acc.concat(col.join('\n') + '\n\n');
    }, '');

    output.value = result;
  }

})();
