export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.DhlMDknU.js",app:"_app/immutable/entry/app.9SuH3x0R.js",imports:["_app/immutable/entry/start.DhlMDknU.js","_app/immutable/chunks/1-u59hmm.js","_app/immutable/chunks/Cq4NkSTW.js","_app/immutable/chunks/CLEOFDPV.js","_app/immutable/entry/app.9SuH3x0R.js","_app/immutable/chunks/Cq4NkSTW.js","_app/immutable/chunks/DAxyQYTp.js","_app/immutable/chunks/lz9eGtdD.js","_app/immutable/chunks/CLEOFDPV.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
