
document.addEventListener('DOMContentLoaded', function () {

    // ── 1. DYNAMIC HERO SKILLS TEXT ──────────────────────────────
    const heroSkills = [
        "Web Developer",
        "Software Developer",
        "Android Developer",
        "UI/UX Designer",
        "Full Stack Developer",
        "Electronics Enthusiast"
    ];

    let heroSkillIndex = 0;
    const dynamicChip = document.getElementById('dynamic-chip');

    function changeHeroSkill() {
        if (!dynamicChip) return;
        dynamicChip.classList.add('fade-out');
        setTimeout(() => {
            heroSkillIndex = (heroSkillIndex + 1) % heroSkills.length;
            dynamicChip.textContent = heroSkills[heroSkillIndex];
            dynamicChip.className = heroSkillIndex % 2 === 0 ? 'neon-cyan' : 'neon-green';
        }, 500);
    }
    setInterval(changeHeroSkill, 3000);


    // ── 2. MOBILE HAMBURGER MENU ─────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            // Prevent body scroll when menu open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    window.closeMenu = function () {
        if (mobileMenu) mobileMenu.classList.remove('open');
        if (hamburger) hamburger.classList.remove('open');
        document.body.style.overflow = '';
    };


    // ── 3. SCROLL REVEAL ─────────────────────────────────────────
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 70);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    reveals.forEach(el => revealObserver.observe(el));


    // ── 4. ACTIVE NAV LINK ───────────────────────────────────────
    const sections   = document.querySelectorAll('section[id]');
    const navLinks   = document.querySelectorAll('.nav-links a');
    const navbar     = document.getElementById('navbar');

    function updateActiveLink() {
        let currentId = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) {
                currentId = sec.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${currentId}`
            );
        });
    }

    // Click sets active immediately
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink(); // run once on load


    // ── 5. NAVBAR SCROLL SHADOW ──────────────────────────────────
    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });


    // ── 6. BACK TO TOP BUTTON ─────────────────────────────────────
    const backTop = document.getElementById('backTop');
    if (backTop) {
        window.addEventListener('scroll', () => {
            backTop.classList.toggle('show', window.scrollY > 400);
        }, { passive: true });
        backTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // ── 7. CONTACT FORM ──────────────────────────────────────────
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('.btn-send');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #38ff4f)';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }


    // ── 8. FLOATING PARTICLES (hero bg) ──────────────────────────
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        for (let i = 0; i < 18; i++) {
            const p = document.createElement('div');
            p.style.cssText = `
                position: absolute;
                border-radius: 50%;
                opacity: ${Math.random() * 0.25 + 0.05};
                width:  ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: ${Math.random() > 0.5 ? '#00ffea' : '#6366f1'};
                left:   ${Math.random() * 100}%;
                top:    ${Math.random() * 100}%;
                animation: float-p ${Math.random() * 8 + 6}s ease-in-out ${Math.random() * 4}s infinite alternate;
                pointer-events: none;
            `;
            particleContainer.appendChild(p);
        }
        // Inject keyframe if not present
        if (!document.getElementById('particle-kf')) {
            const style = document.createElement('style');
            style.id = 'particle-kf';
            style.textContent = `
                @keyframes float-p {
                    from { transform: translateY(0) translateX(0); }
                    to   { transform: translateY(-40px) translateX(20px); }
                }
                #particles { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
            `;
            document.head.appendChild(style);
        }
    }

}); // end DOMContentLoaded


// ── 9. PROJECT DETAILS TOGGLE ────────────────────────────────────
function toggleDetails(btn) {
    const details = btn.nextElementSibling;
    const isOpen  = details.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.querySelector('i').style.transform = isOpen ? 'rotate(180deg)' : '';
}

// Education toggle
function eduTog(btn) {
    btn.classList.toggle('open');
    btn.nextElementSibling.classList.toggle('open');
}
