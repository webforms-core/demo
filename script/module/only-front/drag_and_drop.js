import { WebForms, HtmlEvent, Fetch } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    // Mouse Event
    form.setCommentEvent("dragZone|<div>*", HtmlEvent.OnDragStart, "drag-start");
    form.setCommentEvent("-", HtmlEvent.OnDragEnd, "drag-end");

    form.setPreventDefaultEvent("dragZone", HtmlEvent.OnDragOver);
    form.setCommentEvent("-", HtmlEvent.OnDragOver, "drag-over-back");
    form.setCommentEvent("-", HtmlEvent.OnDragLeave, "drag-leave-back");
    form.setCommentEvent("-", HtmlEvent.OnDrop, "drop-back");

    form.setPreventDefaultEvent("dropZone", HtmlEvent.OnDragOver);
    form.setCommentEvent("-", HtmlEvent.OnDragOver, "drag-over");
    form.setCommentEvent("-", HtmlEvent.OnDragLeave, "drag-leave");
    form.setCommentEvent("-", HtmlEvent.OnDrop, "drop");
    
    form.setCommentEvent("dragZone|<div>*", HtmlEvent.OnTouchStart, "touch-start");

    form.startIndex("drag-start");
    form.saveOuterText("$");
    form.saveId("$", "id");

    form.startIndex("drag-end");
    form.deleteClass("$", "hide");
    form.assignDelay(100);

    form.startIndex("drag-over");
    form.insertClass("dropZone", "highlight");

    form.startIndex("drag-leave");
    form.deleteClass("dropZone", "highlight");

    form.startIndex("drop");
    form.delete(Fetch.save("id"));
    form.addText("dropZone", Fetch.save());

    form.startIndex("drag-over-back");
    form.insertClass("dragZone", "highlight");

    form.startIndex("drag-leave-back");
    form.deleteClass("dragZone", "highlight");

    form.startIndex("drop-back");
    form.delete(Fetch.save("id"));
    form.addText("dragZone", Fetch.save());
     
    form.startIndex("touch-start");
    form.elementExists("dragZone|{{id}}");
    form.assignReplace("{{id}}", Fetch.getId("$"));
    form.addText("dropZone", Fetch.getOuterText("$"));
    form.else();
    form.addText("dragZone", Fetch.getOuterText("$"));
    form.delete("$");

    return `
        <style>
            #dropZone, #dragZone {
                width: 100%;
                max-width: 600px;
                height: auto;
                min-height: 200px;
                border: 2px dashed #ccc;
                border-radius: 5px;
                text-align: center;
                padding: 20px;
                margin: 20px auto;
            }

            #dropZone.highlight, #dragZone.highlight {
                border-color: #4CAF50;
                background-color: #f8f8f8;
            }

            .dragitem {
                width: 100px;
                height: 100px;
                background-color: #4CAF50;
                color: white;
                text-align: center;
                line-height: 100px;
                cursor: move;
                margin: 20px auto;
            }

            .hide {
                display: none;
            }
        </style>
        
        <h2>Drag and Drop</h2>
        <blockquote>With a mouse, items are moved via drag and drop; with touch, they are moved by a direct tap.</blockquote>
        <div id="dragZone">
            <div class="dragitem" id="dragitem1" draggable="true">Drag me! 1</div>
            <div class="dragitem" id="dragitem2" draggable="true">Drag me! 2</div>
            <div class="dragitem" id="dragitem3" draggable="true">Drag me! 3</div>
            <div class="dragitem" id="dragitem4" draggable="true">Drag me! 4</div>
        </div>

        <div id="dropZone">Drop here</div>
    ` + form.exportToHtmlComment();
}
