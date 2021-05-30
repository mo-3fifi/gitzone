function ProductsThemeChanger(configuration) {
  this.selector = configuration.selector;
  this.selectors = {
    switch: `[theme-changer-id="${this.selector.getAttribute('id')}"]`
  };
  this.attributes = {
    switch: {
      switcher: 'theme-changer-id',
      theme: 'theme'
    }
  };
}
ProductsThemeChanger.prototype.changeTheme = function(theme) {
  const plugin = this;
  plugin.selector.classList.forEach(c => {
    if (c.startsWith('theme')) {
      plugin.selector.classList.remove(c)
    }
  });
  plugin.selector.classList.add(theme);
};
ProductsThemeChanger.prototype.init = function() {
  const plugin = this;
  window.addEventListener('click', function(event) {
    const target = getParents(event.target, []).find((parent) => parent.getAttribute(plugin.attributes.switch.switcher) === plugin.selector.getAttribute('id'));
    if(target) {
      document.querySelectorAll(`[${plugin.attributes.switch.switcher}="${plugin.selector.getAttribute('id')}"]`).forEach(s => {
        s.classList.remove('active');
      });
      target.classList.add('active');
      plugin.changeTheme(target.getAttribute(plugin.attributes.switch.theme));
    }
  });
};