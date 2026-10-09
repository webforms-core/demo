import { WebForms, Fetch } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    form.addSaveValue("clock-format", "{{Hour}}:{{Minute}}:{{Second}}");

    form.replaceSaveValue("clock-format", "{{Hour}}", Fetch.dateHours);
    form.replaceSaveValue("clock-format", "{{Minute}}", Fetch.dateMinutes);
    form.replaceSaveValue("clock-format", "{{Second}}", Fetch.dateSeconds);
    form.setFormatSaveValue("clock-format", "(^|:)(\\d)(?=:|$)", "$$10$2");

    form.setText("Clock", Fetch.save("clock-format"));

    form.delay(1000);
    form.goTo(1, 31536000);

    return `
        <h1>WebForms Core Technology in JavaScript</h1>

        <div id="Clock"></div>

        <style>
            main {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: #111;
                color: #fff;
                font-family: Arial, sans-serif;
            }

            h1 {
                margin-bottom: 30px;
                font-size: 28px;
                font-weight: normal;
            }

            #Clock {
                padding: 30px 45px;
                border: 2px solid #333;
                border-radius: 12px;
                background: #000;
                color: #00ff66;
                font-family: "Courier New", monospace;
                font-size: 64px;
                font-weight: bold;
                letter-spacing: 6px;
                box-shadow:
                    0 0 15px rgba(0, 255, 102, 0.25),
                    inset 0 0 20px rgba(0, 255, 102, 0.08);
                text-shadow:
                    0 0 5px #00ff66,
                    0 0 15px rgba(0, 255, 102, 0.7);
            }
        </style>
    ` + form.exportToHtmlComment();
}