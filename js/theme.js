(function() {
    function getTheme() {
        let nameEQ = "theme=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return localStorage.getItem("theme") || "light";
    }
    document.documentElement.setAttribute("data-theme", getTheme());
})();
