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
		client: {start:"_app/immutable/entry/start.CUqH2a6k.js",app:"_app/immutable/entry/app.Du3ktAzg.js",imports:["_app/immutable/entry/start.CUqH2a6k.js","_app/immutable/chunks/AbfptUDm.js","_app/immutable/chunks/DypPXD7E.js","_app/immutable/chunks/B-lmA1cT.js","_app/immutable/chunks/m49QXDYL.js","_app/immutable/entry/app.Du3ktAzg.js","_app/immutable/chunks/DypPXD7E.js","_app/immutable/chunks/UlPoYX6q.js","_app/immutable/chunks/B5tVufoA.js","_app/immutable/chunks/CVBJzDt5.js","_app/immutable/chunks/B-lmA1cT.js","_app/immutable/chunks/m49QXDYL.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
