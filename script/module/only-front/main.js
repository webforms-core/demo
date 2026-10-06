import { WebForms } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    form.setTextColor("<li>*", "green");

    return `
        <b>Main page</b>
        <p>WebForms Core initially introduced as a Server-Command/Client-Execution technology, 
        WebForms Core focused on unifying UI logic across different back-end languages while keeping the front-end lightweight. 
        With the release of version 2, this vision takes a major step forward.</p>
    `
    + form.exportToHtmlComment();
}
