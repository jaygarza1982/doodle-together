var canvas = new fabric.Canvas('c');
var socket = io();

// Events setup
canvas.on('mouse:over', e => {
    if (!e?.target?.id) return;

    // TODO: Only execute rest of function if opacity is not 0.7
    // This way, we do not keep sending updates
    
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

    e.target.set('opacity', '1');
    sendUpdate(e);

    canvas.renderAll();
});

const sendUpdate = e => {
    socket.emit('object-event', { id: e.target.id, object: e.target });
}
