/// <reference path="openrct2.d.ts" />
/// <reference path="server.ts" />

let server = new Server();
var main = () => {
    server.listen(7861);
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