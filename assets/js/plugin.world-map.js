function WorldMap(configuration) {
  this.selector = configuration.selector;
  this.selectors = {
    informationBox: '.world-map__country-information',
    information: {
      icon: '.world-map__country-information__icon',
      name: '.world-map__country-information__name',
      opportunities: '.world-map__country-information__opportunities span'
    },
    country: {
      icon: '.world-map__country__icon',
      name: '.world-map__country__name'
    }
  };
  this.classes = {
    country: 'world-map__country'
  }
}
WorldMap.prototype.displayInformation = function(element) {
  const plugin = this;
  document.querySelector(plugin.selectors.informationBox).classList.add('active');
  document.querySelector(plugin.selectors.information.icon).innerHTML = element.querySelector(plugin.selectors.country.icon).innerHTML;
  document.querySelector(plugin.selectors.information.name).innerHTML = element.querySelector(plugin.selectors.country.name).innerHTML;
  document.querySelector(plugin.selectors.information.opportunities).innerHTML = element.getAttribute('data-opportunities');
};
WorldMap.prototype.init = function() {
  const plugin = this;
  window.addEventListener('mouseover', function(event) {
    const target = getParents(event.target, []).find((parent) => parent.classList.contains(plugin.classes.country) && getParents(event.target, []).find((parent) => parent === plugin.selector));
    if(target) {
      plugin.displayInformation(target);
    }
  });
};