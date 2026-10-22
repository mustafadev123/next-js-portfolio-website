// Shared by the root layout (server) and the CubeIntro client component.
export const INTRO_STORAGE_KEY = "intro-seen"

/**
 * Runs in <head> before first paint. Shows the intro only on a first visit to the
 * home page with motion allowed. `/?intro` forces it, for previewing.
 */
export const INTRO_HEAD_SCRIPT = `try{var f=/(?:^|[?&])intro(?:=|&|$)/.test(location.search.slice(1));if(location.pathname==="/"&&(f||!localStorage.getItem("${INTRO_STORAGE_KEY}"))&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-pending","intro-hold")}}catch(e){}`
