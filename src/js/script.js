"use strict";

const indexPathname = "index";
const emissionsPathname = "emissions";
const offsetsPathname = "offsetting";
const clientsPathname = "clients";
const resourcesPathname = "resources";
const currentPathname = process.env.NODE_ENV === 'production' ? window.location.pathname.slice(1) : window.location.pathname.slice(1).split('/')[0].split('.')[0];

const addActiveClassToMenuLink = () => {
  if (currentPathname === indexPathname) {
    const links = document.getElementsByClassName('menu-studio-carbon-negative');

    Array.from(links).forEach(link => {
      link.classList.add('italic', 'menu-active-link');
    });
  };

  if (currentPathname === emissionsPathname) {
    const links = document.getElementsByClassName('menu-emissions');

    Array.from(links).forEach(link => {
      link.classList.add('italic', 'menu-active-link');
    });
  };
  
  if (currentPathname === offsetsPathname) {
    const links = document.getElementsByClassName('menu-offsetting');

    Array.from(links).forEach(link => {
      link.classList.add('italic', 'menu-active-link');
    });
  };
  
  if (currentPathname === clientsPathname) {
    const links = document.getElementsByClassName('menu-clients');

    Array.from(links).forEach(link => {
      link.classList.add('italic', 'menu-active-link');
    });
  };
  
  if (currentPathname === resourcesPathname) {
    const links = document.getElementsByClassName('menu-resources');

    Array.from(links).forEach(link => {
      link.classList.add('italic', 'menu-active-link');
    });
  };
};


//Nav
const breakpointLg = 1080;
const navMenuButton = document.getElementById('nav-menu-button');
const navCloseButton = document.getElementById('nav-close-button');
const menu = document.getElementById('menu');
let menuIsActive = false;
const studioCarbonNegativeButton = document.getElementById('studio-carbon-negative-button');
const studioCarbonNegativeButtonContainer = document.getElementsByClassName('studio-carbon-negative-button-container')[0];
const navMenuButtonContainer = document.getElementsByClassName('nav-menu--button-container')[0];
const tableOfContentsTitle = document.getElementsByClassName('table-of-contents')[0];
const view = document.getElementsByClassName('view')[0];
const menuLinksContainer = document.getElementsByClassName('inner-menu-container');

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


  document.getElementsByClassName('menu-links')[0].classList.add('menu-links--fade-in');

  Array.from(menuLinksContainer).forEach(link => {
    link.classList.remove('inner-menu-container--animation-fade-in-up-slow');
    link.classList.add('inner-menu-container--animation-fade-in-down-slow');
  });

  if (window.innerWidth < breakpointLg && menuIsActive) {
    studioCarbonNegativeButton.classList.add('none');
    studioCarbonNegativeButtonContainer.classList.remove('z-2000');
  };

  if (window.innerWidth > breakpointLg && menuIsActive) {
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

  document.getElementsByClassName('menu-links')[0].classList.remove('menu-links--fade-in');

  Array.from(menuLinksContainer).forEach(link => {
    link.classList.remove('inner-menu-container--animation-fade-in-down-slow');
    link.classList.add('inner-menu-container--animation-fade-in-up-slow');
  });

  if (window.innerWidth < breakpointLg && !menuIsActive) {
    studioCarbonNegativeButton.classList.remove('none');
    studioCarbonNegativeButtonContainer.classList.add('z-2000');
  };
};

const handleResize = () => {
  if (window.innerWidth < breakpointLg && menuIsActive) {
    studioCarbonNegativeButton.classList.add('none');
  };
  
  if (window.innerWidth > breakpointLg && menuIsActive) {
    studioCarbonNegativeButton.classList.remove('none');
    studioCarbonNegativeButtonContainer.classList.add('z-2000');

  };
};

const handleScroll = () => {
  const scrollTop = window.pageYOffset;
  const hideNavMenuButton = window.innerHeight + scrollTop > document.body.offsetHeight - 200;
  const showNavMenuButton = window.innerHeight + scrollTop < document.body.offsetHeight - 200;

  if (scrollTop > 400) {
    studioCarbonNegativeButton.classList.remove('studio-carbon-negative-button--inactive');
    studioCarbonNegativeButton.classList.add('studio-carbon-negative-button--active');
  };

  if (scrollTop < 400) {
    studioCarbonNegativeButton.classList.remove('studio-carbon-negative-button--active');
    studioCarbonNegativeButton.classList.add('studio-carbon-negative-button--inactive');
  };

  if (hideNavMenuButton) {
    navMenuButton.classList.remove('opacity-1', 'events-all');
    navMenuButton.classList.add('opacity-0', 'events-none');
  };

  if (showNavMenuButton) {
    navMenuButton.classList.remove('opacity-0', 'events-none');
    navMenuButton.classList.add('opacity-1', 'events-all');
  };

}

// Add transition when section enters viewport
const sections = document.querySelectorAll('section.fade-in');

window.onscroll = function() {
  if (!document.querySelectorAll('section.fade-in:not(.visible)')) return;

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.75 && section.getBoundingClientRect().top > 0) {
      section.classList.add('visible');
    }
  }
};

addActiveClassToMenuLink();
navMenuButton.addEventListener('click', openMenu);
navCloseButton.addEventListener('click', closeMenu);
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleResize);
