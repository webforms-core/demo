import { WebForms, HtmlEvent, Fetch } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    form.setCommentEventListener("GameArea", "mutationobserver", "end");
    form.setCommentEvent("Start", HtmlEvent.OnClick, "start");

    form.startIndex("start");
    reset(form);
    form.setText("Finall", "");
    form.setValue("PointsValue", "0");
    form.setText("Points|<span>", Fetch.getValue("PointsValue"));
    form.setValue("SpeedValue", "5");
    form.setText("Speed|<span>", Fetch.getValue("SpeedValue"));
    initialization(form);
    form.increaseWidth("{pusher}-1", 5);
    form.assignInterval(100, "pusher");

    form.startIndex("popping");
    form.increaseValue("PointsValue", 1);
    form.setText("Points|<span>", Fetch.getValue("PointsValue"));
    form.increaseValue("SpeedValue", 1);
    form.setText("Speed|<span>", Fetch.getValue("SpeedValue"));
    form.delete("$/");
    initialization(form);

    form.startIndex("end");
    form.setText("Finall", "@:Your point is: " + form.inject(Fetch.getText("Points|<span>")));
    reset(form);

    return `
        <style>
            #GameArea
            {
                height:720px;
                width: 100%;
                max-width:1280px;
                background-color:lightblue;
                overflow-x:auto;
                white-space:nowrap;
                display:inline-block;
            }

            #Finall
            {
                color:green;
            }

            .bubblebox
            {
                width:100%;
                height:100px;
            }

            .bubble
            {
                width:100px;
                height:100px;
                background-color:#c9e83b;
                border-radius:50%;
                box-shadow:-10px 0px 10px rgba(0,0,0,0.3);
                float:left;
                position:relative;
                overflow:hidden;
            }

            .bubble::before,
            .bubble::after
            {
                content:"";
                position:absolute;
                width:120px;
                height:60px;
                border:4px solid white;
                border-radius:50%;
            }

            .bubble::before
            {
                top:-10px;
                left:-35px;
                transform:rotate(45deg);
            }

            .bubble::after
            {
                bottom:-10px;
                right:-35px;
                transform:rotate(45deg);
            }

            .pusher
            {
                width:100px;
                height:100px;
                float:left;
            }

            .bubblebox[bubblerow="1"] { margin-top:100px; }
            .bubblebox[bubblerow="2"] { margin-top:200px; }
            .bubblebox[bubblerow="3"] { margin-top:300px; }
            .bubblebox[bubblerow="4"] { margin-top:400px; }
            .bubblebox[bubblerow="5"] { margin-top:500px; }
            .bubblebox[bubblerow="6"] { margin-top:600px; }
        </style>

        <h2>Bubble Popping Game</h2>

        <div id="GameArea"></div>
        <br/>
        <b id="Points">Points: <span>0</span></b>
        <b id="Speed">Speed: <span>5</span></b>
        <b id="Finall"></b>

        <input id="PointsValue" type="hidden" value="0">
        <input id="SpeedValue" type="hidden" value="5">
        <input id="Start" type="button" value="Start New">
    ` + form.exportToHtmlComment();
}

function initialization(form)
{
    form.addTag("GameArea", "div");
    form.setClass("GameArea|<div>-1", "bubblebox");
    form.setAttribute("{bubblebox}-1", "bubblerow", Fetch.random(1, 8));

    form.addTag("{bubblebox}-1", "div");
    form.setClass("{bubblebox}-1|<div>-1", "pusher");

    form.addTag("{bubblebox}-1", "div");
    form.setClass("{bubblebox}-1|<div>-1", "bubble");

    form.setCommentEvent("{bubble}-1", HtmlEvent.OnMouseEnter, "popping");

    form.increaseWidth("{pusher}-1", 1);
    form.assignInterval(10, "pusher-pluse");

    form.createCustomDOMEvent(
        "{pusher}-1",
        "widthOverflow",
        "style",
        "width",
        "greater",
        "1100",
        "",
        true,
        200
    );

    form.setCommentEventListener("{pusher}-1", "widthOverflow", "end");
}

function reset(form)
{
    form.elementExists("GameArea|<div>");
    form.delete("GameArea|<div>");
    form.deleteInterval("pusher");
    form.deleteInterval("pusher-pluse");
}
