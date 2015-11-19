import createRenderer from './renderer'

export default createRenderer({scripts: ['shared.js', 'app.js'], omit: 'admin'})
