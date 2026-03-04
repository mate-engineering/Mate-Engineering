const params = new URLSearchParams(window.location.search);
const s = serviciiDate.find(x => x.id == params.get('id'));

if (s) {
    const isMobile = window.innerWidth <= 767;
    
    document.title = `Mate Engineering - ${s.titlu}`;
    
    document.getElementById('service-title-desktop').textContent = s.titlu;
    document.getElementById('service-title-mobile').textContent = s.titlu;
    
    document.getElementById('service-image').src = s.imagine;
    document.getElementById('service-image').alt = s.titlu;
    
    document.getElementById('service-category').textContent = s.categorie || 'Inginerie';
    
    document.getElementById('service-description').innerHTML = s.descriereLunga || s.descriereScurta || s.descriere || 'Descriere detaliată în curând';
    
    const specsHTML = `
        <div class="spec-item">
            <div class="spec-label">Categorie</div>
            <div class="spec-value">${s.categorie || 'Inginerie'}</div>
        </div>
        <div class="spec-item">
            <div class="spec-label">Locație</div>
            <div class="spec-value">${s.locatie || 'București'}</div>
        </div>
    `;
    document.getElementById('service-specs').innerHTML = specsHTML;
    
    if (s.caracteristici && s.caracteristici.length > 0) {
        document.getElementById('caracteristici-section').style.display = 'block';
        const list = document.getElementById('caracteristici-list');
        list.innerHTML = s.caracteristici.map(c => 
            `<div class="feature-card">${c}</div>`
        ).join('');
    }
    
    if (s.tehnologii && s.tehnologii.length > 0) {
        document.getElementById('tehnologii-section').style.display = 'block';
        const list = document.getElementById('tehnologii-list');
        list.innerHTML = s.tehnologii.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
    }
    
    if (s.proces && s.proces.length > 0) {
        document.getElementById('proces-section').style.display = 'block';
        const list = document.getElementById('proces-list');
        list.innerHTML = s.proces.map((step, index) => `
            <div class="process-step">
                <div class="step-number">${String(index + 1).padStart(2, '0')}</div>
                <div class="step-content">
                    <h4>${step.etapa || step.titlu || ''}</h4>
                    <p>${step.descriere || step.desc || ''}</p>
                </div>
            </div>
        `).join('');
    }
    
    if (s.beneficii && s.beneficii.length > 0) {
        document.getElementById('beneficii-section').style.display = 'block';
        const list = document.getElementById('beneficii-list');
        list.innerHTML = s.beneficii.map(b => 
            `<div class="benefit-card">${b}</div>`
        ).join('');
    }
    
    if (s.galerie && s.galerie.length > 0) {
        document.getElementById('galerie-section').style.display = 'block';
        const carousel = document.getElementById('carousel');
        carousel.innerHTML = s.galerie.map(img => `
            <div class="carousel-item" onclick="openLB('${img}')">
                <img src="${img}" loading="lazy" alt="Galerie ${s.titlu}">
                <div class="carousel-caption">Click pentru mărire</div>
            </div>
        `).join('');
        
        if (s.galerie.length <= 3) {
            document.getElementById('nav-arrows').style.display = 'none';
        }
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

    window.openLB = function(src) {
        const lightbox = document.getElementById('lightbox');
        const lbImg = document.getElementById('lb-img');
        if (lightbox && lbImg) {
            lbImg.src = src;
            lightbox.style.display = 'flex';
            lightbox.onclick = function (e) {
                if (e.target === lightbox) {
                    lightbox.style.display = 'none';
                }
            };
        }
    };

    if (isMobile) {
        document.body.classList.add('mobile-service');
    }

    console.log('Serviciu încărcat:', s.titlu);

} else {
  
    document.getElementById('content').innerHTML = `
        <div class="error-page">
            <h2>Serviciul nu a fost găsit.</h2>
            <a href="index.html#servicii" class="back-link">← Înapoi la servicii</a>
        </div>
    `;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) lightbox.style.display = 'none';
    }
});

window.addEventListener('resize', () => {
    const wasMobile = document.body.classList.contains('mobile-service');
    const isNowMobile = window.innerWidth <= 767;

    if (wasMobile !== isNowMobile) {
        location.reload();
    }
});