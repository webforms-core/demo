import { WebForms, HtmlEvent, Fetch } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    form.setCommentEvent("SetFormat", HtmlEvent.OnClick, "set-format");

    form.startIndex("set-format");

    // Money
    form.saveValue("Money", "money");
    form.setFormatSaveValue(
        "money",
        "(\\d)(?=(\\d{3})+$)",
        "$$1,"
    );
    form.setValue("Money", Fetch.save("money"));

    // Clock
    form.cacheValue("Clock", "clock");
    form.setFormatCacheValue(
        "clock",
        "(^|:)(\\d)(?=:|$)",
        "$$10$2"
    );
    form.setValue("Clock", Fetch.cache("clock"));

    // Phone
    form.saveValue("Phone", "phone");
    form.setFormatSaveValue(
        "phone",
        "^(\\d{4})(\\d{3})(\\d{4})$",
        "$$1-$2-$3"
    );
    form.setValue("Phone", Fetch.save("phone"));

    // Date
    form.cacheValue("Date", "date");
    form.setFormatCacheValue(
        "date",
        "^(\\d{4})(\\d{2})(\\d{2})$",
        "$$1-$2-$3"
    );
    form.setValue("Date", Fetch.cache("date"));

    return `
        <h2>Set Format</h2>

        <button id="SetFormat">Click to Set Format</button>

        <br><br>

        <input type="text" id="Money" value="12345678">

        <br><br>

        <input type="text" id="Clock" value="15:1:3">

        <br><br>

        <input type="text" id="Phone" value="09121234567">

        <br><br>

        <input type="text" id="Date" value="20261008">
    ` + form.exportToHtmlComment();
}
