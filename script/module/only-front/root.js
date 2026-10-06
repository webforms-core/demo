export function PageLoad(evt)
{
    function root() {
        const path = window.location.hash.substring(1) || "main";
        FrontBack(null, `/demo/script/module/only-front/${path}.js`);
    }

    window.addEventListener("hashchange", root);

    root();

    return "";
}
