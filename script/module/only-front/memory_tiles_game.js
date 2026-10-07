import { WebForms, HtmlEvent, Fetch } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    form.setCommentEvent("<button>*", HtmlEvent.OnClick, "play");
    form.setCommentEvent("reset", HtmlEvent.OnClick, "reload");
    form.removeAllSave();

    form.startIndex("play");

    // First tile
    form.notExist(Fetch.save("first-card"));

    form.startBracket();
    form.saveId("$", "first-id");
    form.saveAttribute("$", "data-card", "first-card");
    form.insertClass("$", "selected");
    form.setDisabled("$", 1);
    form.setText("$", Fetch.getAttribute("$", "data-card"));
    form.break();
    form.endBracket();

    form.exist(Fetch.save("pending"));
    form.break();
    form.else();
    form.addSaveValue("pending", "true");

    form.increase("moves", 1);

    // Second tile
    form.setClass("$", "selected");
    form.setDisabled("$", 1);
    form.setText("$", Fetch.getAttribute("$", "data-card"));

    // Match
    form.isEqualTo(
        Fetch.save("first-card"),
        Fetch.getAttribute("$", "data-card")
    );

    form.startBracket();

    form.increase("matches", 1);
    form.removeSave("first-card");
    form.setText("result", "Good");

    form.isEqualTo("8", Fetch.getText("matches"));
    form.message("🎉 You Win!");

    form.removeSave("pending");
    form.break();
    form.endBracket();

    // No match
    form.delay(800);

    // Return first card
    form.setText(Fetch.save("first-id"), "?");
    form.setClass(Fetch.save("first-id"), "");
    form.setDisabled(Fetch.save("first-id"), 0);
    form.removeSave("first-card");

    // Return second card
    form.setText("$", "?");
    form.setClass("$", "");
    form.setDisabled("$", 0);

    form.setText("result", "Try Again");
    form.setText("moves", Fetch.getText("moves"));
    form.removeSave("pending");
    
    // New game
    form.startIndex("reload");
    form.reloadPage();

    const cards = [
        "🍎", "🍎",
        "🍋", "🍋",
        "🍊", "🍊",
        "🍉", "🍉",
        "🍇", "🍇",
        "🥝", "🥝",
        "🍓", "🍓",
        "🍒", "🍒"
    ];

    // Fisher–Yates Shuffle
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    const board = cards.map((card, index) =>
        `<button id="tag-${index}" class="tile" data-card="${card}">?</button>`
    ).join("");

    return `
        <div style="text-align: center;">
            <h1>Memory Tiles</h1>
    
            <div id="board">
                ${board}
            </div>
    
            <p>Moves: <span id="moves">0</span></p>
            <p id="result"></p>
            <p>Matches: <span id="matches">0</span></p>
    
            <b id="reset">New Game</b>
    
            <style>
                #board {
                    display: grid;
                    grid-template-columns: repeat(4, 80px);
                    gap: 10px;
                    justify-content: center;
                    margin: 30px auto;
                }
    
                .tile {
                    width: 80px;
                    height: 80px;
                    font-size: 32px;
                    cursor: pointer;
                    color: unset !important;
                }
    
                #reset {
                    cursor: pointer;
                }
            </style>
        </div>
    `
    + form.exportToHtmlComment();
}
