import { WebForms } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    form.setBackgroundColor("<main>", "lightgreen");

    return `
        <b>License page</b>
        <p>All Elanat products are licensed under MIT.</p>
    `
    + form.exportToHtmlComment();
}
