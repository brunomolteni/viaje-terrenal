import Barba from 'barba.js'
import insta from 'instafeed.js'

// Page Transitions

var AnimatedTransition = Barba.BaseTransition.extend({
  start: function() {
    this.oldContainer.addEventListener("animationend", () => {window.scrollTo(0,0)} );
    this.oldContainer.classList.remove('going-in');
    this.oldContainer.classList.add('going-out');
    this.newContainerLoading.then(this.finish.bind(this));
  },

  finish: function() {
    this.newContainer.style.visibility = 'visible';
    this.newContainer.classList.add('going-in');
    this.newContainer.addEventListener("animationend", e=>{
      if( !e.target.classList.contains('done') )this.done();
      e.target.classList.add('done');
      FB.XFBML.parse(document.getElementById('barba-wrapper'));
      if( document.getElementById('instafeed') ) feed.run();
    });
  },
});

Barba.Pjax.getTransition = function() {
  return AnimatedTransition;
};

Barba.Pjax.start();

// Instagram Feed

var feed = new insta({
        get: 'user',
        userId: '6319787173',
        accessToken: '249050101.f320fc8.15e6c7bba5394dbea2576235ef36a1ea',
        resolution: 'standard_resolution',
        limit: 9,
    });

if( document.getElementById('instafeed') ) feed.run();

// Facebook comments

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.11&appId=408399119615272';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
