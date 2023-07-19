const PROXY_CONFIG = [
    {
        context: [
            '/api',
        ],
        target: "http://localhost:4200/",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/": ""
        }
    }
]

module.exports = PROXY_CONFIG;