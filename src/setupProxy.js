const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(
		'/app-api',
		createProxyMiddleware({
			target: 'https://englishapi.pinkvilla.com',
			changeOrigin: true,
		})
	)
}
