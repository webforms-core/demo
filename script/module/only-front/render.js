import { WebForms, HtmlEvent, Fetch, InputPlace } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    form.setCommentEvent("render", HtmlEvent.OnClick, "set-render");
    form.goToIndex("set-render");

    form.startIndex("set-render");

    form.renderClosure(f =>
    {
        f.replace(InputPlace.ROOT, "{{name}}", Fetch.getValue("name"));
        f.replace("-", "{{email}}", Fetch.getValue("email"));
        f.replace("-", "{{phone}}", Fetch.getValue("phone"));
        f.replace("-", "{{age}}", Fetch.getValue("age"));
        f.replace("-", "{{city}}", Fetch.getValue("city"));
        f.replace("-", "{{favorite-color}}", Fetch.getValue("favorite-color"), true);
    }, "user");

    return `
        <style>
            .render-demo {
                max-width: 720px;
                margin: 30px auto;
                font-family: Arial, sans-serif;
            }

            .render-demo h2 {
                margin-bottom: 20px;
            }

            .user-form {
                display: grid;
                grid-template-columns: 160px 1fr;
                gap: 12px 16px;
                padding: 24px;
                border: 1px solid #ddd;
                border-radius: 10px;
                background: #fafafa;
            }

            .user-form label {
                font-weight: bold;
                align-self: center;
            }

            .user-form input {
                box-sizing: border-box;
                width: 100%;
                padding: 9px 11px;
                border: 1px solid #ccc;
                border-radius: 6px;
                font-size: 14px;
            }

            .user-form input:focus {
                outline: none;
                border-color: #888;
            }

            #render {
                grid-column: 2;
                cursor: pointer;
                background: #333;
                color: white;
                border: 1px solid #333;
                font-weight: bold;
            }

            #render:hover {
                background: #555;
            }

            .user-info {
                margin-top: 35px;
                padding: 20px 24px;
                border: 1px solid #ddd;
                border-radius: 10px;
                box-shadow: 0 3px 12px rgba(0, 0, 0, .08);
            }

            .user-info legend {
                padding: 0 10px;
                font-size: 18px;
                font-weight: bold;
            }

            .user-info div,
            .user-info a {
                display: block;
                padding: 7px 0;
            }

            .user-info a {
                color: #1769aa;
            }

            @media (max-width: 600px) {
                .user-form {
                    grid-template-columns: 1fr;
                }

                #render {
                    grid-column: 1;
                }
            }
        </style>

        <div class="render-demo">

            <h2>User</h2>

            <div class="user-form">
                <label for="name">Name:</label>
                <input type="text" id="name" value="Adriano">

                <label for="email">Email:</label>
                <input type="email" id="email" value="example@mail.com">

                <label for="phone">Phone:</label>
                <input type="tel" id="phone" value="001123456789">

                <label for="age">Age:</label>
                <input type="number" id="age" min="1" max="120" value="44">

                <label for="city">City:</label>
                <input type="text" id="city" value="Nagoya">

                <label for="favorite-color">Favorite Color:</label>
                <input type="text" id="favorite-color" value="lightgreen">

                <input type="button" id="render" value="Render">
            </div>

            <fieldset id="user" class="user-info" style="background-color:{{favorite-color}}">
                <legend>User Info:</legend>
                <div>Name: {{name}}</div>
                <a href="mailto:{{email}}">Email: {{email}}</a>
                <div>Phone: {{phone}}</div>
                <div>Age: {{age}}</div>
                <div>City: {{city}}</div>
                <div>Favorite Color: {{favorite-color}}</div>
            </fieldset>

        </div>
    ` + form.exportToHtmlComment();
}
