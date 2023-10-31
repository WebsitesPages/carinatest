// Funktion zum Registrieren der Event-Listener für einen bestimmten Header
function registerHeaderEventListeners(header) {
    const menuIcon = header.querySelector('.menu-icon');
    const menu = header.querySelector('.menu');
    const closeIcon = header.querySelector('.close-icon');
    const menuItems = header.querySelectorAll('.menu li a');
    
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.add('no-scroll');

    });

    closeIcon.addEventListener('click', () => {
        menuIcon.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('no-scroll');

    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menu.classList.contains('active')) {
            menuIcon.classList.remove('active');
            menu.classList.remove('active');
        }
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuIcon.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // Smooth scrolling für Anker-Links
    header.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            let target = document.querySelector(this.getAttribute('href'));
            if (target) {
                let headerHeight = header.offsetHeight;
                let targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: targetPosition - headerHeight - parseInt(getComputedStyle(target).marginTop),
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header visibility
window.addEventListener('DOMContentLoaded', (event) => {
    const originalHeader = document.getElementById('myHeader');
    let clonedHeader = originalHeader.cloneNode(true);
    clonedHeader.id = 'stickyHeader';
    clonedHeader.classList.add('sticky');
    document.body.appendChild(clonedHeader);

    // Registrieren Sie die Event-Listener für beide Header
    registerHeaderEventListeners(originalHeader);
    registerHeaderEventListeners(clonedHeader);
});

// Aktualisieren Sie Ihren Scroll-Event-Listener, um den neuen Header anzuzeigen/zu verbergen
window.addEventListener('scroll', function () {
    let stickyHeader = document.getElementById('stickyHeader');
    let menuIcon = stickyHeader.querySelector('.menu-icon');
    
    if (window.pageYOffset > 100) {
        stickyHeader.style.visibility = "visible";
        stickyHeader.style.opacity = "1";
        menuIcon.classList.add('menu-icon-raised');  // Hinzufügen der Klasse
    } 
    else {
        stickyHeader.style.visibility = "hidden";
        stickyHeader.style.opacity = "0";
        menuIcon.classList.remove('menu-icon-raised');  // Entfernen der Klasse
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        let target = document.querySelector(this.getAttribute('href'));
        if (target) {
            let headerHeight = document.getElementById('myHeader').offsetHeight;
            let targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - headerHeight - parseInt(getComputedStyle(target).marginTop),
                behavior: 'smooth'
            });
        }
    });
});







let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.20
};

let callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);

            let pElement = entry.target.querySelector('.ramo');
            if (pElement) {
                let originalHTML = pElement.innerHTML;
                let div = document.createElement('div');
                div.innerHTML = originalHTML;

                let index = 0;
                let textNodes = Array.from(div.childNodes);
                pElement.innerHTML = '';

                function typeText() {
                    if (index < textNodes.length) {
                        let node = textNodes[index];
                        if (node.nodeType === 3) { // Text node
                            let text = node.nodeValue;
                            let textIndex = 0;

                            function typeSubText() {
                                if (textIndex < text.length) {
                                    pElement.appendChild(document.createTextNode(text[textIndex]));
                                    textIndex++;
                                    setTimeout(typeSubText, 1);
                                } else {
                                    index++;
                                    typeText();
                                }
                            }

                            typeSubText();
                        } else { // HTML element like <br>
                            pElement.appendChild(node.cloneNode(true));
                            index++;
                            setTimeout(typeText, 1);
                        }
                    }
                }

                typeText();
            }
        }
    });
};

let observer = new IntersectionObserver(callback, options);

document.querySelectorAll('.obser').forEach(elem => {
    observer.observe(elem);
});





document.addEventListener('DOMContentLoaded', (event) => {
//Welchselnder Text am Anfang
const slantedContainers = document.querySelectorAll('.banner2');

slantedContainers.forEach(container => {
    const texts = container.querySelectorAll('.centered-text');
    const dots = container.querySelectorAll('.pagination-dot');
    let currentIndex = 0;
    let timer = setInterval(slideTexts, 10000000);
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    let maxHeight = 0;

    function calculateMaxHeight() {
        let maxHeight = 0;
        texts.forEach((textElement) => {
          if (textElement.offsetHeight > maxHeight) {
            maxHeight = textElement.offsetHeight;
          }
        });
      
        // 2rem in Pixel umrechnen (angenommen, dass 1rem = 16px)
        const additionalHeight = 2 * 30; // Sie können den Wert 16 durch den tatsächlichen Wert von 1rem ersetzen, falls er anders ist.
      
        // Setzen Sie die min-height des .centered-text-container auf die maximale Höhe plus 2rem
        const container = document.querySelector('.centered-text-container');
        container.style.minHeight = `${maxHeight + additionalHeight}px`;
      }

    // Maximale Höhe einmalig berechnen
    calculateMaxHeight();
    texts[0].classList.add('active');
    dots[0].classList.add('active');
    function slideTexts() {
        clearInterval(timer);
        texts[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % texts.length;
        texts[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        timer = setInterval(slideTexts, 10000000);
    }

    function slidePreviousTexts() {
        clearInterval(timer);
        texts[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + texts.length) % texts.length;
        texts[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        timer = setInterval(slideTexts, 10000000);
    }

    container.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, false);

    container.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
        const deltaX = Math.abs(touchEndX - touchStartX);
        const deltaY = Math.abs(touchEndY - touchStartY);

        if (deltaX > 50 && deltaY < 50) {
            handleSwipe();
        }
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX) {
            slideTexts();
        }
        if (touchEndX > touchStartX) {
            slidePreviousTexts();
        }
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(timer);
            texts[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            currentIndex = index;
            texts[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
            timer = setInterval(slideTexts, 10000000);
        });
    });
window.addEventListener('resize', () => {
  calculateMaxHeight();
});
});


});



const stickySections = [...document.querySelectorAll('.stickytest')];
let images =[
]

images.forEach (img => {
    stickySections.forEach(section=> {


          // Erstellen Sie ein div-Element als Container
          let containerDiv = document.createElement('div');
          containerDiv.className = 'img-container';
  
          
  
          // Erstellen Sie das Bild
          let image = document.createElement('img');
          image.src = img;
  
          // Fügen Sie die Überschrift, den Text und das Bild dem Container hinzu
          containerDiv.appendChild(heading);
          containerDiv.appendChild(text);
          containerDiv.appendChild(image);
  
          // Fügen Sie den Container dem scroll_section-Element hinzu
          section.querySelector(".scroll_section").appendChild(containerDiv);
    })
})


window.addEventListener('scroll', (e) => {
    for(let i = 0; i < stickySections.length; i++){
        transform(stickySections[i]);
    }

});




function transform(section){
    const offsetTop = section.parentElement.offsetTop;
    const scrollSection = section.querySelector('.scroll_section');
    
    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    const maxPercentage = 200; // Da Sie jetzt 3 Bilder haben
    percentage = percentage < 0 ? 0 : percentage > maxPercentage ? maxPercentage : percentage; 
    scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`;
}


window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax-image');
    const scrolled = window.scrollY;
    parallax.style.transform = 'translateY(' + (scrolled * 0.1) + 'px)'; // 0.5 bestimmt die Geschwindigkeit des Parallax-Effekts
});
window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax-image2');
    const scrolled = window.scrollY;
    parallax.style.transform = 'translateY(' + (scrolled * 0.2) + 'px)'; // 0.5 bestimmt die Geschwindigkeit des Parallax-Effekts
});
window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax-image3');
    const scrolled = window.scrollY;
    parallax.style.transform = 'translateY(' + (scrolled * 0.2) + 'px)'; // 0.5 bestimmt die Geschwindigkeit des Parallax-Effekts
});
window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax-image4');
    const scrolled = window.scrollY;
    parallax.style.transform = 'translateY(' + (scrolled * 0.2) + 'px)'; // 0.5 bestimmt die Geschwindigkeit des Parallax-Effekts
});