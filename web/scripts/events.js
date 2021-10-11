var canvas = new fabric.Canvas('c');
var socket = io();

var currentlyHovering = false;

var mouseDown = false;

var previousDrawX = -1;
var previousDrawY = -1;

var linesToDelete = [];

// Events setup
canvas.on('mouse:over', e => {
    if (mode != 'select') return;

    if (!e?.target?.id) return;

    currentlyHovering = true;
    
    e.target.set('opacity', '0.7');
    sendUpdate(e);
    
    canvas.renderAll();
});

canvas.on('mouse:up', e => {
    mouseDown = false;

    // Reset draw points
    previousDrawX = -1;
    previousDrawY = -1;

    if (mode != 'select') return;
    if (!e?.target?.id) return;
    
    sendUpdate(e);

    canvas.renderAll();
});

canvas.on('mouse:out', e => {
    if (mode != 'select') return;
    if (!e?.target?.id) return;

    currentlyHovering = false;

    e.target.set('opacity', '1');
    sendUpdate(e);

    canvas.renderAll();
});

canvas.on('mouse:dblclick', e => {
    if (mode != 'select') return;

    // If we are not on an object, create text
    if (!currentlyHovering) {
        canvas.add(new fabric.IText('Text',{
            left: e.pointer.x,
            top: e.pointer.y, 
            fill: fillColor,
            id: ''+Math.random()
        }));

        canvas.renderAll();
    }
});

canvas.on('path:created', e => {
    e.path.id = ''+Math.random();
    e.path.type = 'path';

    // Find our added drawing
    const addedDrawing = canvas.getObjects().filter(o => o.id == e.path.id)[0];

    // Send update to server
    sendRawUpdate({ id: e.path.id, object: addedDrawing });
});

canvas.on('mouse:down', e => {
    mouseDown = true;
});

// On mouse down, moving, and drawing
canvas.on('mouse:move', e => {
    if (!mouseDown || !canvas.isDrawingMode) return;

    console.log('Moving and drawing at', canvas.getPointer(e));
    const { x, y } = canvas.getPointer(e);

    // Use current x or y if they are -1
    previousDrawX = previousDrawX == -1 ? x : previousDrawX;
    previousDrawY = previousDrawY == -1 ? y : previousDrawY;

    const lineId = Math.random() + '';
    linesToDelete.push(lineId);

    const lineArray = [previousDrawX, previousDrawY, x, y];
    const lineProperties = {
        fill: 'red',
        stroke: 'red',
        strokeWidth: 5,
        id: lineId,
    }

    sendRawUpdate({ id: lineId, object: { type: 'drawing', lineArray, lineProperties } });

    previousDrawX = x;
    previousDrawY = y;

    // TODO: Send for deletion after path is fully created and the mouse is up again
    // socket.emit('generic', { x, y, type: 'drawing' });
});

const sendRawUpdate = object => {
    socket.emit('object-event', object);
}

const sendUpdate = e => {
    socket.emit('object-event', { id: e.target.id, object: e.target });
}

const drawingClick = () => {
    mode = 'draw';

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    
    console.log('mode is now ', mode);
}

const selectClick = () => {
    mode = 'select';
    canvas.isDrawingMode = false;
    console.log('mode is now ', mode);
}

var colorSelect = document.getElementById("colorSelect");

const watchColor = e => {
    fillColor = e.target.value;
    canvas.freeDrawingBrush.color = fillColor;
}

colorSelect.addEventListener("change", watchColor);