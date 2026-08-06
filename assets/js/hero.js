/* ==========================================================
   IshtiaqAli.com
   Hero Controller
   Premium Hero Interactions
   ========================================================== */

class Hero {

    constructor() {

        this.hero = document.querySelector(".hero");

        if (!this.hero) return;

        this.init();

    }

    init() {

        this.initCounters();

        this.initParallax();

        this.initCTA();

        this.initScrollIndicator();

    }

    /* ======================================================
       Animated Counters
    ====================================================== */

    initCounters() {

        const counters = document.querySelectorAll("[data-counter]");

        if (!counters.length) return;

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                this.animateCounter(entry.target);

                observer.unobserve(entry.target);

            });

        }, {
            threshold: .5
        });

        counters.forEach(counter => observer.observe(counter));

    }

    animateCounter(element) {

        const target = parseInt(element.dataset.counter);

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 120));

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            element.textContent = current.toLocaleString();

        }, 16);

    }

    /* ======================================================
       Mouse Parallax
    ====================================================== */

    initParallax() {

        const layers = document.querySelectorAll("[data-parallax]");

        if (!layers.length) return;

        this.hero.addEventListener("mousemove", e => {

            const x = (e.clientX / window.innerWidth - .5) * 20;

            const y = (e.clientY / window.innerHeight - .5) * 20;

            layers.forEach(layer => {

                const speed = layer.dataset.parallax || 5;

                layer.style.transform =
                    `translate(${x / speed}px, ${y / speed}px)`;

            });

        });

    }

    /* ======================================================
       CTA Hover Effect
    ====================================================== */

    initCTA() {

        const buttons = document.querySelectorAll(".hero .btn");

        buttons.forEach(button => {

            button.addEventListener("mouseenter", () => {

                button.style.transform = "translateY(-3px) scale(1.02)";

            });

            button.addEventListener("mouseleave", () => {

                button.style.transform = "";

            });

        });

    }

    /* ======================================================
       Scroll Indicator
    ====================================================== */

    initScrollIndicator() {

        const indicator = document.querySelector(".scroll-indicator");

        if (!indicator) return;

        indicator.addEventListener("click", () => {

            const nextSection = this.hero.nextElementSibling;

            if (!nextSection) return;

            nextSection.scrollIntoView({

                behavior: "smooth"

            });

        });

    }

}

document.addEventListener("DOMContentLoaded", () => {

    new Hero();

});