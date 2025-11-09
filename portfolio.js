// script.js — typing, parallax, theme, progress bars, modal, contact

document.addEventListener('DOMContentLoaded', () => {

    // TYPING TEXT
    const typedEl = document.getElementById('typed');
    const phrases = [
        'Frontend Developer • HTML · CSS · JavaScript',
        'Building modern UI with animations',
        'Learning AI integrations & backend basics'
    ];
    let pIndex = 0,
        cIndex = 0,
        forward = true;

    function typeLoop() {
        const current = phrases[pIndex];
        if (forward) {
            cIndex++;
            typedEl.textContent = current.slice(0, cIndex);
            if (cIndex === current.length) {
                forward = false;
                setTimeout(typeLoop, 900);
                return;
            }
        } else {
            cIndex--;
            typedEl.textContent = current.slice(0, cIndex);
            if (cIndex === 0) {
                forward = true;
                pIndex = (pIndex + 1) % phrases.length;
                setTimeout(typeLoop, 300);
                return;
            }
        }
        setTimeout(typeLoop, forward ? 40 : 25);
    }
    typeLoop();

    // PARALLAX (avatar & hero floats)
    const avatar = document.getElementById('avatarWrap');
    const heroParallax = document.getElementById('heroParallax');
    const float1 = document.getElementById('float1');
    const float2 = document.getElementById('float2');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        if (avatar) avatar.style.transform = `perspective(600px) rotateX(${y*6}deg) rotateY(${x*-6}deg) translateZ(6px)`;
        if (heroParallax) heroParallax.style.transform = `translate(${x*-12}px, ${y*-8}px)`;
        if (float1) float1.style.transform = `translate(${x*-28}px, ${y*-18}px)`;
        if (float2) float2.style.transform = `translate(${x*-18}px, ${y*-10}px)`;
    });
    window.addEventListener('mouseleave', () => {
        if (avatar) avatar.style.transform = '';
        if (heroParallax) heroParallax.style.transform = '';
        if (float1) float1.style.transform = '';
        if (float2) float2.style.transform = '';
    });

    // THEME toggle (persist)
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    if (localStorage.getItem('theme') === 'light') body.classList.add('light-theme');
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeToggle.setAttribute('aria-pressed', isLight);
    });

    // animate skill bars when visible
    const skillEls = document.querySelectorAll('.skill-bar i');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const w = el.getAttribute('data-value') || '0%';
                el.style.width = w;
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.15 });
    skillEls.forEach(el => obs.observe(el));

    // PROJECT modal (3D flip feel)
    const projectEls = document.querySelectorAll('.project, .open-project');
    const modal = document.getElementById('projectModal');
    const modalCard = document.getElementById('modalCard');
    const modalFrontImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalLive = document.getElementById('modalLive');
    const modalCode = document.getElementById('modalCode');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');

    let animLock = false;

    function openProject(data) {
        if (animLock) return;
        animLock = true;
        modalFrontImg.src = data.img || '';
        modalTitle.textContent = data.title || 'Project';
        modalDesc.textContent = data.desc || '';
        modalLive.href = data.live || '#';
        modalCode.href = data.code || '#';
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        // start with rotated card then rotate to front for pop feeling
        modalCard.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
            modalCard.style.transition = 'transform 700ms cubic-bezier(.2,.9,.2,1)';
            modalCard.style.transform = 'rotateY(0deg)';
            setTimeout(() => { animLock = false; }, 750);
        }, 20);
    }

    function closeProject() {
        if (animLock) return;
        animLock = true;
        modalCard.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            modalCard.style.transition = 'none';
            modalCard.style.transform = 'rotateY(0deg)';
            animLock = false;
        }, 700);
    }

    projectEls.forEach(el => {
        el.addEventListener('click', (e) => {
            const raw = el.getAttribute('data-project');
            if (!raw) return;
            const data = JSON.parse(raw);
            openProject(data);
        });
    });
    modalBackdrop.addEventListener('click', closeProject);
    modalClose.addEventListener('click', closeProject);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProject(); });

    // CONTACT form (mock)
    const contactForm = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');
    contactForm && contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const n = document.getElementById('name').value.trim();
        const em = document.getElementById('email').value.trim();
        const msg = document.getElementById('message').value.trim();
        if (!n || !em || !msg) { formNote.textContent = 'Please fill all fields.'; return; }
        formNote.textContent = 'Message sent (mock). I will contact you soon.';
        contactForm.reset();
        setTimeout(() => formNote.textContent = '', 6000);
    });

    // smooth scroll for nav links
    document.querySelectorAll('.topnav a').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const id = a.getAttribute('href').slice(1);
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    // footer year
    document.getElementById('year').textContent = new Date().getFullYear();

}); // DOMContentLoaded