const app = require('./app'); // ඔයාගේ Express App එක
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*' // හැම තැනින්ම එන රික්වෙස්ට් ඇලවු කරනවා (Development වලට ලේසියි)
  }
});

// 🔥 Express routes ඇතුළේ ඉදන් io පාවිච්චි කරන්න පුළුවන් වෙන්න සෙට් කරපු එක පට්ට!
app.set('io', io);
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

io.on('connection', (socket) => {
  console.log('⚡ Client connected:', socket.id);

  // Frontend එකෙන් (Customer/Waiter) අලුත් ඕඩර් එකක් ආවොත් හැන්ඩ්ල් කරන කොටස
  socket.on('newOrder', (data) => {
    console.log('📦 New order received from client:', data);
    io.emit('newOrder', data); // කිචන් එක ඇතුළු හැමෝටම ලයිව් යවනවා
  });

  // Kitchen එකෙන් ඕඩර් එකක් ඉවර කලාම ස්ටේටස් අප්ඩේට් එක හැන්ඩ්ල් කරන කොටස
  socket.on('updateStatus', (data) => {
    console.log('🔄 Status update received:', data);
    io.emit('statusUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000 🚀');
});