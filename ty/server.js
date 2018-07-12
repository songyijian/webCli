const Koa = require('koa');
const app = new Koa();

const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3000);