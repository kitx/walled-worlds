define(['tabletop', 'app/models/config', 'data', 'PubSub'], function(Tabletop, Config, Data, PubSub) {
  var dataStore = '';
  var callback;
  this.tabletop = null;

  function fetch(cb) {
    callback = cb;

    if (Data) {
      _successFetch(Data);
    } else {
      this.tabletop = Tabletop.init( {
        key: Config.google_spreadsheet_key,
        callback: _successFetch,
        simpleSheet: false
      });
    }
  }

  function _successFetch(response) {
    PubSub.publish('loadSuccess');
    dataStore = response;
    callback();
  }

  function get(attribute) {
    return dataStore[attribute].elements;
  }

  return {
    fetch: fetch,
    dataStore: dataStore,
    get: get
  };
});

