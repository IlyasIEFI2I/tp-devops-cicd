const app = require('./app');
const { initDb } = require('./db');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log(`DEBUG: APP_NAME=` + (process.env.APP_NAME || 'MiniAPI'));
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
