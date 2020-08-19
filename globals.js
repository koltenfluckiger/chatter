const Path = require('path');

global.appRoot = Path.resolve(__dirname);
global.buildPath = Path.join(__dirname, "react-chatter", "build");
