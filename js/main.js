(() => {
    "use strict";

    const SELECTORS = {
        themeToggle: "[data-theme-toggle]",
        themeIcon: "[data-theme-icon]",
        themeLabel: "[data-theme-label]",
        printButton: "[data-print]",
        copyButton: "[data-copy-email]",
        copyLabel: "[data-copy-label]",
        status: "[data-status]",
        progress: "[data-scroll-progress]",
        backToTop: "[data-back-to-top]",
        currentYear: "[data-current-year]",
        reveal: "[data-reveal]"
    };

    const Storage = {
        get(key) {
            try { return window.localStorage.getItem(key); } catch { return null; }
        },
        set(key, value) {
            try { window.localStorage.setItem(key, value); } catch { /* Storage can be unavailable. */ }
        }
    };

    class ThemeController {
        static storageKey = "resume-theme";

        constructor(root = document.documentElement) {
            this.root = root;
            this.button = document.querySelector(SELECTORS.themeToggle);
            this.media = window.matchMedia("(prefers-color-scheme: dark)");
            this.themeColor = document.querySelector('meta[name="theme-color"]');
            this.hasStoredPreference = Boolean(Storage.get(ThemeController.storageKey));
        }

        init() {
            const stored = Storage.get(ThemeController.storageKey);
            this.apply(stored === "dark" || stored === "light" ? stored : this.systemTheme, false);
            this.button?.addEventListener("click", () => this.apply(this.currentTheme === "dark" ? "light" : "dark"));
            this.media.addEventListener?.("change", () => {
                if (!this.hasStoredPreference) this.apply(this.systemTheme, false);
            });
        }

        get systemTheme() { return this.media.matches ? "dark" : "light"; }
        get currentTheme() { return this.root.dataset.theme === "dark" ? "dark" : "light"; }

        apply(theme, persist = true) {
            this.root.dataset.theme = theme;
            if (persist) {
                Storage.set(ThemeController.storageKey, theme);
                this.hasStoredPreference = true;
            }
            const isDark = theme === "dark";
            this.button?.setAttribute("aria-pressed", String(isDark));
            const icon = this.button?.querySelector(SELECTORS.themeIcon);
            const label = this.button?.querySelector(SELECTORS.themeLabel);
            if (icon) icon.textContent = isDark ? "☀" : "☾";
            if (label) label.textContent = isDark ? "Light theme" : "Dark theme";
            if (this.themeColor) this.themeColor.content = isDark ? "#0b1120" : "#f5f7fb";
        }
    }

    class ClipboardController {
        constructor() {
            this.button = document.querySelector(SELECTORS.copyButton);
            this.label = this.button?.querySelector(SELECTORS.copyLabel);
            this.status = document.querySelector(SELECTORS.status);
            this.resetTimer = 0;
        }

        init() { this.button?.addEventListener("click", () => this.copy()); }

        async copy() {
            const email = this.button?.dataset.email;
            if (!email) return;
            try {
                await navigator.clipboard.writeText(email);
                this.showFeedback("Email copied", `${email} copied to clipboard.`);
            } catch {
                this.fallbackCopy(email);
            }
        }

        fallbackCopy(value) {
            const input = document.createElement("textarea");
            input.value = value;
            input.setAttribute("readonly", "");
            input.style.position = "fixed";
            input.style.opacity = "0";
            document.body.append(input);
            input.select();
            const copied = document.execCommand("copy");
            input.remove();
            this.showFeedback(copied ? "Email copied" : "Copy unavailable", copied ? `${value} copied to clipboard.` : `Email: ${value}`);
        }

        showFeedback(label, message) {
            window.clearTimeout(this.resetTimer);
            if (this.label) this.label.textContent = label;
            if (this.status) this.status.textContent = message;
            this.resetTimer = window.setTimeout(() => {
                if (this.label) this.label.textContent = "Copy email";
                if (this.status) this.status.textContent = "";
            }, 2500);
        }
    }

    class ScrollController {
        constructor() {
            this.progress = document.querySelector(SELECTORS.progress);
            this.backToTop = document.querySelector(SELECTORS.backToTop);
            this.frame = 0;
        }

        init() {
            const update = () => {
                if (!this.frame) this.frame = window.requestAnimationFrame(() => { this.render(); this.frame = 0; });
            };
            window.addEventListener("scroll", update, { passive: true });
            window.addEventListener("resize", update, { passive: true });
            this.backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
            this.render();
        }

        render() {
            const maximum = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = maximum > 0 ? Math.min(window.scrollY / maximum, 1) : 0;
            if (this.progress) this.progress.style.transform = `scaleX(${ratio})`;
            if (this.backToTop) this.backToTop.dataset.visible = String(window.scrollY > 500);
        }
    }

    class RevealController {
        init() {
            const elements = [...document.querySelectorAll(SELECTORS.reveal)];
            if (!elements.length) return;
            if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                elements.forEach(element => { element.dataset.visible = "true"; });
                return;
            }
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.dataset.visible = "true";
                    observer.unobserve(entry.target);
                });
            }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
            elements.forEach(element => observer.observe(element));
        }
    }

    class PrintController {
        constructor() {
            this.button = document.querySelector(SELECTORS.printButton);
            this.originalTitle = document.title;
            this.printTitle = window.location.pathname.toLowerCase().endsWith("/it-support.html")
                ? "Yehor_Filistieiev_Resume_IT_Support"
                : "Yehor_Filistieiev_Resume_Software_Engineer";
        }

        init() {
            window.addEventListener("beforeprint", () => { document.title = this.printTitle; });
            window.addEventListener("afterprint", () => { document.title = this.originalTitle; });
            this.button?.addEventListener("click", () => window.print());
        }
    }

    class ResumeApp {
        init() {
            new ThemeController().init();
            new ClipboardController().init();
            new ScrollController().init();
            new RevealController().init();
            new PrintController().init();
            const year = document.querySelector(SELECTORS.currentYear);
            if (year) year.textContent = String(new Date().getFullYear());
        }
    }

    new ResumeApp().init();
})();
