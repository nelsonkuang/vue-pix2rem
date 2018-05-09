(function () {
  function setMeta() {
      var screenW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 750;
      if (screenW > 750) {
          screenW = 750;
      }
      document.getElementsByTagName('html')[0].style['font-size'] = screenW / 10 + 'px';
  }
  setMeta();

  window.onresize = function () {
      setMeta();
  };
})();