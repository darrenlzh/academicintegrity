ready(function(){
  navMenuControl();
});

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function navMenuControl() {
  var navmenu = document.getElementById('navmenu'),
      nav = document.getElementById('nav');
  navmenu.addEventListener('click', function() {
    if (this.classList.contains('open')) {
      this.classList.remove('open');
      nav.classList.remove('open');
    } else {
      this.classList.add('open');
      nav.classList.add('open');
    }
  });
}
