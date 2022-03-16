import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import config from '../../webpack.config.js'

const DIST_DIR = path.join(__dirname, 'public_html')
const HTML_FILE = path.join(DIST_DIR, 'index.html')
const compiler = webpack(config)

const app = express()
app.use(
    webpackDevMiddleware(compiler, { publicPath: config.output.publicPath })
)

app.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
        if (err) {
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press [ Ctrl ] + [ C ] to quit.')
})