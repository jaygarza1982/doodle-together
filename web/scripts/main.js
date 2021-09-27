(async () => {
    try {
        // Request all drawings
        const objectsFetch = await fetch('/api/objects');
        const objects = await objectsFetch.json();

        for (const id in objects) {
            canvas.add(new fabric.Rect(objects[id]));
        }

        // Setup socket events
        socket.on('object-event', msg => {
            console.log('object-event', msg);

            // Get user drawing that was updated
            const toUpdate = canvas.getObjects().find(d => d.id == msg.id);
            toUpdate.set(msg.object);
            toUpdate.setCoords();

            canvas.renderAll();
        });
    } catch (error) {
        console.log(error);
    }
})();