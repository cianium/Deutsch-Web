/* ==========================================================
   filters.js
   Centralized filtering system
   ========================================================== */

import { renderResources } from "./renderer.js";

const state = {
    resources: [],
    search: "",
    level: "all",
    type: "all",
    topic: "all"
};

/**
 * Initialize filters
 */
export function initializeFilters(resources) {

    state.resources = resources;

    const levelFilter = document.getElementById("level-filter");
    const typeFilter = document.getElementById("type-filter");
    const topicFilter = document.getElementById("topic-filter");
    const searchInput = document.getElementById("search-input");

    populateTopics(resources);

    levelFilter?.addEventListener("change", e => {
        state.level = e.target.value;
        applyFilters();
    });

    typeFilter?.addEventListener("change", e => {
        state.type = e.target.value;
        applyFilters();
    });

    topicFilter?.addEventListener("change", e => {
        state.topic = e.target.value;
        applyFilters();
    });

    searchInput?.addEventListener("input", e => {
        state.search = e.target.value.trim().toLowerCase();
        applyFilters();
    });
}

/**
 * Apply all filters together
 */
function applyFilters() {

    const filtered = state.resources.filter(resource => {

        const matchesSearch =
            !state.search ||
            [
                resource.title,
                resource.topic,
                resource.description,
                ...(resource.tags || [])
            ]
                .filter(Boolean)
                .some(value =>
                    value.toLowerCase().includes(state.search)
                );

        const matchesLevel =
            state.level === "all" ||
            resource.level.toLowerCase() === state.level;

        const matchesType =
            state.type === "all" ||
            resource.type === state.type;

        const matchesTopic =
            state.topic === "all" ||
            resource.topic === state.topic;

        return (
            matchesSearch &&
            matchesLevel &&
            matchesType &&
            matchesTopic
        );

    });

    renderResources(filtered);

}

/**
 * Fill topic dropdown automatically
 */
function populateTopics(resources) {

    const select = document.getElementById("topic-filter");

    if (!select) return;

    const topics = [...new Set(
        resources.map(r => r.topic).filter(Boolean)
    )].sort();

    topics.forEach(topic => {

        const option = document.createElement("option");

        option.value = topic;
        option.textContent = topic;

        select.appendChild(option);

    });

}