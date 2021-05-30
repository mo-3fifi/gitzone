function Select() {
  this.selectors = {
    label: '.select__label',
    options: '.select__options',
    option: '.select__option'
  };
  this.attributes = {
    component: 'select-component',
    switcher: 'select-switcher',
    option: 'select-option',
    value: 'select-value'
  };
}
Select.prototype.open = function(component) {
  const plugin = this;
  component.classList.add('open');
};
Select.prototype.close = function(component) {
  const plugin = this;
  component.classList.remove('open');
};
Select.prototype.setValue = function(component, label, value) {
  const plugin = this;
  component.querySelector(plugin.selectors.label).innerHTML = label;
  component.querySelector(`[${plugin.attributes.value}]`).value = value;
  component.querySelector(`[${plugin.attributes.value}]`).dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
};
Select.prototype.init = function() {
  const plugin = this;
  window.addEventListener('click', function(event) {
    const target = getParents(event.target, []).find((parent) => parent.hasAttribute(plugin.attributes.switcher));
    if(target) {
      const component = getParents(target, []).find((parent) => parent.hasAttribute(plugin.attributes.component));
      if (component.classList.contains('open')) {
        plugin.close(component);
      } else {
        plugin.open(component);
      }
    }
  });
  window.addEventListener('click', function(event) {
    const target = getParents(event.target, []).find((parent) => parent.hasAttribute(plugin.attributes.option));
    if(target) {
      const component = getParents(target, []).find((parent) => parent.hasAttribute(plugin.attributes.component));
      plugin.setValue(component, target.innerHTML, target.getAttribute(plugin.attributes.option));
      plugin.close(component);
    }
  });
};