document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel-section");

    carousels.forEach((carousel) => {
        const track = carousel.querySelector(".carousel-track");
        const prevBtn = carousel.querySelector(".carousel-arrow-icon:first-child");
        const nextBtn = carousel.querySelector(".carousel-arrow-icon:last-child");

        let scrollAmount = 0;
        let startX = 0;
        let isDragging = false;
        let isUserInteracting = false;
        let autoScrollInterval;
        let cardWidth = 270;

        // 1. Clone carousel items for seamless looping
        const cards = [...track.children];
        cards.forEach((card) => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });

        // 2. Update card width
        const updateCardWidth = () => {
            const card = track.querySelector(".carousel-card");
            if (card) {
                const style = getComputedStyle(card);
                const margin = parseInt(style.marginRight) || 20;
                cardWidth = card.offsetWidth + margin;
            }
        };

        updateCardWidth();
        window.addEventListener("resize", updateCardWidth);

        // 3. Scroll update function
        const updateTransform = () => {
            track.style.transform = `translateX(-${scrollAmount}px)`;
        };

        // 4. Manual interaction: arrow buttons
        prevBtn.addEventListener("click", () => {
            scrollAmount = Math.max(scrollAmount - cardWidth, 0);
            updateTransform();
            pauseAutoScroll();
        });

        nextBtn.addEventListener("click", () => {
            scrollAmount += cardWidth;
            updateTransform();
            pauseAutoScroll();
        });

        // 5. Touch/swipe
        track.addEventListener("touchstart", (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            pauseAutoScroll();
        });

        track.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;

            if (Math.abs(diff) > 50) {
                diff > 0 ? nextBtn.click() : prevBtn.click();
                isDragging = false;
            }
        });

        track.addEventListener("touchend", () => {
            isDragging = false;
        });

        // 6. Auto-scroll logic (seamless + smooth)
        const startAutoScroll = () => {
            stopAutoScroll();
            autoScrollInterval = setInterval(() => {
                scrollAmount += 1;
                const totalScrollWidth = track.scrollWidth / 2;

                if (scrollAmount >= totalScrollWidth) {
                    scrollAmount = 0; // Reset invisibly — because content is duplicated
                    track.style.transition = "none";
                    track.style.transform = `translateX(0px)`;
                    // Wait a frame, then resume smooth scrolling
                    requestAnimationFrame(() => {
                        track.style.transition = "transform 0.3s linear";
                    });
                } else {
                    track.style.transition = "transform 0.3s linear";
                    updateTransform();
                }
            }, 16); // ~60fps
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        const pauseAutoScroll = () => {
            isUserInteracting = true;
            stopAutoScroll();
            clearTimeout(track._pauseTimeout);
            track._pauseTimeout = setTimeout(() => {
                isUserInteracting = false;
                startAutoScroll();
            }, 3000);
        };

        track.addEventListener("mousedown", pauseAutoScroll);

        // Start scrolling
        startAutoScroll();
    });
});





document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".mobile-nav-toggle");
    const nav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav a");
    const sections = document.querySelectorAll("section[id]");

    // 1. Toggle mobile nav
    if (toggleBtn && nav) {
        toggleBtn.addEventListener("click", function () {
            nav.classList.toggle("active-nav");
        });
    }

    // 2. Smooth scroll and close nav
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = 80; // Adjust this based on your header height
                    const top = target.offsetTop - offset;

                    window.scrollTo({
                        top: top,
                        behavior: "smooth"
                    });

                    // Close nav on mobile
                    nav.classList.remove("active-nav");
                }
            }
        });
    });

    // 3. Highlight active nav link while scrolling
    const highlightOnScroll = () => {
        const scrollY = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100; // offset for fixed header
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("nav-link-active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("nav-link-active");
                    }
                });
            }
        });
    };

    window.addEventListener("scroll", highlightOnScroll);
    highlightOnScroll(); // run once on load in case user is halfway down
});







document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.acord-tab');
    const panels = document.querySelectorAll('.acord-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Deactivate all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Hide all panels
            panels.forEach(p => p.classList.remove('active'));

            // Activate this tab
            this.classList.add('active');
            // Show corresponding panel
            const targetId = this.getAttribute('data-tab');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});


