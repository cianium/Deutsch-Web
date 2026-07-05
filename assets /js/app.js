/* ==========================================================
   app.js
   Application Entry Point
   ========================================================== */

import { loadResources } from "./loader.js";
import { renderResources } from "./renderer.js";
import { initializeSearch } from "./search.js";
import { initializeFilters } from "./filters.js";
import { initializeNavigation } from "./navigation.js";
import { initializeAnimations } from "./animations.js";

/**
 * Application bootstrap
 */
async function initializeApp() {
    try {
        // Load all resource data
        const resources = await loadResources();

        // Initial render
        renderResources(resources);

        // Initialize features
        initializeSearch(resources);
        initializeFilters(resources);
        initializeNavigation();
        initializeAnimations();

        console.info("German Library initialized successfully.");
    } catch (error) {
        console.error("Failed to initialize application:", error);

        document.getElementById("resource-container").innerHTML = `
            <div class="empty-state">
                <h2>Something went wrong</h2>
                <p>
                    Resources could not be loaded.
                    Please try refreshing the page.
                </p>
            </div>
        `;
    }
}

/**
 * Start application
 */
document.addEventListener("DOMContentLoaded", initializeApp);