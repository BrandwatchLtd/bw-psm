
function makeDivs() {
    socket = io.connect('http://localhost');
    socket.on('init', function (data) {
        console.log(data);
        const html = parseElementsFromServer(data);
        const htmlElement = window.document.getElementsByClassName('grid-container')[0];
        htmlElement.innerHTML = html;
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseConnections(connections) {
    return connections.reduce((memo, connection) => {
        if (!connection) {
            return memo;
        }

        return `
            ${memo}
            <li class="${connection.type}">${capitalizeFirstLetter(connection.name)}</li>
        `
    }, '')
}

function parseElementsFromServer(elementsFromServer) {
    return Object.entries(elementsFromServer.elements).map(([key, value]) => {
        return `
            <h1>${key}</h1>
            <div>
                <h2>Connection</h2>
                ${parseConnections(value.connections)}
            </div>
        `;
    });
}