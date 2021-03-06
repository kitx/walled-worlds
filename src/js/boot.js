define([], function() {
  'use strict';

  return {
    /**
     *
     * @param el        : The Element of the interactive that is being progressively enhanced.
     * @param context   : The DOM context this module must work within.
     * @param config    : The configuration object for this page.
     *
     **/
    boot: function (el, context, config) {
      el.setAttribute('class', el.className + ' gi-interactive');

      var cfg = {
        context: 'interactive',
        baseUrl: '{{ versionedProjectPath }}'
      };

      this.addStyles();

      if ( typeof require() === 'function' ) {
        var req2 = require.config(cfg);
        req2(['main'], function(Main) {
          Main.setup(el);
        });
      } else {
        // curl, i.e. next-gen
        require(cfg, ['main']).then(function(Main) {
          Main.setup(el);
        });
      }
    },

    addStyles: function() {
      var styleElm = document.createElement('link');
      styleElm.setAttribute('rel', 'stylesheet');
      styleElm.setAttribute('type', 'text/css');
      styleElm.setAttribute('href', '{{ versionedProjectPath }}/main.css');
      document.querySelector('head').appendChild(styleElm);
    }

  };

});
