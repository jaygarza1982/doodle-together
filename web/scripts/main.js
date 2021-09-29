
const typeAction = {
    'i-text': object => {
        canvas.add(new fabric.IText(object.text, object));
    },
    'rect': object => {
        canvas.add(new fabric.Rect(object));
    },
};

(async () => {
    try {
        // Request all drawings
        const objectsFetch = await fetch('/api/objects');
        const objects = await objectsFetch.json();

        for (const id in objects) {
            const object = objects[id];

            // Make type a rect if nothing
            const type = object?.type ? object.type : 'rect';

            console.log(type);

            typeAction[type](object);
        }

        // Setup socket events
        socket.on('object-event', msg => {
            console.log('object-event', msg);

            // Get user drawing that was updated
            const toUpdate = canvas.getObjects().find(d => d.id == msg.id);
            
            if (toUpdate) {
                toUpdate.set(msg.object);
                toUpdate.setCoords();
            }
            // If we did not find our object, add it based on the type
            else {
                const type  = msg?.object?.type ? msg.object.type : 'rect';

                typeAction[type](msg.object);
            }

            canvas.renderAll();
        });
    } catch (error) {
        console.log(error);
    }
})();