/* ==========================================================
   loader.js
   Loads and validates all resource JSON files.
   ========================================================== */

const DATA_FILES = [
    "data/a1.json",
    "data/a2.json",
    "data/b1.json",
    "data/b2.json",
    "data/c1.json",
    "data/c2.json"
];

let cache = null;

/**
 * Fetch a single JSON file.
 * @param {string} path
 * @returns {Promise<Object>}
 */
async function fetchJSON(path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Failed to load: ${path}`);
    }

    return response.json();
}

/**
 * Basic validation for each JSON file.
 * @param {Object} data
 */
function validateData(data) {
    if (!data || !Array.isArray(data.resources)) {
        throw new Error(
            "Invalid JSON structure. Expected a 'resources' array."
        );
    }
}

/**
 * Load all resources.
 * Results are cached after the first request.
 *
 * @returns {Promise<Array>}
 */
export async function loadResources() {

    // Return cached data
    if (cache) {
        return cache;
    }

    // Fetch all files in parallel
    const jsonFiles = await Promise.all(
        DATA_FILES.map(fetchJSON)
    );

    // Validate each file
    jsonFiles.forEach(validateData);

    // Merge into one array
    cache = jsonFiles.flatMap(file =>
        file.resources.map(resource => ({
            ...resource,
            level: file.level
        }))
    );

    return cache;
}