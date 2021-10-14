const axios = require('axios');

// Send post every 15 minutes. This will clear the server every 15 minutes
setInterval(() => {
    axios.post('http://doodle-api-server:3000/api/objects/clear').then(() => {
        console.log('Sent delete request');
    }).catch(err => {
    });
}, 1000);
