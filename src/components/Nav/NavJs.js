export const clickActive = (ul, line, liIndex) => {
  const listLi = ul.querySelectorAll('li a');
  const listActive = ul.querySelector('li>a.active');

  listLi.forEach((item, index) => {
    item.onclick = function () {
      const listActive = ul.querySelector('li>a.active');
      // lineSlide(index, listActive);
      listActive.classList.remove('active');
      item.classList.add('active');
    };
  });
};
export const clickBar = (bar) => {
  let menuAdmin = document.querySelector('.nav-left');
  let contentRight = document.querySelector('.nav-right');
  bar.onclick = function () {
    let barIcon = bar.querySelector('.barIcon');
    menuAdmin.classList.toggle('nav-bar');
    if (barIcon) {
      contentRight.style.marginLeft = '101px';
      contentRight.style.width = 'Calc(100% - 101px)';
    } else {
      contentRight.style.marginLeft = '279px';
      contentRight.style.width = 'Calc(100% - 279px)';
    }
  };
};
export const clickAvatar = (El) => {
  let avatar = El.querySelector('.avatar');
  let select = El.querySelector('.SelectAvatar');
  let blur = El.querySelector('.blurJs');
  avatar.onclick = function (e) {
    select.classList.toggle('active');
    blur.classList.toggle('blur');
  };
  blur.onclick = function (e) {
    select.classList.toggle('active');
    blur.classList.toggle('blur');
  };
};
