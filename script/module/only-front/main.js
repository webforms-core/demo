import { WebForms } from "/demo/script/module/WebForms.js";

export function PageLoad(evt)
{
    const form = new WebForms();

    form.setTextColor("MainPage", "#573714");

    return `
<div id="MainPage">
    <h2>What is WebForms Core?</h2>
    <p>
    WebForms Core is a server-orchestrated UI technology for building interactive HTML interfaces from server-side code. It was introduced by Elanat in 2024 with a different approach to web UI development: instead of moving UI logic into a separate client-side application, the server remains responsible for orchestrating the interface while the browser executes lightweight commands against the HTML DOM.
    </p>
    <p>
    The architecture is based on two main parts: the <b>Commander</b> and the <b>Executor</b>. WebForms Core Commander implementations are available for different web programming languages and generate commands that describe what should happen to the interface. WebFormsJS is the Executor. It receives and executes those commands in the browser and applies the required changes directly to the HTML DOM.
    </p>
    <p>
    This Server-Command/Client-Execution model keeps the communication between the server and browser focused on UI actions rather than requiring the server to maintain a representation of the browser DOM. Commands can create, modify, remove, move, and interact with HTML elements, and they can be executed sequentially as the interface changes.
    </p>
    <p>
    WebForms Core is designed to be language-agnostic. The same UI architecture can be used with different server-side programming languages, allowing developers to keep their preferred backend technology while using a common approach to interactive HTML interfaces.
    </p>
    <p>
    Unlike approaches that require a separate frontend application, WebForms Core does not require React, Vue, Angular, JSX, a Virtual DOM, or a frontend build system. HTML remains HTML, while WebForms Core provides the command layer that allows the server to control the interface.
    </p>
    <p>
    WebForms Core is also designed around a stateless and RESTful architecture. The server does not need to maintain a server-side copy of the browser DOM or a persistent UI state. Applications can use HTTP, WebSocket, and Server-Sent Events depending on their communication requirements.
    </p>
    <p>
    WebForms Core commands can work with HTML elements, attributes, classes, styles, forms, events, templates, stored values, fetched data, and DOM structures. The system also provides mechanisms for conditional execution, loops, asynchronous operations, queues, delays, transient DOM operations, and data manipulation.
    </p>
    <p>
    With WebForms Core 2.2, the rendering model has been expanded with <b>Render</b>, <b>Snapshot</b>, and <b>RollBack</b>. These features provide a structured way to preserve, restore, and reapply DOM structures and changes, making more complex UI rendering scenarios possible without introducing a Virtual DOM.
    </p>
    <p>
    The goal of WebForms Core is not to replace the backend with a client-side framework. It is to provide a different way of thinking about interactive web interfaces: <b>the server decides what should happen, WebFormsJS executes it, and the HTML DOM remains the final interface.</b>
    </p>
    <p>
    WebForms Core is open source and available for multiple web programming languages. The project continues to evolve toward a common, lightweight, server-orchestrated model for building modern web interfaces.
    </p>
</div>
    `
    + form.exportToHtmlComment();
}
