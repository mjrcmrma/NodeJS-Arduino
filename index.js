var server = require("./server"),
router = require("./route"),
requestHandlers = require("./requestHandlers"),
debug = false,
handle = {};
handle["/"] = requestHandlers.sendCondomino;
handle["/interface"] = requestHandlers.sendInterface;

server.start(router.route, handle, debug);