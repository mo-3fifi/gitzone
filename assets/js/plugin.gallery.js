function Gallery(configuration) {
  this.selector = configuration.selector;
  this.selectors = {
    images: '.gallery__images',
    image: '.gallery__image',
    mainImage: '.gallery__main-image'
  };
  this.classes = {
    image: 'gallery__image'
  }
}
Gallery.prototype.show = function(index) {
  const plugin = this;
  plugin.selector.querySelector(plugin.selectors.mainImage).querySelector('img').setAttribute('src', plugin.selector.querySelector(plugin.selectors.images).children[index].querySelector('img').getAttribute('src'));
};
Gallery.prototype.init = function() {
  const plugin = this;
  window.addEventListener('click', function(event) {
    const target = getParents(event.target, []).find((parent) => parent.classList.contains(plugin.classes.image) && getParents(event.target, []).find((parent) => parent === plugin.selector));
    if(target) {
      plugin.show([...target.parentElement.children].indexOf(target));
    }
  });
  plugin.show(0);
};