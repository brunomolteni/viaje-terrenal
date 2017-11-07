import Barba from 'barba.js'

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
    });
  },
});

Barba.Pjax.getTransition = function() {
  return AnimatedTransition;
};

Barba.Pjax.start();
