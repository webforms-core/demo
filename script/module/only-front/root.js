import { WebForms, HtmlEvent, HtmlEventListener, InputPlace, Fetch } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    // For small screens only
    form.setCommentEvent("<nav>|<a>*", HtmlEvent.OnClick, "close-menu");
    form.setCommentEvent("-", HtmlEvent.OnTouchStart, "close-menu");

    form.setCommentEventListener(InputPlace.WINDOW, HtmlEventListener.HashChange, "hash-change");
    form.goToIndex("hash-change");
    
    form.startIndex("close-menu");
    form.setChecked("menu-toggle", false);

    form.startIndex("hash-change");

    form.exist(Fetch.HASH);
    form.startBracket();
        form.addSaveValue("hash", Fetch.HASH);
        form.setTextOperationSaveValue("hash", "textafter", '#');
        form.callFront("/demo/script/module/only-front/{{path}}.js", "", "<main>");
        form.assignReplace("{{path}}", Fetch.save("hash"));
    form.endBracket();
    form.else();
        form.callFront("/demo/script/module/only-front/main.js", "", "<main>"); // Set default page

    SetResponse(evt, form.exportToHtmlComment(), "comment");
}

PageLoad();
