"use strict";

//TO-DO: update pathnames
const indexPathname = "index";
const emissionsPathname = "emissions";
const offsetsPathname = "offsetting";
const clientsPathname = "clients";
const resourcesPathname = "resources";
const currentPathname = window.location.pathname.slice(1).split('/')[0].split('.')[0];

const addActiveClassToFooterMenuLink = () => {
  if (currentPathname === indexPathname) {
    document.getElementsByClassName('nav-studio-carbon-negative')[0].classList.add('italic', 'footer-menu-active-link');
  };

  if (currentPathname === emissionsPathname) {
    document.getElementsByClassName('nav-emissions')[0].classList.add('italic', 'footer-menu-active-link');
  };
  
  if (currentPathname === offsetsPathname) {
    document.getElementsByClassName('nav-offsetting')[0].classList.add('italic', 'footer-menu-active-link');
  };
  
  if (currentPathname === clientsPathname) {
    document.getElementsByClassName('nav-clients')[0].classList.add('italic', 'footer-menu-active-link');
  };
  
  if (currentPathname === resourcesPathname) {
    document.getElementsByClassName('nav-resources')[0].classList.add('italic', 'footer-menu-active-link');
  };  
};


//Nav
const navMenuButton = document.getElementById('nav-menu-button');
const navCloseButton = document.getElementById('nav-close-button');
const menu = document.getElementById('menu');
const studioCarbonNegativeNavButton = document.getElementById('studio-carbon-negative-nav-button');
const view = document.getElementsByClassName('view')[0];

const activeMenu = () => {
  menu.classList.remove('menu--inactive');
  menu.classList.add('menu--active');
  view.classList.add('view--menu-is-active');
};

const closeMenu = () => {
  menu.classList.remove('menu--active');
  menu.classList.add('menu--inactive');
  view.classList.remove('view--menu-is-active');
};

const handleNavScroll = () => {
  const scrollTop = document.documentElement.scrollTop;

  if (scrollTop > 400) {
    studioCarbonNegativeNavButton.classList.remove('studio-carbon-negative-nav-button--inactive');
    studioCarbonNegativeNavButton.classList.add('studio-carbon-negative-nav-button--active');
  }

  if (scrollTop < 400) {
    studioCarbonNegativeNavButton.classList.remove('studio-carbon-negative-nav-button--active');
    studioCarbonNegativeNavButton.classList.add('studio-carbon-negative-nav-button--inactive');
  }
};


navMenuButton.addEventListener('click', activeMenu);
navCloseButton.addEventListener('click', closeMenu);
window.addEventListener('scroll', handleNavScroll);

window.onload = addActiveClassToFooterMenuLink();
