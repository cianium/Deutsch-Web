/* ==========================================================
   renderer.js
   Renders all resources into the UI
   ========================================================== */

const container = document.getElementById("resource-container");

/**
 * Escape HTML to prevent accidental injection
 */
function escapeHTML(text = "") {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Video Card
 */
function createVideoCard(resource) {
    return `
        <article class="resource-card fade-up">

            <img
                class="resource-thumbnail"
                src="${resource.thumbnail}"
                alt="${escapeHTML(resource.title)}"
                loading="lazy">

            <div class="resource-content">

                <span class="badge">
                    ${escapeHTML(resource.level)}
                </span>

                <h3 class="resource-title">
                    ${escapeHTML(resource.title)}
                </h3>

                <p class="resource-topic">
                    ${escapeHTML(resource.topic)}
                </p>

                <div class="resource-footer">

                    <span class="resource-duration">
                        ${resource.duration || ""}
                    </span>

                    <a
                        class="btn"
                        href="${resource.url}"
                        target="_blank"
                        rel="noopener noreferrer">

                        Open

                    </a>

                </div>

            </div>

        </article>
    `;
}

/**
 * PDF Card
 */
function createPDFCard(resource) {
    return `
        <article class="resource-card fade-up">

            <div class="resource-content">

                <div class="pdf-icon">
                    📄
                </div>

                <span class="badge">
                    ${escapeHTML(resource.level)}
                </span>

                <h3 class="resource-title">
                    ${escapeHTML(resource.title)}
                </h3>

                <p class="resource-topic">
                    ${escapeHTML(resource.topic)}
                </p>

                <p class="resource-description">
                    ${escapeHTML(resource.description || "")}
                </p>

                <div class="resource-footer">

                    <span></span>

                    <a
                        class="btn"
                        href="${resource.url}"
                        target="_blank"
                        rel="noopener noreferrer">

                        Open

                    </a>

                </div>

            </div>

        </article>
    `;
}

/**
 * Empty State
 */
export function renderEmptyState() {

    container.innerHTML = `
        <div class="empty-state">

            <h2>No resources found</h2>

            <p>
                Try changing your search or filters.
            </p>

        </div>
    `;
}

/**
 * Loading Skeletons
 */
export function renderSkeletons(count = 6) {

    container.innerHTML = "";

    for (let i = 0; i < count; i++) {

        container.insertAdjacentHTML(
            "beforeend",
            `
            <div class="resource-card skeleton">

                <div class="skeleton-thumbnail"></div>

                <div class="skeleton-line long"></div>

                <div class="skeleton-line medium"></div>

                <div class="skeleton-line short"></div>

            </div>
            `
        );
    }

}

/**
 * Main Renderer
 */
export function renderResources(resources = []) {

    if (!resources.length) {
        renderEmptyState();
        return;
    }

    container.innerHTML = resources
        .map(resource => {

            switch (resource.type) {

                case "video":
                    return createVideoCard(resource);

                case "pdf":
                    return createPDFCard(resource);

                default:
                    return "";

            }

        })
        .join("");

}