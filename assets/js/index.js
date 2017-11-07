import Barba from 'barba.js'

var HideShowTransition = Barba.BaseTransition.extend({
  start: function() {
    this.newContainerLoading.then(this.finish.bind(this));
  },

  finish: function() {
    this.newContainer.classList.add('going-in');
    this.oldContainer.classList.add('going-out');
    document.body.scrollTop = 0;
    this.done();
  }
});

Barba.Pjax.getTransition = function() {
  return HideShowTransition;
};

Barba.Pjax.start();
