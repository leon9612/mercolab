cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova.plugin.mds/www/mds.js",
        "id": "cordova.plugin.mds.mds",
        "pluginId": "cordova.plugin.mds",
        "clobbers": [
            "cordova.plugins.mds"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.5",
    "cordova.plugin.mds": "1.0.0",
    "cordova-plugin-device": "3.0.0"
}
// BOTTOM OF METADATA
});