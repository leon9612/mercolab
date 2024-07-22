cordova.define("cordova.plugin.mds.mds", function(require, exports, module) { var exec = require('cordova/exec');

module.exports = {
    conectar: function (ip, puerto, success, error) {
        exec(success, error, 'mds', 'conectar', [ip, puerto]);
    },
    leer: function (quantity, success, error) {
        exec(success, error, 'mds', 'leer', [quantity]);
    },
    escribir: function (registro, valor, success, error) {
        exec(success, error, 'mds', 'escribir', [registro, valor]);
    },
    desconectar: function (success, error) {
        exec(success, error, 'mds', 'desconectar', []);
    }
};
});
