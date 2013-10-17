define(['templates', 'mustache', 'app/utils/utils', 'app/models/data', 'PubSub'],
  function(templates, mustache, Utils, DataModel, PubSub)
{
  var el;
  var chapterNavElms = {};
  PubSub.subscribe('chapterActive', _activateNavigation);
  PubSub.subscribe('chapterDeactivate', _deactivateNavigation);


  Utils.on(window, 'scroll', _isFixed);
  Utils.on(window, 'resize', _setNavWidth);

  function _isFixed() {
    var bounds = el.parentNode.getBoundingClientRect();

    if (bounds.top < 0) {
      if (!el.classList.contains('fixed')) {
        _setNavWidth();
        el.classList.add('fixed');
      }
    } else {
      el.classList.remove('fixed');
      el.removeAttribute('style');
    }
  }

  function _setNavWidth() {
    var width = el.parentNode.clientWidth;
    el.setAttribute('style', 'width: ' + width + 'px');
  }

  function _activateNavigation(msg, data) {
    chapterNavElms[data.id].classList.add('active');
  }

  function _deactivateNavigation(msg, data) {
    chapterNavElms[data.id].classList.remove('active');
  }


  function _buildChapterLinks(chapters) {
    var wrapperElm = document.createDocumentFragment();
    chapters.forEach(function(chapter) {
      var el = Utils.buildDOM(mustache.render(templates.navigation_link, chapter)).firstChild;
      wrapperElm.appendChild(el);
      chapterNavElms[chapter.chapterid] = el;
    });
    return wrapperElm;
  }

  function render() {
    var chapterData = DataModel.get('chapters');
    var html = mustache.render(templates.navigation, {links: chapterData});
    el = Utils.buildDOM(html).firstChild;

    el.querySelector('.gi-nav').insertBefore(
      _buildChapterLinks(chapterData),
      el.querySelector('.gi-nav-link-all')
    );

    return el;
  }

  return {
    render: render
  };
});

