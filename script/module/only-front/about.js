import { WebForms, HtmlEvent } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    form.setCommentEvent("Button1", HtmlEvent.OnClick, "button-click");

    form.startIndex("button-click");
    form.setFontSize("<main>", 30);

    return `
        <b>About page</b>
        <br>
        <button id="Button1">Click me!</button>
        <p>WebForms Core (WFC) is a powerful technology for 
        managing DOM elements through the server and client!</p>
    `
    + form.exportToHtmlComment();
}
