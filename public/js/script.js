import { AppManager } from "./AppManager.js";
import { BrowserApp } from "./app/browser/BrowserApp.js";
import { NoteBlockApp } from "./app/NoteBlockApp.js";
import { FaxApp } from "./app/FaxApp.js";
import { TableApp } from "./app/TableApp.js";
import { VirtualDNS } from "./app/browser/VirtualDNS.js";
import { GameMaster } from "./GameMaster.js";


let gameMaster = GameMaster.getInstance();
gameMaster.updateGameState();

gameMaster.addCallback((gameState) => {
    $("#day").text("Day " + gameState.day);
});

$("#progress").click(() => {
    gameMaster.progressGameState();
});

let appManager = new AppManager();


let apps = [
    BrowserApp,
    NoteBlockApp,
    FaxApp,
    TableApp,
];

appManager.loadApps(apps);

$("#color-scheme").click((e) => {
    if ($("body").hasClass("dark")) {
        $("body").removeClass("dark");
        $("body").addClass("light");
        $(e.delegateTarget).find("img").attr("src", "/image/icon/moon.png");
        return;
    } else {
        $("body").addClass("dark");
        $("body").removeClass("light");
        $(e.delegateTarget).find("img").attr("src", "/image/icon/sun.png");
        return;
    }
});

// appManager.getApp("browser").pin();
appManager.getApp("browser").launch();
setTimeout(() => {
    appManager.getApp("browser").openedTab.navigate(VirtualDNS.lookup("commit-fraud.now"));
}, 800);
// appManager.getApp("fax").pin();
// appManager.getApp("table").launch();