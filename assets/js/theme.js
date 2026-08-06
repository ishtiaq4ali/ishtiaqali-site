/* ==========================================
   Ishtiaq Ali Theme Controller
========================================== */

class ThemeController {

    constructor(){

        this.button=document.getElementById("themeToggle");

        this.theme=localStorage.getItem("theme") || "dark";

        this.applyTheme();

        this.bindEvents();

    }

    applyTheme(){

        document.documentElement.setAttribute(
            "data-theme",
            this.theme
        );

        if(this.button){

            this.button.textContent=
                this.theme==="dark"
                    ? "🌙"
                    : "☀️";

        }

    }

    toggleTheme(){

        this.theme=
            this.theme==="dark"
                ? "light"
                : "dark";

        localStorage.setItem(
            "theme",
            this.theme
        );

        this.applyTheme();

    }

    bindEvents(){

        if(!this.button) return;

        this.button.addEventListener(
            "click",
            ()=>this.toggleTheme()
        );

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    new ThemeController();

});