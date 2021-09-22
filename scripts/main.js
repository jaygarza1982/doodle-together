var canvas = new fabric.Canvas('c');
var rect = new fabric.Rect();

canvas.on('mouse:over', e => {
    e.target.set('opacity', '0.7');
    canvas.renderAll();
});

canvas.on('mouse:up', e => {
    const { id, left, top, width, height } = e.target;

    console.log('Moved id', id, left, top, width, height);
});

canvas.on('mouse:out', e => {
    e.target.set('opacity', '1');
    canvas.renderAll();
});

const getRandom = () => { return Math.random() * 50; }

for (let i = 0; i < 15; i++) {
    canvas.add(new fabric.Rect({
        id: getRandom(),
        left: getRandom(),
        top: getRandom(),
        width: getRandom(),
        height: getRandom()
    }));
}
