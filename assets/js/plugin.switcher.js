function Switcher(configuration) {
  this.selector = configuration.selector;
  this.selectors = {
    boxes: '.switcher__boxes',
    box: '.switcher__box',
    switch: `[switcher-id="${this.selector.getAttribute('id')}"]`
  };
  this.attributes = {
    switch: {
      switcher: 'switcher-id',
      box: 'switcher-box',
      group: 'switcher-group'
    }
  };
}
Switcher.prototype.activeBox = function(index) {
  const plugin = this;
  [...plugin.selector.querySelector(plugin.selectors.boxes).children].forEach(box => {
    box.classList.remove('active');
  });
  plugin.selector.querySelector(plugin.selectors.boxes).children[index].classList.add('active');
};
Switcher.prototype.init = function() {
  const plugin = this;
  window.addEventListener('click', function(event) {
    const target = getParents(event.target, []).find((parent) => parent.getAttribute(plugin.attributes.switch.switcher) === plugin.selector.getAttribute('id'));
    if(target) {
      if (target.getAttribute(plugin.attributes.switch.group)) {
        document.querySelectorAll(`[${plugin.attributes.switch.group}="${target.getAttribute(plugin.attributes.switch.group)}"]`).forEach(s => {
          s.classList.remove('active');
        });
        target.classList.add('active');
      }
      plugin.activeBox(target.getAttribute(plugin.attributes.switch.box));
    }
  });
};