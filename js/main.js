const proiectePePagina = 10;
let paginaCurenta = 1;

document.getElementById("theme-toggle").onclick = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    const d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie = "theme=" + next + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
    localStorage.setItem("theme", next);
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

function afiseazaPagina(pagina) {
    const grid = document.getElementById('grid');
    if (!grid) return;
    grid.innerHTML = "";
    paginaCurenta = pagina;
    const start = (pagina - 1) * proiectePePagina;
    const vizibile = proiecteDate.slice(start, start + proiectePePagina);

    vizibile.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = "project-card";
        card.innerHTML = `
            <div class="img-box"><img src="${p.img}" loading="lazy"></div>
            <div class="project-meta">
                <span>${p.cat}</span>
                <h3>${p.titlu}</h3>
            </div>
        `;
        card.onclick = () => window.location.href = `proiect.html?id=${p.id}`;
        grid.appendChild(card);
        setTimeout(() => card.classList.add('show'), i * 50);
    });
    creazaPaginare();
}

function creazaPaginare() {
    const pag = document.getElementById('pagination');
    if (!pag) return;
    pag.innerHTML = "";
    const nrPagini = Math.ceil(proiecteDate.length / proiectePePagina);
    if (nrPagini <= 1) return;

    for (let i = 1; i <= nrPagini; i++) {
        const btn = document.createElement('div');
        btn.className = `page-num ${i === paginaCurenta ? 'active' : ''}`;
        btn.innerText = i;
        btn.onclick = () => {
            afiseazaPagina(i);
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        };
        pag.appendChild(btn);
    }
}

function afiseazaServicii() {
    const grid = document.getElementById('servicii-grid');
    if (!grid) return;

    serviciiDate.forEach((serviciu, index) => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-img-container">
                <img src="${serviciu.imagine}" alt="${serviciu.titlu}" class="service-img" loading="lazy">
            </div>
            <div class="service-content">
                <h3>${serviciu.titlu}</h3>
                <p class="service-desc">${serviciu.descriere}</p>
            </div>
        `;

        grid.appendChild(card);
        setTimeout(() => card.classList.add('show'), index * 100);
    });
}

function incarcaDateFirma() {
    const descEl = document.getElementById('descriere-firma');
    if (descEl) descEl.textContent = firmaData.descriere;

    const adresaEl = document.getElementById('contact-adresa');
    if (adresaEl) adresaEl.textContent = firmaData.adresa;

    const telefonEl = document.getElementById('contact-telefon');
    if (telefonEl) telefonEl.textContent = firmaData.telefon;

    const emailEl = document.getElementById('contact-email');
    if (emailEl) emailEl.textContent = firmaData.email;
}

function incarcaEchipa() {
    const grid = document.getElementById('team-grid');
    if (!grid) return;

    echipaData.forEach((membru, index) => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <img src="${membru.imagine}" alt="${membru.nume}" class="team-img" loading="lazy">
            <h4>${membru.nume}</h4>
            <p>${membru.functie}</p>
        `;
        grid.appendChild(card);
        setTimeout(() => card.classList.add('show'), index * 100);
    });
}

function loadContact() {
    if (document.getElementById('contact-adresa'))
        document.getElementById('contact-adresa').innerText = firmaData.adresa;
    if (document.getElementById('contact-email'))
        document.getElementById('contact-email').innerText = firmaData.email;
    if (document.getElementById('contact-telefon'))
        document.getElementById('contact-telefon').innerText = firmaData.telefon;

    const socialContainer = document.getElementById('social-links');
    if (socialContainer) {
        socialContainer.innerHTML = '';

        firmaData.social.forEach(platforma => {
            const link = document.createElement('a');
            link.href = platforma.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            link.innerHTML = `
                <i class="${platforma.icon}"></i>
                <span>${platforma.nume}</span>
            `;

            socialContainer.appendChild(link);
        });
    }
}

function scrollToSection(sectionId) {
    const sectionMap = {
        'home': '#home',
        'servicii': '#servicii',
        'despre': '#despre',
        'projects': '#projects',
        'contact': '#contact'
    };

    const targetSection = document.querySelector(sectionMap[sectionId] || '#' + sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    afiseazaServicii();
    afiseazaPagina(1);
    incarcaDateFirma();
    incarcaEchipa();
    loadContact();

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const onclickAttr = this.getAttribute('onclick');
            const match = onclickAttr.match(/'#([^']+)'/);
            if (match && match[1]) {
                scrollToSection(match[1]);
            }
        });
    });

    const snapContainer = document.querySelector('.snap-container');
    if (snapContainer) {
        snapContainer.style.webkitOverflowScrolling = 'touch';
    }

    let scrollTimeout;
    snapContainer?.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
        }, 100);
    });
});

window.addEventListener('load', loadContact);
document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth <= 767) {
        const navbar = document.getElementById('mobile-nav') || document.querySelector('nav');
        const navbarHeight = navbar ? navbar.offsetHeight : 60;

        const style = document.createElement('style');
        style.innerHTML = `
                section#contact {
                    padding-bottom: ${navbarHeight + 30}px !important;
                }
            `;
        document.head.appendChild(style);
    }
});

window.addEventListener('resize', function () {
    if (window.innerWidth <= 767) {
        const navbar = document.getElementById('mobile-nav') || document.querySelector('nav');
        const navbarHeight = navbar ? navbar.offsetHeight : 60;

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.style.paddingBottom = (navbarHeight + 30) + 'px';
        }
    }
});
