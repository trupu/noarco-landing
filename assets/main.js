// import './style.css'
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { gsap } from 'gsap';
import SplitType from 'split-type';

const textFromLeftObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.gsapChars) {
            // console.log(entry.target);            
            gsap.fromTo(
                entry.target.gsapChars,
                { 
                  y: 10,
                  opacity: 0
                },
                {
                  y: 0,
                  opacity: 1,
                  stagger: 0.03,
                  duration: 1,
                  ease: 'power4.out',
                }
              );
        }
    });
});

const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animation-image--active');
        } else {
            entry.target.classList.remove('animation-image--active');
        }
    });
});

const textFromLeftElements = document.querySelectorAll('.animation-text-from-left');
const imageElements = document.querySelectorAll('.animation-image');

textFromLeftElements.forEach(el => {
    const ourText = new SplitType(el, {
        types: 'chars',
    });
    el.gsapChars = ourText.chars;
});

textFromLeftElements.forEach(element => {
    textFromLeftObserver.observe(element);
});

imageElements.forEach(element => {
    imageObserver.observe(element);
});

const scrollToListener = () => {
    const scrollToElements = document.querySelectorAll('.js-scroll-to');

    scrollToElements.forEach(element => {
        element.addEventListener('click', (event) => {
            event.preventDefault();

            const target = document.querySelector(element.dataset.target || element.getAttribute('href'));
            
            const fromTop = target.offsetTop;

            window.scrollTo({
                top: fromTop,
                behavior: 'smooth',
            });
        });
    });
}

scrollToListener();