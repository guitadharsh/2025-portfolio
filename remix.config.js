/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    appDirectory: "app",
    assetsBuildDirectory: "public/build",
    publicPath: "/build/",
    serverBuildDirectory: "build",
    server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
    serverBuildTarget: "vercel"
};
