const Hapi = require('@hapi/hapi');
const NoteService = require('./services/inMemory/NotesService');
const notes = require('./api/notes');
const NotesValidator = require('./validator/notes');

const init = async () => {
  const notesService = new NoteService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();