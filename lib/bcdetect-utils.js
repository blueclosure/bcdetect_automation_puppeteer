const os = require("os");
const path = require("path");
const fs = require("fs");

const config_obj = {
  "proxy": {
    "port": 1114
  },
  "collector": {
    "port": 1115
  },
  "reporter": {
    "port": 1116
  },
  "chained3rdProxy": {
    "port": 1117
  },
  "bcdbfilename": "alerts.db",
  "bcdetectdir": ".bcdetect",
  "useCertStore": false,
  "angulardir": "./Angular",
  "checkVersionURL": "https://members.blueclosure.com/api/v0/checkupdate/bcdetect/",
  "updateURL": "https://members.blueclosure.com/login?update=true",
  "configURL": "file:///bcconfig#",
  "forceChromePath": true,
  "chromePath": "/usr/bin/google-chrome",
  "uuid": "aaaaaaaa-4444-4444-4444-444444444444",
  "version": "1",
  "days": 1,
  "isRemotelyControlled": true,
  "useReportOnTab": false,
  "showNotifications": false,
};

function getConfig(configPath) {
  if (!pathExists(configPath))
    throw Error(`${configPath} not found`);

  var configPath = require(configPath);
  return Object.assign(config_obj,configPath);
}

function getConfigURL(configOrHomeDir) {
  if (typeof configOrHomeDir === 'object') {
    configOrHomeDir = configOrHomeDir.bcdetect_home_dir;
  } else if (typeof configOrHomeDir !== 'string') {
    throw new Error("Expecting a string or object");
  }
  if (!pathExists(configOrHomeDir))
    throw Error(`${configOrHomeDir} not found`);
  configOrHomeDir = path.join(configOrHomeDir, 'config.json');
  var config_obj = getConfig(configOrHomeDir);
  return 'file:///bcconfig#' + JSON.stringify(config_obj);
}


function pathExists(path) {
  try {
    fs.statSync(path);
    return true;
  } catch (e) {
    return false;
  }
}

function getBCHomePath() {
  if (process.env.BCDIR)
    return process.env.BCDIR;
  var HOME = os.homedir();
  var BCDETECTDIR = path.join(HOME, '.bcdetect');
  return BCDETECTDIR;
}


module.exports = {
  getConfigURL: getConfigURL,
  getBCHomePath: getBCHomePath
}