const params = new URLSearchParams(window.location.search);
const p = proiecteDate.find(x => x.id == params.get('id'));

if (p) {
    const hasGallery = p.galerie && p.galerie.length > 0;
    const needsArrows = p.galerie && p.galerie.length > 3;

    document.getElementById('content').innerHTML = `
        <div class="detail-header">
            <h1 class="detail-title reveal">${p.titlu}</h1>
        </div>

        <div class="main-container">
            <div class="detail-hero-img reveal">
                <img src="${p.img}" alt="${p.titlu}">
            </div>
            
            <div class="detail-sidebar reveal">
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
                </div>
            </div>
        </div>

        ${hasGallery ? `
        <div class="gallery-section">
            <h3 style="padding-left:7%; text-transform:uppercase; letter-spacing:3px; font-size:0.7rem; opacity:0.4; margin-bottom:20px;">
                Galerie Proiect / Arhivă Tehnică
            </h3>
            
            <div class="gallery-nav" id="nav-arrows" style="display: ${needsArrows ? 'flex' : 'none'}">
                <button class="nav-arrow" onclick="moveGallery(-1)">←</button>
                <button class="nav-arrow" onclick="moveGallery(1)">→</button>
            </div>

            <div class="carousel-container" id="carousel">
                ${p.galerie.map((img) => `
                    <div class="carousel-item" onclick="openLB('${img}')">
                        <img src="${img}">
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    `;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const scrollContainer = document.getElementById("carousel");
    if(scrollContainer) {
        scrollContainer.addEventListener("wheel", (evt) => {
            if (evt.deltaY !== 0) {
                evt.preventDefault();
                scrollContainer.scrollLeft += evt.deltaY * 1.5;
            }
        }, { passive: false });

        let isDown = false, startX, scrollLeft;
        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.style.cursor = 'grabbing';
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });
        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });
        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            scrollContainer.scrollLeft = scrollLeft - (x - startX) * 2;
        });
    }

    window.moveGallery = (direction) => {
        scrollContainer.scrollBy({ left: direction * 480, behavior: 'smooth' });
    };
} else {
    document.getElementById('content').innerHTML = `
        <div style='padding: 200px 7%;'>
            <h2>Proiectul nu a fost găsit.</h2>
            <a href='index.html' style='color: var(--text);'>Înapoi la portofoliu</a>
        </div>
    `;
}

function openLB(s) {
    document.getElementById('lb-img').src = s;
    document.getElementById('lightbox').style.display = 'flex';
}