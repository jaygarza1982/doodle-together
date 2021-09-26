var canvas = new fabric.Canvas('c');
var rect = new fabric.Rect();

canvas.on('mouse:over', e => {
    if (!e?.target?.id) return;
    
    e.target.set('opacity', '0.7');
    socket?.emit('object-event', e.target);
    
    canvas.renderAll();
});

canvas.on('mouse:up', e => {
    if (!e?.target?.id) return;
    
    socket?.emit('object-event', e.target);
});

canvas.on('mouse:out', e => {
    if (!e?.target?.id) return;

    e.target.set('opacity', '1');
    socket?.emit('object-event', e.target);

    canvas.renderAll();
});

const getRandom = (max) => { return Math.random() * (max ? max : 500); }

for (let i = 0; i < 15; i++) {
    canvas.add(new fabric.Rect({
        id: getRandom(),
        left: getRandom(),
        top: getRandom(),
        width: getRandom(100),
        height: getRandom(100)
    }));
}
