const Discuss = require('../models/discuss.model');

const socketService = (socket) => {
  socket.on('discuss: connect', async (resumeId) => {
    socket.join(resumeId);
    const discuss = await Discuss.find({ resumeId }).select('-_id name message');
    _io.in(resumeId).emit('discuss: message', discuss);
  });

  socket.on('discuss: message', async ({ resumeId, name = 'guest', message }) => {
    await Discuss.create({
      resumeId,
      name,
      message,
    });
    socket.join(resumeId);
    _io.in(resumeId).emit('discuss: new message', { name, message });
  });

  socket.on('disconnect', () => {
    // console.log('disconnect to server');
  });
};
module.exports = socketService;
