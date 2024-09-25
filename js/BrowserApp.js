import { App } from "./App.js";

export class BrowserApp extends App {
    tabs = [];

    constructor(appManager) {
        super("WaterCat", "water-cat.webp", "browser", appManager);
    }
    
    async createAppWindow() {
        await super.createAppWindow();
        this.el.find(".decoration").remove();
        let addTab = $(`<li class="newsite">
            <p style="margin-top: 0; font-size: 25px;">+</p>
        </li>`);
        addTab.click(() => this.newTab());
        addTab.appendTo(".topbar ul");
        this.newTab();
    }

    newTab() {
        let tab = new Tab();
        tab.topbarTab.insertBefore(".newsite");
        tab.topbarTab.click(() => {
            this.openTab(tab);
        });
        tab.topbarTab.find(".siteclose").click(() => {
            this.closeTab(tab);
        });
        this.openTab(tab);
        this.tabs.push(tab);
    }

    openTab(tab) {
        console.log(tab);
        if (this.openedTab == tab) return;
        try {
            this.openedTab.topbarTab.removeClass("open");
        } catch (e) {}
        tab.topbarTab.addClass("open");
        this.openedTab = tab;
        // TODO focus tabwindow
    }

    closeTab(tab) {
        let index = this.tabs.indexOf(tab);
        this.tabs.splice(index, 1);
        if (this.tabs.length == 0) {
            this.close();
            return;
        }
        if (this.openedTab = tab) {
            this.openTab(this.tabs[this.tabs.length - 1]);
        }
        tab.close();
    }
}

class Tab {
    constructor() {
        let icon = "water-cat.webp";
        let title = "New Tab";
        this.topbarTab = $(`<li class="site">
            <img src="/icon/${icon}" alt="site icon" class="siteicon">
            <span>${title}</span>
            <div class="siteclose">
                <img src="/icon/close.webp" alt="close icon" class="sitecloseicon">
            </div>
        </li>`);
    }

    close() {
        this.topbarTab.remove();
    }
}