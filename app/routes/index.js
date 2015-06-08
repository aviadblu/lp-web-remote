var serverApi = require('./server/');


module.exports = function(app) {
    /* API */

    /* APPLICATION */


    app.use('/api/server', require('./server/'));


    /* APPLICATION */
    app.get('*', function(req, res) {
        // load index.html otherwise
        res.sendfile('./public/index.html');
    });
};
