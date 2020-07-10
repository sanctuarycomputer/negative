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
navMenuButton.addEventListener('click', toggleMenu);

const toggleMenu = () => {
  console.log('menu button clicked')
  // document.getElementById("demo").innerHTML = "menu opens here";
}

window.onload = addActiveClassToFooterMenuLink();
