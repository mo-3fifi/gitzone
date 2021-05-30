function activeAllTil(elements, activeElement) {
  const activeIndex = [...elements].indexOf(activeElement);
  [...elements].forEach((element, index) => {
    if (index <= activeIndex) {
      element.classList.add('active')
    } else {
      element.classList.remove('active')
    }
  });
}

function getParents(element, parents) {
  parents.push(element);
  if (element.parentElement) {
    return getParents(element.parentElement, parents)
  } else {
    return parents;
  }
}

window.addEventListener('click', function(event) {
  if(getParents(event.target, []).find((parent) => parent.classList.contains('user-options__title'))) {
    const target = document.querySelector('.component--user-options');
    if (target.classList.contains('active')) {
      target.classList.remove('active');
    } else {
      target.classList.add('active');
    }
  }
});

window.addEventListener('click', function(event) {
  if(getParents(event.target, []).find((parent) => parent.classList.contains('categories-menu__switch'))) {
    const target = document.querySelector('.components--categories-menu');
    if (target.classList.contains('open')) {
      target.classList.remove('open');
    } else {
      target.classList.add('open');
    }
  }
});

// $(function() {
// });
// $(window).on('load', function() {
// });