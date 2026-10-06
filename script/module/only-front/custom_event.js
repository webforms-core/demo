import { WebForms, HtmlEvent, Fetch } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    // Custom Event
    // Watch: attribute, style, text, children, value
    // Compare: greater, less, equal, notequal, includes, startswith, endswith, matches, changed, inrange, lengthgreater, lengthless, lengthequal
    // Range: Only Use For Compare With inrange Value. Split By Comma ","
    // Key: Only Use For Watch With attribute And style Value
    form.createCustomDOMEvent("nameBox", "nameMatched", "value", "", "equal", "hello", "", true, 200);
    form.setCommentEventListener("nameBox", "nameMatched", "name-matched");

    form.createCustomDOMEvent("price", "priceHigh", "text", "", "greater", "100", "", true, 200);
    form.setCommentEventListener("price", "priceHigh", "price");

    form.setCommentEvent("IncreacePrice", HtmlEvent.OnClick, "increace-price");

    form.startIndex("name-matched");
    form.setBackgroundColor("<main>", "gray");

    form.startIndex("price");
    form.message(Fetch.getText("price"));

    form.startIndex("increace-price");
    form.increase("price", 1);

    return `
        <input id="nameBox" type="text" placeholder="Type 'hello'">
        <div id="price">96</div>
        <p>Click to Greater 100</p>
        <button id="IncreacePrice">+</button>
    ` + form.exportToHtmlComment();
}