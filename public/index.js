

window.onload = function () {
    /* Load elements from the server*/
    socket = io.connect('http://localhost');
    socket.on('init', function (data) {
        console.log(data);
        //const elements = parseElementsFromServer(data);
        console.log(elements);
    });
}

function parseElementsFromServer(elementsFromServer) {
    return Object.entries(elementsFromServer.elements).map(([key, value]) => {
        // console.log(key);
        // console.log(value);
    });
}
