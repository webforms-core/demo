import { WebForms, HtmlEvent } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    function root() {
        const path = window.location.hash.substring(1) || "main";
        FrontBack(null, `/demo/script/module/only-front/${path}.js`);
    }

    window.addEventListener("hashchange", root);

    root();

    const form = new WebForms();

    // For small screens only
    form.setCommentEvent("<nav>|<a>*", HtmlEvent.OnClick, "close-menu");

    form.startIndex("close-menu");
    form.setChecked("menu-toggle", false);

    return form.response();
}
