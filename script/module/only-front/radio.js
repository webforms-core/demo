import { WebForms, HtmlEvent, Fetch } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    form.notExist(Fetch.cache("radio-data"));
    form.addCacheValue("radio-data", Fetch.loadUrl("/demo/api/radio.json"));

    form.forEach("[0]", Fetch.cache("radio-data"), "foreach-data");

    form.startBracket();
        form.addText("{radio-container}", Fetch.loadHtml("/demo/api/template.html", "Radio"));
        form.bindJSONToTemplate(
            "{radio-card}-1",
            Fetch.formatStore("foreach-data"),
            "[0]",
            "{{value}}"
        );
        form.setCommentEvent(
            "{radio-card}-1|<>",
            HtmlEvent.OnClick,
            "play-radio"
        );
    form.endBracket();

    form.startIndex("play-radio");

    form.setAttribute("audio", HtmlEvent.OnLoadStart, "this.play()");
    form.setAttribute("audio", "src", Fetch.getAttribute("$", "data-stream"));
    form.setText("radio-name", Fetch.getText("$"));

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>WebForms Core Radio</title>

            <style>
                * main {
                    box-sizing: border-box;
                }

                main {
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                    margin: 60px auto;
                    background: #101114;
                    color: #fff;
                }

                h1 {
                    margin-bottom: 24px;
                    font-size: 32px;
                }

                .radio-container {
                    display: grid;
                    gap: 12px;
                }

                .radio-card {
                    border: 1px solid #2d3036;
                    border-radius: 14px;
                    background: #181a1f;
                    transition: 0.2s;
                }

                .radio-card:hover {
                    background: #22252b;
                    border-color: #555a63;
                    transform: translateY(-2px);
                }

                .radio-card b {
                    display: block;
                    font-size: 18px;
                    margin: 0 24px;
                    line-height: 64px;
                    cursor: pointer;
                }

                audio {
                    width: 100%;
                    margin-top: 28px;
                }

                #now-playing {
                    margin: 14px auto 0;
                    padding: 10px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    border-radius: 10px;
                    background: #181818;
                    color: #f2f2f2;
                    font-size: 15px;
                    font-weight: 600;
                    letter-spacing: 0.2px;
                }

                .speaker-icon {
                    font-size: 18px;
                }

                .playing-indicator {
                    font-size: 11px;
                    animation: blink 1s infinite;
                }

                @keyframes blink {
                    0%, 100% {
                        opacity: 1;
                    }

                    50% {
                        opacity: 0.2;
                    }
                }

                #radio-name {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            </style>
        </head>

        <body>

            <main>
                <h1>Radio Stations in JavaScript</h1>
                <h2>Building a Radio Player with WebForms Core</h2>

                <div class="radio-container"></div>

                <audio id="audio" controls></audio>

                <div id="now-playing">
                    <span class="playing-indicator">●</span>
                    <span class="speaker-icon">🔊</span>
                    <span id="radio-name">No radio selected</span>
                </div>
            </main>

        </body>
        </html>
    ` + form.exportToHtmlComment();
}
