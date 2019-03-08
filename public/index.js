

window.onload = function () {
    /* Load elements from the server*/
    socket = io.connect('http://localhost');
    socket.on('init', function (data) {
        console.log(data);
        // const elements = parseElementsFromServer(data);
        // console.log(elements);
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
    return Object.entries(elementsFromServer).map(([key, value]) => {
        return `
            <h1>${key}</h1>
            <div>
                <h2>Connection</h2>
                ${parseConnections(value.connections)}
            </div>
        `;
    });
}