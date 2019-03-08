
function makeDivs() {
    socket = io.connect('http://localhost');
    socket.on('init', function (data) {
        console.log(data);
        const html = parseElementsFromServer(data);
        const htmlElement = window.document.getElementsByClassName('grid-container')[0];
        htmlElement.innerHTML = html;
    });
}



function parseConnections(connections) {
    return connections.reduce((memo, connection) => {
        if (!connection) {
            return memo;
        }

        return `
            ${memo}
            <li class="${connection.type}">${connection.name}</li>
        `
    }, '')
}

function parseElementsFromServer(elementsFromServer) {
    return Object.entries(elementsFromServer.elements).map(([key, value]) => {
        return `<div class="grid-element">
                    <h1><a href="app?element=${key}">${key}</a></h1>
                    <div>
                        <h2>Connections</h2>
                        ${parseConnections(value.connections)}
                    </div>
                </div>
        `;
    });
}