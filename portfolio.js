// This JavaScript code adds a subtle effect to the navbar when you scroll.

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Downscroll
            header.style.top = '-80px'; // Hides header
        } else {
            // Upscroll
            header.style.top = '0'; // Shows header
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });
});