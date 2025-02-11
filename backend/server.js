import express from 'express';
import { deleteMessage, setRestrictions, restoreMessage } from './routes/moderation.js';

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// Route for the root GET request
app.get('/', (req, res) => {
  res.json({ message: 'Chainfren TV Chat Moderation Backend API.' });
});
// Route for setting restrictions
app.post('/livepeer/setrestrictions', setRestrictions);

//  Route for deleting a message
app.post('/livepeer/delete', deleteMessage);

//  Route for restoring a message
app.post('/livepeer/restore', restoreMessage);

// Start the server
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`serving at http://localhost:${PORT}`);
});
