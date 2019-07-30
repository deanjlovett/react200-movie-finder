/* eslint no-console: "off" */
const server = require('./server');

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
