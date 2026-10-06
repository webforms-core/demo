import { WebForms } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const sales = [
        ["Sunday", 55],
        ["Monday", 95],
        ["Tuesday", 40],
        ["Wednesday", 70],
        ["Thursday", 30],
        ["Friday", 50],
        ["Saturday", 80]
    ];

    const form = new WebForms();

    form.GenerateBarChart("ChartBox", sales, "Weekly sales");

    return `
        <div id="ChartBox"></div>
    ` + form.exportToHtmlComment();
}

WebForms.prototype.GenerateBarChart = function(inputPlace, data, tableName)
{
    this.addTag(inputPlace, "b");

    this.addStyle(
        inputPlace + "|<b>",
        "background-color:#fafafa;border:1px solid #ddd;padding:5px;"
    );

    this.setText("-", tableName);

    this.addTag(inputPlace, "div");

    const chart = inputPlace + "|.<div>-1";

    this.addStyle(
        chart,
        "width:600px;height:300px;display:flex;align-items:flex-end;gap:15px;padding:20px;border:1px solid #ddd;background:#fafafa;"
    );

    const column = chart + "|.<div>-1";
    const bar = column + "|.<div>-1";

    data.forEach(() =>
    {
        this.addTag(chart, "div");

        this.addStyle(
            column,
            "height:100%;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;"
        );

        this.addTag(column, "div");

        this.addStyle(
            bar,
            "width:60px;border-radius:4px;display:flex;align-items:center;justify-content:center;background:#4CAF50;"
        );

        this.addTag(bar, "span");

        this.addStyle(
            bar,
            "color:white;font-size:12px;font-weight:bold;"
        );

        this.addTag(column, "label");

        this.addStyle(
            column,
            "margin-top:8px;font-size:12px;color:#333;text-align:center;"
        );
    });

    data.forEach((item, i) =>
    {
        const column = chart + "|.<div>" + i;
        const bar = column + "|.<div>";

        this.setHeight(bar, item[1] * 2);
        this.setText(bar + "|.<span>", item[1].toString());
        this.setText(column + "|.<label>", item[0]);
    });
};
