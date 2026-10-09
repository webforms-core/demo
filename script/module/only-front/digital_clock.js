import { WebForms, Fetch } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    form.addSaveValue("clock-format", "{{Hour}}:{{Minute}}:{{Second}}");

    form.replaceSaveValue("clock-format", "{{Hour}}", Fetch.DATE_HOURS);
    form.replaceSaveValue("clock-format", "{{Minute}}", Fetch.DATE_MINUTES);
    form.replaceSaveValue("clock-format", "{{Second}}", Fetch.DATE_SECONDS);
    form.setFormatSaveValue("clock-format", "(^|:)(\\d)(?=:|$)", "$$10$2");

    form.elementNotExists("Clock");
    form.break();

    form.setText("Clock", Fetch.save("clock-format"));

    form.delay(1000);
    form.goTo(1, 31536000);

    return `
        <h2>Digital Clock</h2>

        <div id="Clock"></div>

        <style>
            main {
                min-height: 420px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 30px 16px;
                background: #111;
                color: #fff;
                font-family: Arial, sans-serif;
                text-align: center;
            }

            h1 {
                max-width: 100%;
                margin: 0 0 30px;
                font-size: clamp(18px, 4vw, 28px);
                font-weight: normal;
                overflow-wrap: anywhere;
            }

            #Clock {
                max-width: 100%;
                padding: clamp(16px, 5vw, 30px) clamp(12px, 8vw, 81px);
                border: 2px solid #333;
                border-radius: 12px;
                background: #000;
                color: #00ff66;
                font-family: "Courier New", monospace;
                font-size: clamp(28px, 9vw, 64px);
                font-weight: bold;
                letter-spacing: clamp(1px, 1vw, 6px);
                white-space: nowrap;
                box-shadow:
                    0 0 15px rgba(0, 255, 102, 0.25),
                    inset 0 0 20px rgba(0, 255, 102, 0.08);
                text-shadow:
                    0 0 5px #00ff66,
                    0 0 15px rgba(0, 255, 102, 0.7);
            }

            @media (max-width: 360px) {
                h1 {
                    margin-bottom: 22px;
                }

                #Clock {
                    letter-spacing: 0;
                    padding: 16px 10px;
                }
            }
        </style>
    ` + form.exportToHtmlComment();
}
