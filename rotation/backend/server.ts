console.log("STARTING SERVER.TS");

import app from "./app";


const PORT = process.env.PORT || 4000;

console.log("PORT:", PORT);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});