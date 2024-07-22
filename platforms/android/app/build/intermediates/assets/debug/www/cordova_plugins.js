cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova.plugin.mds.mds",
    "file": "plugins/cordova.plugin.mds/www/mds.js",
    "pluginId": "cordova.plugin.mds",
    "clobbers": [
      "cordova.plugins.mds"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.5",
  "cordova.plugin.mds": "1.0.0",
  "cordova-plugin-device": "3.0.0"
};
// BOTTOM OF METADATA
});