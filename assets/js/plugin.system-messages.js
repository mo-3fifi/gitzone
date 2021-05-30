function SystemMessages(configuration) {
  this.selector = configuration.selector;
  this.classes = {
    close: 'system__message__close'
  }
}
SystemMessages.prototype.close = function(message) {
  message.remove();
};
SystemMessages.prototype.init = function() {
  const plugin = this;
  window.addEventListener('click', function(event) {
    const target = getParents(event.target, []).find((parent) => parent.classList.contains(plugin.classes.close) && getParents(event.target, []).find((parent) => parent === plugin.selector));
    if(target) {
      plugin.close(target.parentElement);
    }
  });
};