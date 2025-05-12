import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Dd5KkB1s.js","_app/immutable/chunks/B5tVufoA.js","_app/immutable/chunks/DypPXD7E.js"];
export const stylesheets = ["_app/immutable/assets/0.D3Y6Ohqc.css"];
export const fonts = [];
