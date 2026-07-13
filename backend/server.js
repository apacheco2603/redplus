import express from 'express';
import cors from 'cors';
import { readDb, writeDb } from './db.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- USUARIOS ---
app.post('/api/users/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDb();
  const user = db.usuarios.find(
    u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
  );
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos.' });
  }
});

app.post('/api/users/register', (req, res) => {
  const { username, password } = req.body;
  const db = readDb();
  
  if (db.usuarios.some(u => u.username.toLowerCase() === username.trim().toLowerCase())) {
    return res.status(400).json({ success: false, message: 'El usuario ya existe.' });
  }

  const newUser = {
    username: username.trim(),
    password,
    bio: '¡Hola! Soy nuevo en RedPlus.',
    avatar: '👤',
    habilities: []
  };

  db.usuarios.push(newUser);
  writeDb(db);
  res.json({ success: true, user: newUser });
});

app.get('/api/users', (req, res) => {
  const db = readDb();
  const publicUsers = db.usuarios.map(({ username, bio, avatar, habilities }) => ({
    username, bio, avatar, habilities
  }));
  res.json(publicUsers);
});

app.put('/api/users/profile', (req, res) => {
  const { username, bio, avatar, habilities } = req.body;
  const db = readDb();
  const index = db.usuarios.findIndex(u => u.username === username);

  if (index !== -1) {
    db.usuarios[index] = { ...db.usuarios[index], bio, avatar, habilities };
    writeDb(db);
    res.json({ success: true, user: db.usuarios[index] });
  } else {
    res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
  }
});

// --- COMUNIDADES ---
app.get('/api/communities', (req, res) => {
  const db = readDb();
  res.json(db.comunidades);
});

app.post('/api/communities', (req, res) => {
  const { id, name, desc } = req.body;
  const db = readDb();
  
  if (db.comunidades.some(c => c.id === id || c.name.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({ success: false, message: 'El ID o nombre de comunidad ya existe.' });
  }

  const newComm = { id, name, desc, members: [] };
  db.comunidades.push(newComm);
  writeDb(db);
  res.json({ success: true, community: newComm });
});

app.post('/api/communities/:id/join', (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  const db = readDb();
  const comm = db.comunidades.find(c => c.id === id);

  if (!comm) return res.status(404).json({ message: 'Comunidad no encontrada.' });

  if (!comm.members) comm.members = [];

  const memberIndex = comm.members.indexOf(username);
  if (memberIndex === -1) {
    comm.members.push(username); // unirse
  } else {
    comm.members.splice(memberIndex, 1); // salir
  }

  writeDb(db);
  res.json({ success: true, community: comm });
});

// --- PUBLICACIONES ---
app.get('/api/posts', (req, res) => {
  const db = readDb();
  res.json(db.posts);
});

app.post('/api/posts', (req, res) => {
  const { author, title, body: content, communityId } = req.body;
  const db = readDb();

  const newPost = {
    id: Date.now(),
    author,
    communityId: communityId || 'general',
    title,
    body: content,
    likes: 0,
    usuariosLike: [],
    comentarios: []
  };

  db.posts.unshift(newPost);
  writeDb(db);
  res.json({ success: true, post: newPost });
});

app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, body: content } = req.body;
  const db = readDb();
  const post = db.posts.find(p => p.id === parseInt(id));

  if (post) {
    post.title = title;
    post.body = content;
    writeDb(db);
    res.json({ success: true, post });
  } else {
    res.status(404).json({ success: false, message: 'Publicación no encontrada.' });
  }
});

app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.posts = db.posts.filter(p => p.id !== parseInt(id));
  writeDb(db);
  res.json({ success: true });
});

app.post('/api/posts/:id/like', (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  const db = readDb();
  const post = db.posts.find(p => p.id === parseInt(id));

  if (post) {
    if (!post.usuariosLike) post.usuariosLike = [];
    const index = post.usuariosLike.indexOf(username);
    if (index === -1) {
      post.usuariosLike.push(username);
      post.likes += 1;
    } else {
      post.usuariosLike.splice(index, 1);
      post.likes -= 1;
    }
    writeDb(db);
    res.json({ success: true, post });
  } else {
    res.status(404).json({ success: false, message: 'Publicación no encontrada.' });
  }
});

// --- COMENTARIOS ---
app.post('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const { autor, texto } = req.body;
  const db = readDb();
  const post = db.posts.find(p => p.id === parseInt(id));

  if (post) {
    const newComment = {
      id: Date.now(),
      autor,
      texto
    };
    if (!post.comentarios) post.comentarios = [];
    post.comentarios.push(newComment);
    writeDb(db);
    res.json({ success: true, comment: newComment, post });
  } else {
    res.status(404).json({ success: false, message: 'Publicación no encontrada.' });
  }
});

app.put('/api/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  const { texto } = req.body;
  const db = readDb();
  const post = db.posts.find(p => p.id === parseInt(postId));

  if (post) {
    const comment = post.comentarios.find(c => c.id === parseInt(commentId));
    if (comment) {
      comment.texto = texto;
      writeDb(db);
      res.json({ success: true, comment, post });
    } else {
      res.status(404).json({ success: false, message: 'Comentario no encontrado.' });
    }
  } else {
    res.status(404).json({ success: false, message: 'Publicación no encontrada.' });
  }
});

app.delete('/api/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  const db = readDb();
  const post = db.posts.find(p => p.id === parseInt(postId));

  if (post) {
    post.comentarios = post.comentarios.filter(c => c.id !== parseInt(commentId));
    writeDb(db);
    res.json({ success: true, post });
  } else {
    res.status(404).json({ success: false, message: 'Publicación no encontrada.' });
  }
});

// --- MENSAJES PRIVADOS ---
app.get('/api/messages', (req, res) => {
  const { user } = req.query;
  const db = readDb();
  
  if (user) {
    const filtered = db.mensajes.filter(
      m => m.senderId === user || m.receiverId === user
    );
    res.json(filtered);
  } else {
    res.json(db.mensajes);
  }
});

app.post('/api/messages', (req, res) => {
  const { senderId, receiverId, text } = req.body;
  const db = readDb();

  const newMsg = {
    id: Date.now(),
    senderId,
    receiverId,
    text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  db.mensajes.push(newMsg);
  writeDb(db);
  res.json({ success: true, message: newMsg });
});

app.put('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const db = readDb();
  const msg = db.mensajes.find(m => m.id === parseInt(id));

  if (msg) {
    msg.text = text;
    writeDb(db);
    res.json({ success: true, message: msg });
  } else {
    res.status(404).json({ success: false, message: 'Mensaje no encontrado.' });
  }
});

app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.mensajes = db.mensajes.filter(m => m.id !== parseInt(id));
  writeDb(db);
  res.json({ success: true });
});

// --- CHATS DE GRUPO ---
app.get('/api/groups/:groupId/chats', (req, res) => {
  const { groupId } = req.params;
  const db = readDb();
  if (!db.groupChats) db.groupChats = {};
  res.json(db.groupChats[groupId] || [
    { id: 1, emisor: 'System', texto: `¡Bienvenidos al canal de ${groupId}! Reglas: Respeto y compartir código.` }
  ]);
});

app.post('/api/groups/:groupId/chats', (req, res) => {
  const { groupId } = req.params;
  const { emisor, texto } = req.body;
  const db = readDb();
  if (!db.groupChats) db.groupChats = {};
  if (!db.groupChats[groupId]) db.groupChats[groupId] = [];

  const newChatMsg = {
    id: Date.now(),
    emisor,
    texto,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  db.groupChats[groupId].push(newChatMsg);
  writeDb(db);
  res.json({ success: true, message: newChatMsg });
});

// --- RECIENTES ---
app.get('/api/recientes/:username', (req, res) => {
  const { username } = req.params;
  const db = readDb();
  const list = db.recientes[username] || [];
  res.json(list);
});

app.post('/api/recientes/:username', (req, res) => {
  const { username } = req.params;
  const { communityId } = req.body;
  const db = readDb();
  
  if (!db.recientes) db.recientes = {};
  if (!db.recientes[username]) db.recientes[username] = [];

  let list = db.recientes[username].filter(id => id !== communityId);
  list.unshift(communityId);
  db.recientes[username] = list.slice(0, 5);

  writeDb(db);
  res.json({ success: true, recientes: db.recientes[username] });
});

app.listen(PORT, () => {
  console.log(`Backend de RedPlus corriendo en http://localhost:${PORT}`);
});
