(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("portfolio-theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";

    const isLightTheme = (theme) => theme === "light";

    const applyTheme = (theme) => {
        root.dataset.theme = theme;
        document.querySelectorAll(".theme-toggle").forEach((button) => {
            const isLight = theme === "light";
            button.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
            button.setAttribute("aria-pressed", isLight ? "true" : "false");
            button.querySelector(".theme-icon").textContent = isLight ? "☾" : "☀";
            button.querySelector(".theme-text").textContent = isLight ? "DARK" : "LIGHT";
        });

        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) {
            themeColor.setAttribute("content", isLightTheme(theme) ? "#eef2f7" : "#080a0e");
        }
    };

    applyTheme(savedTheme || preferredTheme);

    document.querySelectorAll(".theme-toggle").forEach((button) => {
        button.addEventListener("click", () => {
            const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
            localStorage.setItem("portfolio-theme", nextTheme);
            applyTheme(nextTheme);
        });
    });
})();
