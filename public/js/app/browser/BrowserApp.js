import { App } from "../App.js";
import { Tab } from "./Tab.js";
import { VirtualDNS } from "./VirtualDNS.js";

export class BrowserApp extends App {
    tabs = [];

    constructor(appManager) {
        super("WaterCat", "water-cat.webp", "browser", appManager);
    }

    onload() {
        this.newTab();
        $("#url").on("keydown", (e) => {
            if (e.key == "Enter") {
                let url = $("#url").val();
                this.openedTab.navigate(VirtualDNS.lookup(url));
            }
        });
        for (let i = 0; i < VirtualDNS.websites.length; i++) {
            let website = VirtualDNS.websites[i];
            let option = $(`<option value="${website.url}">`);
            this.el.find("#sites").append(option);
        }
        this.el.find(".back").click(() => this.openedTab.back());
        this.el.find(".forward").click(() => this.openedTab.forward());
        this.el.find(".refresh").click(() => this.openedTab.refresh());
    }
    
    async createAppWindow() {
        await super.createAppWindow();
        this.el.find(".decoration").remove();
        let addTab = $(`<li class="newsite">
            <p style="margin-top: 0; font-size: 25px;">+</p>
        </li>`);
        addTab.click(() => this.newTab());
        this.el.find(".topbar ul").append(addTab);
    }

    setURL(url) {
        $("#url").val(url);
    }

    newTab() {
        let tab = new Tab(this);
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
        tab.open();
        this.openedTab = tab;
    }

    closeTab(tab) {
        let index = this.tabs.indexOf(tab);
        this.tabs.splice(index, 1);
        if (this.tabs.length == 0) {
            this.close();
            return;
        }
        if (this.openedTab == tab) {
            if (index < this.tabs.length - 1) {
                this.openTab(this.tabs[index]);
            } else {
                this.openTab(this.tabs[this.tabs.length - 1]);
            }
        }
        tab.close();
    }
}