ready(function(){
  navMenuControl();
  var path = location.pathname,
      subpath = path.match('faq.html');
  if (subpath && subpath[0] === 'faq.html') {
    faqScrollControl();
  }
  var backToTop = document.getElementById('backtotop');
  backToTop.addEventListener('click', function() {
    bringIntoView(document.body, 500);
  });
  window.addEventListener('scroll', function() {
    showBackToTop(backToTop);
  });
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

function faqScrollControl() {
  var faq = document.getElementById('faq'),
      list = faq.getElementsByTagName('li'),
      questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
  for (let i=0; i<list.length; i++) {
    list[i].addEventListener('click', function(e) {
      bringIntoView(document.getElementById(questions[i]), 500);
    });
  }
}

function showBackToTop(elem) {
  var scrollTop = document.body.scrollTop;
  if (scrollTop > 800) {
    elem.classList.add('show');
  } else {
    elem.classList.remove('show');
  }
}

window.bringIntoView_started = 0;
window.bringIntoView_ends = 0;
window.bringIntoView_y = 0;
window.bringIntoView_tick = function() {
  var distanceLeft, dt, duration, t, travel;
  t = Date.now();
  if (t < window.bringIntoView_ends) {
    dt = t - window.bringIntoView_started;
    duration = window.bringIntoView_ends - window.bringIntoView_started;
    distanceLeft = window.bringIntoView_y - document.body.scrollTop;
      travel = distanceLeft * (dt / duration);
      document.body.scrollTop += travel;
      window.requestAnimationFrame(window.bringIntoView_tick);
  } else {
    document.body.scrollTop = window.bringIntoView_y;
  }
};
window.bringIntoView = function(e, duration) {
  window.bringIntoView_started = Date.now();
  window.bringIntoView_ends = window.bringIntoView_started + duration;
  window.bringIntoView_y = Math.min(document.body.scrollTop + e.getBoundingClientRect().top, document.body.scrollHeight - window.innerHeight);
  window.requestAnimationFrame(window.bringIntoView_tick);
};
