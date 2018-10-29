// Bring in the room class
const Namespace =  require('../classes/Namespace');
const Room =  require('../classes/Room');

// Set up the namespaces
let namespaces = [];
let wikiNs = new Namespace(1,'Wiki','https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png');
let mozNs = new Namespace(2,'Mozilla','https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/opendesign/files/2018/07/firefox-logo.png');
let linuxNs = new Namespace(3,'Linux','https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png');

namespaces.push(wikiNs,mozNs,linuxNs);

// Make the main room and add it to rooms. it will ALWAYS be 0
wikiNs.addRoom(new Room('New Articles','Wiki'));
wikiNs.addRoom(new Room('Editors','Wiki'));
wikiNs.addRoom(new Room('Other','Wiki'));

mozNs.addRoom(new Room('Firefox','Mozilla'));
mozNs.addRoom(new Room('SeaMonkey','Mozilla'));
mozNs.addRoom(new Room('SpiderMonkey','Mozilla'));
mozNs.addRoom(new Room('Rust','Mozilla'));

linuxNs.addRoom(new Room('Debian','Linux'));
linuxNs.addRoom(new Room('Red Hat','Linux'));
linuxNs.addRoom(new Room('MacOs','Linux'));
linuxNs.addRoom(new Room('Kernal Development','Linux'));

module.exports = namespaces;