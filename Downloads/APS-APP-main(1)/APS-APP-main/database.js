import AsyncStorage from "@react-native-async-storage/async-storage";

const DB_KEY = "@barbearia_db";

// ─── Helpers ────────────────────────────────────────────────────────────────

const getDB = async () => {
  try {
    const raw = await AsyncStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : { users: [] };
  } catch (e) {
    console.error("Erro ao ler DB:", e);
    return { users: [] };
  }
};

const saveDB = async (db) => {
  try {
    await AsyncStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    console.error("Erro ao salvar DB:", e);
  }
};

// ─── Cadastro ────────────────────────────────────────────────────────────────

export const registerUser = async ({ nome, senha, tipo }) => {
  if (nome.trim().length < 4)
    return { success: false, message: "Nome deve ter no mínimo 4 caracteres!" };

  if (senha.length < 8 || senha.length > 12)
    return { success: false, message: "Senha deve ter entre 8 e 12 caracteres!" };

  const db = await getDB();

  const exists = db.users.find(
    (u) => u.nome.toLowerCase() === nome.trim().toLowerCase()
  );
  if (exists) return { success: false, message: "Esse nome já está em uso!" };

  const newUser = { nome: nome.trim(), senha, tipo, agendamentos: [] };
  db.users.push(newUser);
  await saveDB(db);

  return { success: true, user: newUser };
};

// ─── Login ───────────────────────────────────────────────────────────────────

export const loginUser = async (nome, senha) => {
  if (!nome || !senha)
    return { success: false, message: "Preencha todos os campos!" };

  const db = await getDB();

  const user = db.users.find(
    (u) =>
      u.nome.toLowerCase() === nome.trim().toLowerCase() && u.senha === senha
  );

  if (!user)
    return {
      success: false,
      message: "Login incorreto ou usuário não cadastrado!",
    };

  return { success: true, user };
};

// ─── Agendamentos do Cliente ─────────────────────────────────────────────────

export const addAgendamento = async (nome, agendamento) => {
  const db = await getDB();
  const index = db.users.findIndex(
    (u) => u.nome.toLowerCase() === nome.toLowerCase()
  );
  if (index === -1) return { success: false, message: "Usuário não encontrado!" };

  db.users[index].agendamentos.push(agendamento);
  await saveDB(db);
  return { success: true };
};

export const getAgendamentos = async (nome) => {
  const db = await getDB();
  const user = db.users.find(
    (u) => u.nome.toLowerCase() === nome.toLowerCase()
  );
  return user ? user.agendamentos : [];
};

export const cancelAgendamento = async (nome, agendamentoId) => {
  const db = await getDB();
  const index = db.users.findIndex(
    (u) => u.nome.toLowerCase() === nome.toLowerCase()
  );
  if (index === -1) return { success: false, message: "Usuário não encontrado!" };

  db.users[index].agendamentos = db.users[index].agendamentos.filter(
    (ag) => ag.id !== agendamentoId
  );
  await saveDB(db);
  return { success: true };
};

// ─── Agendamentos do Barbeiro (todos os clientes) ────────────────────────────

export const getAllAgendamentos = async () => {
  const db = await getDB();
  const all = [];
  db.users
    .filter((u) => u.tipo === "cliente")
    .forEach((u) => {
      u.agendamentos.forEach((ag) => {
        all.push({ ...ag, cliente: u.nome });
      });
    });
  return all;
};
