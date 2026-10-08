import { WebForms, HtmlEvent, Fetch } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    form.setCommentEvent("SetFormat", HtmlEvent.OnClick, "set-format");

    form.startIndex("set-format");

    form.saveValue("Money", "money");
    form.setFormatSaveValue("money", "(\\d)(?=(\\d{3})+$)", "$$1,");
    form.setValue("Money", Fetch.save("money"));

    form.cacheValue("Clock", "clock");
    form.setFormatCacheValue("clock", "(^|:)(\\d)(?=:|$)", "$$10$2");
    form.setValue("Clock", Fetch.cache("clock"));

    return `
        <h2>Set Format</h2>
        <button id="SetFormat">Click to Set Format</button>
        <br><br>
        <input type="text" id="Money" value="12345678">
        <br><br>
        <input type="text" id="Clock" value="15:1:3">
    ` + form.exportToHtmlComment();
}
