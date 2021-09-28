var canvas = new fabric.Canvas('c');
var socket = io();

var currentlyHovering = false;

// Events setup
canvas.on('mouse:over', e => {
    if (!e?.target?.id) return;

    currentlyHovering = true;
    
    e.target.set('opacity', '0.7');
    sendUpdate(e);
    
    canvas.renderAll();
});

canvas.on('mouse:up', e => {
    if (!e?.target?.id) return;
    
    sendUpdate(e);

    canvas.renderAll();
});

canvas.on('mouse:out', e => {
    if (!e?.target?.id) return;

    currentlyHovering = false;

    e.target.set('opacity', '1');
    sendUpdate(e);

    canvas.renderAll();
});

canvas.on('mouse:dblclick', e => {
    // If we are not on an object, create text
    if (!currentlyHovering) {
        canvas.add(new fabric.IText('Text',{
            left: e.pointer.x,
            top: e.pointer.y, 
            fill: 'black',
            id: ''+Math.random()
        }));

        canvas.renderAll();
    }
});

const sendUpdate = e => {
    socket.emit('object-event', { id: e.target.id, object: e.target });
}
