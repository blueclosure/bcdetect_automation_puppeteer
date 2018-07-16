const path = require('path');
const os = require('os');

const config = require('./config.json');
console.log(config)
const child_p = require('child_process');
const spawn = child_p.spawn;
const execSync = child_p.execSync;

const bcdetect_install_dir = config.bcdetect_install_dir;


function getBCPath() {
  if (process.env.BCDIR)
    return process.env.BCDIR;
  var HOME = os.homedir();
  var BCDETECTDIR = path.join(HOME, '.bcdetect');
  return BCDETECTDIR;
}


if (!config.bcdetect_home_dir)
  config.bcdetect_home_dir = getBCPath();


const bcdetect_home_Dir = config.bcdetect_home_dir;

const bcdetect_libs_dir = path.join(bcdetect_install_dir, 'libs');

const node_options = ["--no-deprecation"];

var pkginfo = require(bcdetect_libs_dir + "/libs/pkginfo.js"); // Be sure environment variables are set before requiring this.
var binOSPath = pkginfo.BinDir;

function getNodePath() {
  var nodePath = path.join(binOSPath, "node64"); 
  return nodePath;
}


function getMaxHeapMemArg() {
  var totalMem = os.totalmem();
  /* var cpus = os.cpus().length;
  var max_size = Math.floor((parseInt(totalMem)/(parseInt(cpus)/2))/(1000*1000));*/

  //Max available memory
  var max_size = Math.floor(totalMem / (1000 * 1000));
  // This arguments fixes big heap issues on node which happen when a big JS is mapped

  return max_size > 1700 ? "--max_old_space_size=" + max_size : undefined;
}


var nodePath = getNodePath();

process.chdir(bcdetect_libs_dir);

process.env.BCPROXYDIR = bcdetect_home_Dir + "/.proxySSLDIR/";



var max_old_space_size_arg = getMaxHeapMemArg();

var servers_process = spawn(nodePath, node_options.concat([path.join(".", "servers.js")].concat(['-s', 'reporter,collector'])));

var servers_process_proxy = spawn(nodePath, node_options.concat((max_old_space_size_arg ? [max_old_space_size_arg] : []).concat([path.join(".", "servers.js")].concat(['-s', 'proxy']))));

/*
cd $BASEDIR/../deploy/libs/ 
./bin/OS/linux/node64 --no-deprecation servers.js -s reporter,collector &
./bin/OS/linux/node64 --no-deprecation --max_old_space_size=8270 servers.js -s proxy -c 

*/