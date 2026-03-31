
# Arquitetura do app Barbearia:

- Tela inicial aparece Login/Cadastro
- Feito o Login ou Cadastro como cliente:
	-  Tela com card de agendamentos de cortes

- Feito o Login ou Cadastro como Barbeiro:
	- Agendamentos disponíveis




# Detalhes Técnicos:

### Login/Cadastro:

- Quando a pessoa logar, será necessário fazer um cadastro se for sua primeira vez utilizando o app, quando o cadastro for concluído, será salvo no arquivo ***database.json*** 
	- Cada cadastro será um obj de usuário, com os seguintes campos:
		- Nome
		- Login:
		- Tipo: (Cliente ou Barbeiro)
		- Agendamentos: (se for cliente vai aparecer os cortes que foram agendados, se for barbeiro, vai aparecer todos os agendamentos de todos os usuários)

- Login terá que ter validação de caracteres (Login: nome com no minimo 4 digitos, Senha entre 8 a 12 digitos)
- Caso o usuário tente fazer login que não existe, vai avisar que o login está errado ou ele precisa fazer cadastro ainda
- Os dados inseridos no login vão ser comparados com o obj do **database.json**

### Agendamentos (Cliente):

- Quando o usuário (Cliente) fizer login, será jogado para tela de agendamento, onde conseguirá escolher o seu corte e data/horário de agendamento

- Quando o usuário agendar o seu corte, será salvo no seu determinado obj no arquivo **database.json** (No campo "Agendamentos")

- No final da página terá um botão para ele poder fazer uma consulta de quais agendamentos ele tem, podendo cancela-los


### Agendamentos (Barbeiro):

- Quando o usuário (Barbeiro) fizer login, será jogado para uma tela onde irá aparecer todos os agendamentos disponíveis (Vai puxar todos os obj que **Tipo = Usuário** e que tenha o campo "Agendamento "disponível, do arquivo **database.json**)

- O usuário conseguirá ver todas as informações como: Tipo de corte, Nome do Cliente, Data/Horário etc
- Ele também conseguirá cancelar o agendamento e informar um motivo (opcional)

# TO DO LIST:

- Tela de cadastro
- Agendamento funcional (integração com o "database")
- Tela de usuário (Barbeiro)
  	- Lógica para o barbeiro não acessar a tela de cliente
- Logica de input de senha
- Banco de dados no geral (Isaac)
- Vídeo (todos tem que participar)
- Botão no final da tela de agendamentos do usuário


# FALAS DE CADA UM:

# Caio — Fundação e visão geral do app
"Olá, vamos apresentar o Barbearia Premium, um aplicativo mobile desenvolvido com React Native e Expo.
A proposta é simples: digitalizar o agendamento de uma barbearia. O app atende dois perfis de usuário — o Cliente, que escolhe serviços e agenda horários, e o Barbeiro, que visualiza e gerencia todos os agendamentos recebidos.
A interface foi construída com um tema escuro e detalhes dourados, transmitindo uma identidade visual premium. Para a navegação entre telas, utilizamos o React Navigation com Stack Navigator.
As dependências principais são: Expo, React Native, React Navigation e AsyncStorage para o banco de dados local. Todo o projeto está dividido em três arquivos: App.js, details.js e database.js."

# Isaac — Banco de dados local com AsyncStorage
"Para armazenar os dados do app, utilizamos o AsyncStorage — o banco de dados local do React Native. Ele persiste as informações diretamente no dispositivo, sem precisar de internet ou servidor externo.
Toda a lógica de dados foi centralizada no arquivo database.js, que exporta funções específicas para cada operação. São elas: registerUser, que cadastra um novo usuário com validações de nome e senha; loginUser, que autentica o usuário comparando os dados com o banco; addAgendamento, que salva um agendamento no perfil do cliente; getAgendamentos, que retorna os agendamentos de um cliente específico; cancelAgendamento, que remove um agendamento pelo ID; e getAllAgendamentos, usada pelo barbeiro para buscar todos os agendamentos de todos os clientes.
Os dados ficam salvos em formato JSON sob a chave @barbearia_db, com a seguinte estrutura: um objeto com um array de users, onde cada usuário tem nome, senha, tipo e um array de agendamentos. Essa separação mantém o App.js focado apenas na interface."

# Cauã — Estrutura do App.js (navegação, login e cadastro)
"O arquivo App.js é o coração da aplicação — ele contém todas as telas e o sistema de navegação.
O Stack Navigator registra cinco telas: Login, Cadastro, Home para clientes, BarbeiroHome para barbeiros, e Details para o agendamento.
A tela de Login faz uma chamada assíncrona à função loginUser do banco. Se o login for válido, o app identifica o tipo do usuário e redireciona automaticamente — cliente vai para Home, barbeiro vai para BarbeiroHome.
A tela de Cadastro usa registerUser com validações em tempo real: nome com no mínimo 4 caracteres, senha entre 8 e 12 caracteres, nome único no banco, e confirmação de senha. O usuário também escolhe seu tipo — Cliente ou Barbeiro — através de um seletor visual com checkboxes."

# Erik — Estrutura do App.js (home, agendamento e tela do barbeiro)
"Continuando a estrutura do App.js:
A tela Home do Cliente exibe três cards de serviços — Barba Completa, Corte Infantil e Corte Clássico — cada um com foto, descrição, duração e preço. Ao clicar na seta de um card, o usuário é levado para a tela de Details, onde escolhe o dia da semana e o horário. Ao confirmar, addAgendamento salva o agendamento com ID, serviço, preço, duração e horário.
Já a tela Home do Barbeiro carrega todos os agendamentos na montagem da tela via getAllAgendamentos. Cada agendamento aparece em um card com nome do cliente, serviço, horário, duração e preço. No topo de cada card há um botão de lixeira — ao pressionar, cancelAgendamento remove o agendamento do banco e o card desaparece da tela instantaneamente, sem precisar recarregar.
No geral, o App.js conecta interface e banco de forma limpa, com cada tela tendo sua responsabilidade bem definida."