const { Client, Events, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const { TOKEN, CLIENT_ID, GUILD_ID, API_KEY } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const url = `https://apiv3.apifootball.com/?action=get_countries&APIkey=${API_KEY}`;

const jokes = [
    "Por que o esqueleto não brigou com ninguém? Porque ele não tem estômago para isso!",
    "O que o pato disse para a pata? Vem Quá!",
    "Por que o livro de matemática ficou triste? Porque tinha muitos problemas.",
    "Qual é o cúmulo da força? Dobrar a esquina.",
    "Por que o jacaré tirou o filho da escola? Porque ele réptil de ano.",
    "Qual é o contrário de volátil? Vem cá sobrinho!",
    "O que o zero disse para o oito? Belo cinto!",
    "Por que o bombeiro não gosta de andar? Porque ele socorre.",
    "Qual é a comida que liga e desliga? O strogonoff.",
    "O que o advogado do frango disse no tribunal? Meu cliente é inocente, ele só estava fazendo um rango!",
    "Por que o pinheiro não se perde na floresta? Porque ele tem uma pinha.",
    "Qual é o alimento mais sagrado que existe? O amém-doim.",
    "Por que o mouse foi ao psicólogo? Porque estava com problemas de clique.",
    "O que o tijolo falou para o outro? Há um ciumento entre nós.",
    "Por que o Word foi ao médico? Porque estava com vírus.",
    "O que o martelo disse para o prego? Eu te preguei!",
    "Por que o elefante não pega fogo? Porque ele já é cinza.",
    "Qual é o cúmulo da solidão? Morar sozinho e fugir de casa.",
    "O que o tomate foi fazer no banco? Tirar extrato.",
    "Por que o computador foi preso? Porque ele executou um programa."
  ];

  const commands = [
    new SlashCommandBuilder()
      .setName('piada')
      .setDescription('Conta uma piada aleatória')
      .toJSON(),
    new SlashCommandBuilder()
      .setName('jogos')
      .setDescription('Mostra a lista de jogos de hoje')
      .toJSON()
  ];

const rest = new REST({ version: '9' }).setToken(TOKEN);

async function fetchTodaysGames() {
  const today = new Date().toISOString().split('T')[0];
  const url = `https://apiv3.apifootball.com/?action=get_events&from=${today}&to=${today}&APIkey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    return null;
  }
}

(async () => {
  try {
    console.log('Iniciando o registro dos comandos de aplicação (/).');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('Comandos de aplicação (/) registrados com sucesso.');
  } catch (error) {
    console.error(error);
  }
})();

client.once(Events.ClientReady, readyClient => {
  console.log(`Boa mlk o login foi feito como ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'piada') {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    await interaction.reply(randomJoke);
  } else if (commandName === 'jogos') {
    await interaction.deferReply();

    const games = await fetchTodaysGames();
    if (games && games.length > 0) {
      let response = "Jogos de hoje:\n\n";
      games.slice(0, 10).forEach(game => {
        response += `${game.match_hometeam_name} vs ${game.match_awayteam_name} - ${game.match_time}\n`;
      });
      if (games.length > 10) {
        response += "\n(Mostrando apenas os 10 primeiros jogos)";
      }
      await interaction.editReply(response);
    } else {
      await interaction.editReply("Desculpe, não foi possível obter a lista de jogos para hoje.");
    }
  }
});

client.login(TOKEN);