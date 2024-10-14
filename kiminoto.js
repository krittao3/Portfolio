
const typed = new Typed('.multiple-text', {
    strings: ['Handsome', 'Web Developer', 'UI/UX Designer', 'Fullstack Developer'],
    typeSpeed: 75,
    backSpeed: 95,
    backDelay: 100,
    loop: true
});


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};
