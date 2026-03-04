
const proiectePePagina = 8;
let paginaCurenta = 1;

const serviciiPePagina = 8;
let paginaCurentaServicii = 1;

const echipaPePagina = 5;
let paginaCurentaEchipa = 1;

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
            <div class="img-box"><img src="${p.img}" loading="lazy" alt="${p.titlu}"></div>
            <div class="project-meta">
                <span>${p.cat || 'Proiect'}</span>
                <h3>${p.titlu}</h3>
            </div>
        `;
        card.onclick = () => window.location.href = `proiect.html?id=${p.id}`;
        grid.appendChild(card);
        setTimeout(() => card.classList.add('show'), i * 50);
    });

    creazaPaginareProiecte();
}

function creazaPaginareProiecte() {
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

function afiseazaServiciiPagina(pagina) {
    const grid = document.getElementById('servicii-grid');
    if (!grid) return;

    grid.innerHTML = "";
    paginaCurentaServicii = pagina;
    const start = (pagina - 1) * serviciiPePagina;
    const vizibile = serviciiDate.slice(start, start + serviciiPePagina);

    vizibile.forEach((serviciu, index) => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-img-container">
                <img src="${serviciu.imagine}" alt="${serviciu.titlu}" class="service-img" loading="lazy">
            </div>
            <div class="service-content">
                <h3>${serviciu.titlu}</h3>
                <p class="service-desc">${serviciu.descriereScurta}</p>
            </div>
        `;
        card.onclick = () => window.location.href = `serviciu.html?id=${serviciu.id}`;
        grid.appendChild(card);
        setTimeout(() => card.classList.add('show'), index * 100);
    });

    creazaPaginareServicii();
}

function creazaPaginareServicii() {
    let pagServicii = document.getElementById('pagination-servicii');

    if (!pagServicii) {
        pagServicii = document.createElement('div');
        pagServicii.id = 'pagination-servicii';
        pagServicii.className = 'pagination-controls';

        const grid = document.getElementById('servicii-grid');
        if (grid && grid.parentNode) {
            grid.parentNode.insertBefore(pagServicii, grid.nextSibling);
        }
    }

    pagServicii.innerHTML = "";
    const nrPagini = Math.ceil(serviciiDate.length / serviciiPePagina);
    if (nrPagini <= 1) return;

    for (let i = 1; i <= nrPagini; i++) {
        const btn = document.createElement('div');
        btn.className = `page-num ${i === paginaCurentaServicii ? 'active' : ''}`;
        btn.innerText = i;
        btn.onclick = () => {
            afiseazaServiciiPagina(i);
            document.getElementById('servicii').scrollIntoView({ behavior: 'smooth' });
        };
        pagServicii.appendChild(btn);
    }
}

function afiseazaEchipaPagina(pagina) {
    const grid = document.getElementById('team-grid');
    if (!grid) return;

    grid.innerHTML = "";
    paginaCurentaEchipa = pagina;
    const start = (pagina - 1) * echipaPePagina;
    const vizibile = echipaData.slice(start, start + echipaPePagina);

    vizibile.forEach((membru, index) => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <img src="${membru.imagine}" alt="${membru.nume}" class="team-img" loading="lazy">
            <div class="team-info">
                <h4>${membru.nume}</h4>
                <p>${membru.functie}</p>
            </div>
        `;
        grid.appendChild(card);
        setTimeout(() => card.classList.add('show'), index * 100);
    });

    creazaPaginareEchipa();
}

function creazaPaginareEchipa() {
    let pagEchipa = document.getElementById('pagination-echipa');

    if (!pagEchipa) {
        pagEchipa = document.createElement('div');
        pagEchipa.id = 'pagination-echipa';
        pagEchipa.className = 'pagination-controls';

        const grid = document.getElementById('team-grid');
        if (grid && grid.parentNode) {
            grid.parentNode.insertBefore(pagEchipa, grid.nextSibling);
        }
    }

    pagEchipa.innerHTML = "";
    const nrPagini = Math.ceil(echipaData.length / echipaPePagina);
    if (nrPagini <= 1) return;

    for (let i = 1; i <= nrPagini; i++) {
        const btn = document.createElement('div');
        btn.className = `page-num ${i === paginaCurentaEchipa ? 'active' : ''}`;
        btn.innerText = i;
        btn.onclick = () => {
            afiseazaEchipaPagina(i);
            document.getElementById('echipa').scrollIntoView({ behavior: 'smooth' });
        };
        pagEchipa.appendChild(btn);
    }
}

function afiseazaCaruselServicii() {
    const grid = document.getElementById('servicii-grid');
    if (!grid || window.innerWidth > 767) return;

    grid.innerHTML = "";

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
        card.onclick = () => window.location.href = `serviciu.html?id=${serviciu.id}`;
        grid.appendChild(card);
    });

    setTimeout(() => updateScrollDots('servicii'), 200);
}

function afiseazaCaruselEchipa() {
    const grid = document.getElementById('team-grid');
    if (!grid || window.innerWidth > 767) return;

    grid.innerHTML = "";

    echipaData.forEach((membru, index) => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <img src="${membru.imagine}" alt="${membru.nume}" class="team-img" loading="lazy">
            <div class="team-info">
                <h4>${membru.nume}</h4>
                <p>${membru.functie}</p>
            </div>
        `;
        grid.appendChild(card);
    });

    setTimeout(() => updateScrollDots('echipa'), 200);
}

function afiseazaCaruselProiecte() {
    const grid = document.getElementById('grid');
    if (!grid || window.innerWidth > 767) return;

    grid.innerHTML = "";

    proiecteDate.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = "project-card";
        card.innerHTML = `
            <div class="img-box"><img src="${p.img}" loading="lazy" alt="${p.titlu}"></div>
            <div class="project-meta">
                <span>${p.cat || 'Proiect'}</span>
                <h3>${p.titlu}</h3>
            </div>
        `;
        card.onclick = () => window.location.href = `proiect.html?id=${p.id}`;
        grid.appendChild(card);
    });

    setTimeout(() => updateScrollDots('projects'), 200);
}

function incarcaDateFirma() {
    if (typeof firmaData !== 'undefined') {
        const descEl = document.getElementById('descriere-firma');
        if (descEl) descEl.textContent = firmaData.descriere || "Suntem o echipă de ingineri pasionați, dedicați inovației și excelenței tehnice. Cu peste 10 ani de experiență în industrie, oferim soluții personalizate pentru provocări tehnice complexe.";

        const adresaEl = document.getElementById('contact-adresa');
        if (adresaEl) adresaEl.textContent = firmaData.adresa || "Strada Ingineriei 123, București";

        const telefonEl = document.getElementById('contact-telefon');
        if (telefonEl) telefonEl.textContent = firmaData.telefon || "+40 123 456 789";

        const emailEl = document.getElementById('contact-email');
        if (emailEl) emailEl.textContent = firmaData.email || "office@mate-engineering.ro";
    }
}

function loadContact() {
    if (typeof firmaData !== 'undefined') {
        if (document.getElementById('contact-adresa'))
            document.getElementById('contact-adresa').innerText = firmaData.adresa || "Strada Ingineriei 123, București";
        if (document.getElementById('contact-email'))
            document.getElementById('contact-email').innerText = firmaData.email || "office@mate-engineering.ro";
        if (document.getElementById('contact-telefon'))
            document.getElementById('contact-telefon').innerText = firmaData.telefon || "+40 123 456 789";

        const socialContainer = document.getElementById('social-links');
        if (socialContainer && firmaData.social) {
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

function updateScrollDots(sectionId) {
    if (window.innerWidth > 767) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    let container, indicator;

    if (sectionId === 'servicii') {
        container = section.querySelector('.services-grid');
        indicator = section.querySelector('#servicii-scroll-indicator');
    } else if (sectionId === 'echipa') {
        container = section.querySelector('.team-grid');
        indicator = section.querySelector('#team-scroll-indicator');
    } else if (sectionId === 'projects') {
        container = section.querySelector('.projects-container');
        indicator = section.querySelector('#projects-scroll-indicator');
    }

    if (!container || !indicator || container.children.length === 0) return;

    indicator.style.position = 'relative';
    indicator.style.bottom = 'auto';
    indicator.style.marginTop = '10px';

    const cardWidth = container.children[0].clientWidth || 260;
    const gap = 12;
    const totalDots = container.children.length;

    indicator.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('span');
        dot.className = 'scroll-dot';
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;

        dot.addEventListener('click', function () {
            const scrollAmount = i * (cardWidth + gap);
            container.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        indicator.appendChild(dot);
    }

    const onScroll = () => {
        const scrollLeft = container.scrollLeft;
        const activeIndex = Math.round(scrollLeft / (cardWidth + gap));

        const dots = indicator.querySelectorAll('.scroll-dot');
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    container.removeEventListener('scroll', onScroll);
    container.addEventListener('scroll', onScroll, { passive: true });
}

function handleResize() {
    if (window.innerWidth <= 767) {
        afiseazaCaruselServicii();
        afiseazaCaruselEchipa();
        afiseazaCaruselProiecte();
        
        const paginari = document.querySelectorAll('.pagination-controls');
        paginari.forEach(p => p.style.display = 'none');
    } else {
        afiseazaServiciiPagina(paginaCurentaServicii);
        afiseazaPagina(paginaCurenta);
        afiseazaEchipaPagina(paginaCurentaEchipa);
        
        const paginari = document.querySelectorAll('.pagination-controls');
        paginari.forEach(p => p.style.display = 'flex');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    incarcaDateFirma();
    loadContact();
    handleResize();

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const onclickAttr = this.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/'#([^']+)'/);
                if (match && match[1]) {
                    scrollToSection(match[1]);
                }
            }
        });
    });

    const snapContainer = document.querySelector('.snap-container');
    if (snapContainer) {
        snapContainer.style.webkitOverflowScrolling = 'touch';
    }

    setupCarouselDrag();
});

function setupCarouselDrag() {
    const carousels = ['.services-grid', '.team-grid', '.projects-container'];
    
    carousels.forEach(selector => {
        const container = document.querySelector(selector);
        if (!container) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            if (window.innerWidth > 767) return;
            isDown = true;
            container.classList.add('dragging');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('dragging');
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('dragging');
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown || window.innerWidth > 767) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });

        container.addEventListener('touchstart', (e) => {
            if (window.innerWidth > 767) return;
            isDown = true;
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('touchend', () => {
            isDown = false;
        });

        container.addEventListener('touchmove', (e) => {
            if (!isDown || window.innerWidth > 767) return;
            e.preventDefault();
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        }, { passive: false });
    });
}

window.addEventListener('resize', () => {
    handleResize();
});