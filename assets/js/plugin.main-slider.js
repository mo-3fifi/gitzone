function MainSlider(configuration) {
  this.selector = configuration.selector;
  this.selectors = {
    slides: '.main-slider__slides',
    slide: '.main-slider__slide',
    controllerSlides: '.main-slider__controller--slides',
    controllerSlide: '.main-slider__controller--slide'
  }
}
MainSlider.prototype.timeOutFunction = function(callback) {
  return window.setTimeout(callback, 3000);
};
MainSlider.prototype.activeSlide = function(index) {
  const plugin = this;
  [...plugin.selector.querySelector(plugin.selectors.slides).children].forEach(slide => {
    slide.classList.remove('active');
  });
  [...plugin.selector.querySelector(plugin.selectors.controllerSlides).children].forEach(controllerSlide => {
    controllerSlide.classList.remove('active');
  });
  const slide = plugin.slidesList[index];
  const controllerSlide = [...plugin.selector.querySelector(plugin.selectors.controllerSlides).children][index];
  slide.classList.add('active');
  controllerSlide.classList.add('active');
  MainSlider.prototype.timeOut = plugin.timeOutFunction(function() {
    slide.parentElement.appendChild(slide);
    index++;
    plugin.activeSlide(index < plugin.slidesList.length ? index: 0);
  });
};
MainSlider.prototype.init = function() {
  const plugin = this;
  plugin.slidesList = [...plugin.selector.querySelector(plugin.selectors.slides).children];
  plugin.activeSlide(0);
};