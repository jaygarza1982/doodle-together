
exports.eventAction = (msg, drawings) => {
    const actionMap = {
        'delete': msg => {
            const { idArray } = msg;

            idArray.forEach(id => {
                delete drawings[id];
            });
        }
    }

    // If we have this type in our action map, perform the action
    if (actionMap[msg.type]) actionMap[msg.type](msg);
}
