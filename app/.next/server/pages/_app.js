const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_70202b._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__37704f._.js");
runtime.loadChunk("server/chunks/ssr/src_styles_7fb2a2._.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/pages/_app.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
