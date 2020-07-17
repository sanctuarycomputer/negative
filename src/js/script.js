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
const breakpointXL = 1280;
const navMenuButton = document.getElementById('nav-menu-button');
const navCloseButton = document.getElementById('nav-close-button');
const menu = document.getElementById('menu');
let menuIsActive = false;
const studioCarbonNegativeButton = document.getElementById('studio-carbon-negative-button');
const studioCarbonNegativeButtonContainer = document.getElementsByClassName('studio-carbon-negative-button-container')[0];
const navMenuButtonContainer = document.getElementsByClassName('nav-menu--button-container')[0];
const tableOfContentsTitle = document.getElementsByClassName('table-of-contents')[0];
const view = document.getElementsByClassName('view')[0];
const globe = document.getElementsByClassName('background-slide')[0];
const menuLinks = document.getElementsByClassName('menu-link');

const openMenu = () => {
  menuIsActive = true;
  tableOfContentsTitle.classList.remove('opacity-0');
  tableOfContentsTitle.classList.add('opacity-1');
  navMenuButton.classList.add('opacity-0', 'events-none', 'none');
  navCloseButton.classList.remove('opacity-0', 'events-none', 'none');
  navCloseButton.classList.add('opacity-1', 'events-all');
  menu.classList.remove('menu--inactive');
  menu.classList.add('menu--active');
  view.classList.add('view--menu-is-active');

  Array.from(menuLinks).forEach(link => {
    link.classList.remove('menu-link--animation-fade-in-up-slow');
    link.classList.add('menu-link--animation-fade-in-down-slow');
  });

  if (globe) {
    globe.classList.add('globe--menu-is-active');
  };

  if (window.innerWidth < breakpointXL && menuIsActive) {
    studioCarbonNegativeButton.classList.add('none');
    studioCarbonNegativeButtonContainer.classList.remove('z-2000');
  };

  if (window.innerWidth > breakpointXL && menuIsActive) {
    studioCarbonNegativeButton.classList.remove('none');
    studioCarbonNegativeButtonContainer.classList.add('z-2000');
  };
};

const closeMenu = () => {
  menuIsActive = false;
  tableOfContentsTitle.classList.add('opacity-0');
  tableOfContentsTitle.classList.remove('opacity-1');
  navCloseButton.classList.add('opacity-0', 'events-none', 'none');
  navMenuButton.classList.add('opacity-1', 'events-all');
  navMenuButton.classList.remove('opacity-0', 'events-none', 'none');
  menu.classList.remove('menu--active');
  menu.classList.add('menu--inactive');
  view.classList.remove('view--menu-is-active');

  Array.from(menuLinks).forEach(link => {
    link.classList.remove('menu-link--animation-fade-in-down-slow');
    link.classList.add('menu-link--animation-fade-in-up-slow');
  });

  if (globe) {
    globe.classList.remove('globe--menu-is-active');
    globe.classList.add('globe--menu-is-active');
  };

  if (window.innerWidth < breakpointXL && !menuIsActive) {
    studioCarbonNegativeButton.classList.remove('none');
    studioCarbonNegativeButtonContainer.classList.add('z-2000');
  };
};

const handleResize = () => {
  if (window.innerWidth < breakpointXL && menuIsActive) {
    studioCarbonNegativeButton.classList.add('none');
  };
  
  if (window.innerWidth > breakpointXL && menuIsActive) {
    studioCarbonNegativeButton.classList.remove('none');
    studioCarbonNegativeButtonContainer.classList.add('z-2000');

  };
};

const handleScroll = () => {
  const scrollTop = window.pageYOffset;

  if (scrollTop > 400) {
    studioCarbonNegativeButton.classList.remove('studio-carbon-negative-button--inactive');
    studioCarbonNegativeButton.classList.add('studio-carbon-negative-button--active');
  };

  if (scrollTop < 400) {
    studioCarbonNegativeButton.classList.remove('studio-carbon-negative-button--active');
    studioCarbonNegativeButton.classList.add('studio-carbon-negative-button--inactive');
  };

}

// Add transition when section enters viewport
const sections = document.querySelectorAll('section.fade-in-up');

window.onscroll = function() {
  if (!document.querySelectorAll('section.fade-in-up:not(.visible)')) return;

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.75 && section.getBoundingClientRect().top > 0) {
      section.classList.add('visible');
    }
  }
};

addActiveClassToFooterMenuLink();
navMenuButton.addEventListener('click', openMenu);
navCloseButton.addEventListener('click', closeMenu);
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleResize);
