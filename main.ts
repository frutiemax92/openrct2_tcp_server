/// <reference path="openrct2.d.ts" />
/// <reference path="server.ts" />

let message : string = "Hello World";
console.log(message);

let server = new Server();
var main = () => {
    server.listen(7860);
}

let settings = {} as PluginMetadata;
settings.authors = "Lucas Malo Belanger";
settings.licence = "MIT";
settings.main = main;
settings.name = "OpenRCT2 TCP Server";
settings.type = "local";
settings.version = "1.0";
settings.targetApiVersion = 1;
registerPlugin(settings);