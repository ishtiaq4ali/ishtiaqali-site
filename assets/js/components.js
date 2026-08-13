/*==================================================
IshtiaqAli.com
COMPONENTS.JS
----------------------------------------------------
Enterprise Component System
Version: 2.0
==================================================*/

'use strict';

/*==================================================
COMPONENT LOADER
==================================================*/

class ComponentLoader {

    constructor() {

        this.components = document.querySelectorAll('[data-include]');

    }

    async init() {

        if (!this.components.length) {

            this.initializeControllers();

            return;

        }

        const tasks = [...this.components].map(component =>
            this.loadComponent(component)
        );

        await Promise.all(tasks);

        this.initializeControllers();

    }

    async loadComponent(element) {

        const file = element.dataset.include;

        try {

            const response = await fetch(file);

            if (!response.ok) {

                throw new Error(`Unable to load ${file}`);

            }

            element.innerHTML = await response.text();

        }

        catch (error) {

            console.error(error);

        }

    }

    initializeControllers() {

        new HeaderController();

        //new HeroController();

        //new DigitalOperationsController();

        //new WebsitePlatformsController();

    }

}

/*==================================================
HEADER CONTROLLER
==================================================*/

class HeaderController {

    constructor() {

        this.header = document.querySelector('.site-header');
        this.menu = document.querySelector('.nav-menu');
        this.mobileToggle = document.querySelector('.mobile-toggle');
        this.themeToggle = document.querySelector('.theme-toggle');
        this.navLinks = document.querySelectorAll('.nav-menu a');

        if (!this.header) return;

        this.scrollThreshold = 40;

        this.bindEvents();

        this.updateHeader();

        this.initializeTheme();

    }

    bindEvents() {

        window.addEventListener(
            'scroll',
            () => this.updateHeader(),
            { passive: true }
        );

        if (this.mobileToggle) {

            this.mobileToggle.addEventListener(
                'click',
                () => this.toggleMenu()
            );

        }

        if (this.themeToggle) {

            this.themeToggle.addEventListener(
                'click',
                () => this.toggleTheme()
            );

        }

        this.navLinks.forEach(link => {

            link.addEventListener(
                'click',
                () => this.closeMenu()
            );

        });

        document.addEventListener(
            'click',
            (event) => this.handleOutsideClick(event)
        );

        document.addEventListener(
            'keydown',
            (event) => this.handleKeydown(event)
        );

        this.setActiveNavigation();

    }

    updateHeader() {

        const isScrolled = window.scrollY > this.scrollThreshold;

        this.header.classList.toggle(
            'scrolled',
            isScrolled
        );

    }

    toggleMenu() {

        if (!this.menu || !this.mobileToggle) return;

        const isOpen = this.menu.classList.toggle('active');

        document.body.classList.toggle(
            'menu-open',
            isOpen
        );

        this.mobileToggle.classList.toggle(
            'active',
            isOpen
        );

        this.mobileToggle.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

    }

    closeMenu() {

        if (!this.menu || !this.mobileToggle) return;

        this.menu.classList.remove('active');

        document.body.classList.remove('menu-open');

        this.mobileToggle.classList.remove('active');

        this.mobileToggle.setAttribute(
            'aria-expanded',
            'false'
        );

    }

    /*==================================================
OUTSIDE CLICK
==================================================*/

handleOutsideClick(event) {

    if (!this.menu || !this.mobileToggle) return;

    if (

        !this.menu.contains(event.target) &&

        !this.mobileToggle.contains(event.target)

    ) {

        this.closeMenu();

    }

}


/*==================================================
ESCAPE KEY
==================================================*/

handleKeydown(event) {

    if (event.key === 'Escape') {

        this.closeMenu();

    }

}



/*==================================================
THEME SYSTEM
==================================================*/

initializeTheme() {

    const savedTheme =
        localStorage.getItem('ia-one-theme');

    const systemPrefersLight =
        window.matchMedia('(prefers-color-scheme: light)').matches;

    const theme =
        savedTheme ||
        (systemPrefersLight ? 'light' : 'dark');

    document.documentElement.setAttribute(
        'data-theme',
        theme
    );

    this.updateThemeToggle(theme);

}

toggleTheme() {

    const currentTheme =
        document.documentElement.getAttribute('data-theme') || 'dark';

    const newTheme =
        currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute(
        'data-theme',
        newTheme
    );

    localStorage.setItem(
        'ia-one-theme',
        newTheme
    );

    this.updateThemeToggle(newTheme);

}


updateThemeToggle(theme) {

    if (!this.themeToggle) return;

    const isLight = theme === 'light';

    this.themeToggle.setAttribute(
        'aria-label',
        isLight ? 'Switch to dark theme' : 'Switch to light theme'
    );

    this.themeToggle.setAttribute(
        'aria-pressed',
        String(isLight)
    );

}


    /*==================================================
    ACTIVE NAVIGATION
    ==================================================*/

    setActiveNavigation() {

        const currentPage = window.location.pathname
            .split('/')
            .pop() || 'index.html';

        this.navLinks.forEach(link => {

            const href = link.getAttribute('href');

            if (

                href === currentPage ||

                (currentPage === 'index.html' && href === '/')

            ) {

                link.classList.add('active');

            }

            else {

                link.classList.remove('active');

            }

        });

    }
}

/*==================================================
ANALYTICS
==================================================*/

function loadGoogleAnalytics() {

    // Prevent duplicate loading
    if (window.__googleAnalyticsLoaded) {
        return;
    }

    window.__googleAnalyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        window.dataLayer.push(arguments);
    }

    window.gtag = gtag;

    gtag('js', new Date());

    gtag('config', 'G-B1S1PG5YJY');

    const script = document.createElement('script');

    script.async = true;
    script.src =
        'https://www.googletagmanager.com/gtag/js?id=G-B1S1PG5YJY';

    document.head.appendChild(script);
}

/*==================================================
BOOTSTRAP
==================================================*/

document.addEventListener('DOMContentLoaded', async () => {

    const loader = new ComponentLoader();

    await loader.init();

    loadGoogleAnalytics();

});
