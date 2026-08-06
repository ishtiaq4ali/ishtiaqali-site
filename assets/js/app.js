/* ==========================================================
   IshtiaqAli.com
   Application Controller
   Global Website Functions
   ========================================================== */

class IAOne {

    constructor() {

        this.init();

    }

    init() {

        this.initScrollProgress();

        this.initBackToTop();

        this.initSmoothScroll();

        this.initExternalLinks();

        this.initCurrentYear();

        this.initLazyLoading();

        this.initKeyboardShortcuts();

        this.initResizeHandler();

        this.initPageLoaded();

        console.log("IshtiaqAli.com Initialized");

    }

    /* ======================================================
       Scroll Progress Bar
    ====================================================== */

    initScrollProgress() {

        const progress = document.querySelector(".scroll-progress");

        if (!progress) return;

        window.addEventListener("scroll", () => {

            const scrollTop = window.scrollY;

            const height =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const percent = (scrollTop / height) * 100;

            progress.style.width = percent + "%";

        });

    }

    /* ======================================================
       Back To Top
    ====================================================== */

    initBackToTop() {

        const button = document.querySelector(".back-to-top");

        if (!button) return;

        window.addEventListener("scroll", () => {

            if (window.scrollY > 600) {

                button.classList.add("show");

            } else {

                button.classList.remove("show");

            }

        });

        button.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /* ======================================================
       Smooth Anchor Scroll
    ====================================================== */

    initSmoothScroll() {

        document.querySelectorAll('a[href^="#"]').forEach(link => {

            link.addEventListener("click", function (e) {

                const target = document.querySelector(this.getAttribute("href"));

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            });

        });

    }

    /* ======================================================
       External Links
    ====================================================== */

    initExternalLinks() {

        document.querySelectorAll("a").forEach(link => {

            const href = link.getAttribute("href");

            if (!href) return;

            if (
                href.startsWith("http") &&
                !href.includes(window.location.hostname)
            ) {

                link.setAttribute("target", "_blank");

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        });

    }

    /* ======================================================
       Current Year
    ====================================================== */

    initCurrentYear() {

        const year = document.querySelectorAll("[data-year]");

        year.forEach(item => {

            item.textContent = new Date().getFullYear();

        });

    }

    /* ======================================================
       Lazy Loading Images
    ====================================================== */

    initLazyLoading() {

        document.querySelectorAll("img").forEach(image => {

            if (!image.hasAttribute("loading")) {

                image.setAttribute("loading", "lazy");

            }

        });

    }

    /* ======================================================
       Keyboard Shortcuts
    ====================================================== */

    initKeyboardShortcuts() {

        document.addEventListener("keydown", (event) => {

            /* Press Home */

            if (event.key === "Home") {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        });

    }

    /* ======================================================
       Window Resize
    ====================================================== */

    initResizeHandler() {

        let timer;

        window.addEventListener("resize", () => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                console.log("Viewport Updated");

            }, 200);

        });

    }

    /* ======================================================
       Page Loaded
    ====================================================== */

    initPageLoaded() {

        window.addEventListener("load", () => {

            document.body.classList.add("loaded");

        });

    }

}

/* ==========================================================
   Start Application
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    new IAOne();

});