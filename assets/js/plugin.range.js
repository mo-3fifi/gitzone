function Range(configuration) {
  this.selector = configuration.selector;
  this.selectors = {
    allRange: '.shop-filter__all-range',
    selectedRange: '.shop-filter__selected-range',
    pointerMin: '.shop-filter__slider__pointer.type--min',
    pointerMax: '.shop-filter__slider__pointer.type--max',
    informationMin: '.shop-filter__range-information__min',
    informationMax: '.shop-filter__range-information__max',
    inputMin: '.shop-filter__range-input__min',
    inputMax: '.shop-filter__range-input__max'
  };
  this.attributes = {
    minValue: 'min-value',
    maxValue: 'max-value',
    minRange: 'min-range',
    maxRange: 'max-range'
  };
  this.values = {
    minValue: 0,
    maxValue: 0,
    minRange: 0,
    maxRange: 0
  };
}
Range.prototype.drawRange = function() {
  const plugin = this;
  const selectedRange = document.querySelector(plugin.selectors.selectedRange);
  const direction = getParents(plugin.selector, []).find((parent) => parent.hasAttribute('dir')).getAttribute('dir');
  if (direction === 'rtl') {
    selectedRange.style.right = `${(((plugin.values.minRange - plugin.values.minValue) / (plugin.values.maxValue - plugin.values.minValue)) * 100)}%`;
  } else {
    selectedRange.style.left = `${(((plugin.values.minRange - plugin.values.minValue) / (plugin.values.maxValue - plugin.values.minValue)) * 100)}%`;
  }
  selectedRange.style.width = `${(((plugin.values.maxRange - plugin.values.minRange) / (plugin.values.maxValue - plugin.values.minValue)) * 100)}%`;
};
Range.prototype.setMinRange = function(value) {
  const plugin = this;
  if (value >= plugin.values.minValue && value <= plugin.values.maxRange) {
    plugin.values.minRange = value;
    plugin.selector.setAttribute(plugin.attributes.minRange, value);
    document.querySelector(plugin.selectors.informationMin).innerHTML = parseInt(value);
    document.querySelector(plugin.selectors.inputMin).value = parseInt(value);
    document.querySelector(plugin.selectors.inputMin).dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
    plugin.drawRange();
  }
};
Range.prototype.setMaxRange = function(value) {
  const plugin = this;
  if (value <= plugin.values.maxValue && value >= plugin.values.minRange) {
    plugin.values.maxRange = value;
    plugin.selector.setAttribute(plugin.attributes.maxRange, value);
    document.querySelector(plugin.selectors.informationMax).innerHTML = parseInt(value);
    document.querySelector(plugin.selectors.inputMax).value = parseInt(value);
    document.querySelector(plugin.selectors.inputMax).dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
    plugin.drawRange();
  }
};
Range.prototype.init = function() {
  const plugin = this;
  plugin.values.minValue = parseInt(plugin.selector.getAttribute(plugin.attributes.minValue));
  plugin.values.maxValue = parseInt(plugin.selector.getAttribute(plugin.attributes.maxValue));
  plugin.values.minRange = parseInt(plugin.selector.getAttribute(plugin.attributes.minRange)) || plugin.values.minValue;
  plugin.values.maxRange = parseInt(plugin.selector.getAttribute(plugin.attributes.maxRange)) || plugin.values.maxValue;
  plugin.setMinRange(plugin.values.minRange);
  plugin.setMaxRange(plugin.values.maxRange);
  function pointerMinDrag(event) {
    if (getParents(plugin.selector, []).find((parent) => parent.hasAttribute('dir')).getAttribute('dir') === 'rtl') {
      plugin.setMinRange(((plugin.values.maxValue) / 100) * ((((document.querySelector(plugin.selectors.allRange).offsetLeft + document.querySelector(plugin.selectors.allRange).clientWidth) - event.clientX) / document.querySelector(plugin.selectors.allRange).clientWidth) * 100));
    } else {
      plugin.setMinRange(((plugin.values.maxValue) / 100) * (((event.clientX - document.querySelector(plugin.selectors.allRange).offsetLeft) / document.querySelector(plugin.selectors.allRange).clientWidth) * 100));
    }
  }
  function pointerMaxDrag(event) {
    if (getParents(plugin.selector, []).find((parent) => parent.hasAttribute('dir')).getAttribute('dir') === 'rtl') {
      plugin.setMaxRange(((plugin.values.maxValue) / 100) * ((((document.querySelector(plugin.selectors.allRange).offsetLeft + document.querySelector(plugin.selectors.allRange).clientWidth) - event.clientX) / document.querySelector(plugin.selectors.allRange).clientWidth) * 100));
    } else {
      plugin.setMaxRange(((plugin.values.maxValue) / 100) * (((event.clientX - document.querySelector(plugin.selectors.allRange).offsetLeft) / document.querySelector(plugin.selectors.allRange).clientWidth) * 100));
    }
  }
  document.querySelector(plugin.selectors.pointerMin).addEventListener('dragend', pointerMinDrag);
  document.querySelector(plugin.selectors.pointerMin).addEventListener('drag', pointerMinDrag);
  document.querySelector(plugin.selectors.pointerMax).addEventListener('dragend', pointerMaxDrag);
  document.querySelector(plugin.selectors.pointerMax).addEventListener('drag', pointerMaxDrag);
};