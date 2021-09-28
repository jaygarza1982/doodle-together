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

            if (type == 'i-text') {
                canvas.add(new fabric.IText(object.text, object));
            }
            else if (type == 'rect') {
                canvas.add(new fabric.Rect(object));
            }
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
            else {
                // TODO: Parse if this really is a new text object
                // Or if it is a different type of object

                // When adding a new text object, the text must be set as the first parameter
                canvas.add(new fabric.IText(msg.object.text, msg.object));
            }

            canvas.renderAll();
        });
    } catch (error) {
        console.log(error);
    }
})();