/* ==========================================================
   search.js
   Global Search
   ========================================================== */

import { renderResources } from "./renderer.js";

let allResources = [];

/**
 * Initialize search functionality.
 * @param {Array} resources
 */
export function initializeSearch(resources) {

    allResources = resources;

    const searchInput = document.getElementById("search-input");

    if (!searchInput) return;

    searchInput.addEventListener("input", handleSearch);

}

/**
 * Handle search input
 */
function handleSearch(event) {

    const query = event.target.value
        .trim()
        .toLowerCase();

    if (!query) {
        renderResources(allResources);
        return;
    }

    const filtered = allResources.filter(resource => {

        return [

            resource.title,
            resource.topic,
            resource.description,
            ...(resource.tags || [])

        ]
            .filter(Boolean)
            .some(value =>
                value.toLowerCase().includes(query)
            );

    });

    renderResources(filtered);

}