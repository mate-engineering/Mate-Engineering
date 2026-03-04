const params = new URLSearchParams(window.location.search);
const p = proiecteDate.find(x => x.id == params.get('id'));

if (p) {
    const hasGallery = p.galerie && p.galerie.length > 0;
    const needsArrows = p.galerie && p.galerie.length > 3;

    const isMobile = window.innerWidth <= 767;

    document.getElementById('content').innerHTML = `
        ${!isMobile ? `
        <!-- Desktop: Titlul sus în header -->
        <div class="detail-header">
            <h1 class="detail-title reveal">${p.titlu}</h1>
        </div>
        ` : ''}

        <div class="main-container">
            <div class="detail-hero-img reveal">
                <img src="${p.img}" alt="${p.titlu}">
            </div>
            
            <div class="detail-sidebar reveal">
                ${isMobile ? `
                <!-- Mobile: Titlul aici, deasupra descrierii -->
                <h1 class="project-title-mobile">${p.titlu}</h1>
                ` : ''}
                
                <div class="desc-text">${p.descriere}</div>
                
                <div class="specs">
                    <div class="spec-item">
                        <div class="spec-label">Locație</div>
                        <div class="spec-value">${p.locatie || 'România'}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">An Finalizare</div>
                        <div class="spec-value">${p.an || '2024'}</div>
                    </div>
                    ${p.arhitect ? `
                    <div class="spec-item">
                        <div class="spec-label">Arhitect</div>
                        <div class="spec-value">${p.arhitect}</div>
                    </div>
                    ` : ''}
                    ${p.proiectant ? `
                    <div class="spec-item">
                        <div class="spec-label">Proiectant</div>
                        <div class="spec-value">${p.proiectant}</div>
                    </div>
                    ` : ''}
                    ${p.categorie ? `
                    <div class="spec-item">
                        <div class="spec-label">Categorie</div>
                        <div class="spec-value">${p.categorie}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>

        ${hasGallery ? `
        <div class="gallery-section">
            <h3 class="reveal" style="padding-left:7%; text-transform:uppercase; letter-spacing:3px; font-size:0.7rem; opacity:0.4; margin-bottom:20px;">
                Galerie Proiect / Arhivă Tehnică
            </h3>
            
            <div class="gallery-nav" id="nav-arrows" style="display: ${needsArrows ? 'flex' : 'none'}">
                <button class="nav-arrow" onclick="moveGallery(-1)">←</button>
                <button class="nav-arrow" onclick="moveGallery(1)">→</button>
            </div>

            <div class="carousel-container reveal" id="carousel">
                ${p.galerie.map((img) => `
                    <div class="carousel-item" onclick="openLB('${img}')">
                        <img src="${img}" loading="lazy" alt="Galerie ${p.titlu}">
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    `;

    if (isMobile) {
        document.body.classList.add('mobile-project');
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const scrollContainer = document.getElementById("carousel");
    if (scrollContainer) {
        scrollContainer.addEventListener("wheel", (evt) => {
            if (evt.deltaY !== 0) {
                evt.preventDefault();
                scrollContainer.scrollLeft += evt.deltaY * 1.5;
            }
        }, { passive: false });

        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.classList.add('dragging');
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.classList.remove('dragging');
        });

        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.classList.remove('dragging');
        });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });

        scrollContainer.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener('touchend', () => {
            isDown = false;
        });

        scrollContainer.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        }, { passive: false });
    }

    window.moveGallery = (direction) => {
        if (scrollContainer) {
            const scrollAmount = window.innerWidth <= 767 ? 280 : 480;
            scrollContainer.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (isMobile && window.navigator.userAgent.includes('iPhone')) {
        document.documentElement.style.setProperty('--safe-top', 'env(safe-area-inset-top)');
    }

    console.log('Proiect încărcat:', p.titlu, 'Mobile:', isMobile);

} else {
    document.getElementById('content').innerHTML = `
        <div style='padding: 200px 7%; text-align: center;'>
            <h2 style="font-size: 2rem; margin-bottom: 20px;">Proiectul nu a fost găsit.</h2>
            <a href='index.html#projects' style='color: var(--text); text-decoration: none; border-bottom: 2px solid var(--text); padding-bottom: 5px;'>Înapoi la portofoliu</a>
        </div>
    `;
}

function openLB(s) {
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    if (lightbox && lbImg) {
        lbImg.src = s;
        lightbox.style.display = 'flex';


        lightbox.onclick = function (e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        };
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) lightbox.style.display = 'none';
    }
});

window.addEventListener('resize', () => {
    const wasMobile = document.body.classList.contains('mobile-project');
    const isNowMobile = window.innerWidth <= 767;

    if (wasMobile !== isNowMobile) {
        location.reload();
    }
});