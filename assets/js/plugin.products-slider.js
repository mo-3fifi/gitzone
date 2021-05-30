function ProductsSlider(configuration) {
  this.selector = configuration.selector;
  this.classes = {
    previous: 'products-slider__controller--previous',
    next: 'products-slider__controller--next'
  };
  this.selectors = {
    view: '.products-slider__view',
    content: '.products-slider__contnet',
    previous: '.products-slider__controller--previous',
    next: '.products-slider__controller--next'
  };
  this.information = {
    position: 0
  };
}
ProductsSlider.prototype.draw = function() {
  const plugin = this;
  plugin.selector.querySelector(plugin.selectors.view).style.width = '';
  plugin.selector.querySelector(plugin.selectors.content).style.width = '';
  plugin.information.dir = getParents(plugin.selector, []).find((parent) => parent.hasAttribute('dir')).getAttribute('dir');
  plugin.information.itemsCount = [...plugin.selector.querySelector(plugin.selectors.content).children].length;
  plugin.information.viewWdith = plugin.selector.querySelector(plugin.selectors.view).offsetWidth;
  plugin.information.gapWidth = 24;
  plugin.information.itemsPerView = 4;
  plugin.information.itemWidth = (plugin.information.viewWdith - (plugin.information.gapWidth * (plugin.information.itemsPerView - 1))) / plugin.information.itemsPerView;
  plugin.information.fullWidth = (plugin.information.itemsCount * plugin.information.itemWidth) + ((plugin.information.itemsCount - 1) * plugin.information.gapWidth);
  plugin.selector.querySelector(plugin.selectors.view).style.width = `${plugin.information.viewWdith}px`;
  plugin.selector.querySelector(plugin.selectors.content).style.width = `${plugin.information.fullWidth}px`;
  plugin.activeControllers();
};
ProductsSlider.prototype.activeControllers = function() {
  const plugin = this;
  const previous = plugin.selector.querySelector(plugin.selectors.previous);
  const next = plugin.selector.querySelector(plugin.selectors.next);
  if (plugin.information.dir === 'rtl') {
    if (plugin.information.position < (plugin.information.fullWidth - plugin.information.viewWdith)) {
      next.classList.add('active');
    } else {
      next.classList.remove('active');
    }
    if (plugin.information.position > 0) {
      previous.classList.add('active');
    } else {
      previous.classList.remove('active');
    }
  } else {
    if (plugin.information.position > -(plugin.information.fullWidth - plugin.information.viewWdith)) {
      next.classList.add('active');
    } else {
      next.classList.remove('active');
    }
    if (plugin.information.position < 0) {
      previous.classList.add('active');
    } else {
      previous.classList.remove('active');
    }
  }
};
ProductsSlider.prototype.previous = function() {
  const plugin = this;
  if (plugin.information.dir === 'rtl') {
    if (plugin.information.position > 0) {
      plugin.information.position -= (plugin.information.viewWdith + plugin.information.gapWidth);
      plugin.information.position = Math.max(plugin.information.position, 0);
      plugin.selector.querySelector(plugin.selectors.content).style.transform = `translateX(${plugin.information.position}px)`;
    }
  } else {
    if (plugin.information.position < 0) {
      plugin.information.position += (plugin.information.viewWdith + plugin.information.gapWidth);
      plugin.information.position = Math.min(plugin.information.position, 0);
      plugin.selector.querySelector(plugin.selectors.content).style.transform = `translateX(${plugin.information.position}px)`;
    }
  }
  plugin.activeControllers();
};
ProductsSlider.prototype.next = function() {
  const plugin = this;
  if (plugin.information.dir === 'rtl') {
    if (plugin.information.position < (plugin.information.fullWidth - plugin.information.viewWdith)) {
      plugin.information.position += (plugin.information.viewWdith + plugin.information.gapWidth);
      plugin.information.position = Math.min(plugin.information.position, (plugin.information.fullWidth - plugin.information.viewWdith));
      plugin.selector.querySelector(plugin.selectors.content).style.transform = `translateX(${plugin.information.position}px)`;
    }
  } else {
    if (plugin.information.position > -(plugin.information.fullWidth - plugin.information.viewWdith)) {
      plugin.information.position -= (plugin.information.viewWdith + plugin.information.gapWidth);
      plugin.information.position = Math.max(plugin.information.position, -(plugin.information.fullWidth - plugin.information.viewWdith));
      plugin.selector.querySelector(plugin.selectors.content).style.transform = `translateX(${plugin.information.position}px)`;
    }
  }
  plugin.activeControllers();
};
ProductsSlider.prototype.init = function() {
  const plugin = this;
  plugin.draw();
  window.addEventListener('click', function(event) {
    const previous = getParents(event.target, []).find((parent) => parent.classList.contains(plugin.classes.previous) && getParents(event.target, []).find((parent) => parent === plugin.selector));
    const next = getParents(event.target, []).find((parent) => parent.classList.contains(plugin.classes.next) && getParents(event.target, []).find((parent) => parent === plugin.selector));
    if(previous) {
      plugin.previous();
    }
    if(next) {
      plugin.next();
    }
  });
};