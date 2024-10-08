# Bot de Piadas do Will

Este é um bot simples para Discord que conta piadas aleatórias em português.

## Funcionalidades

- Responde ao comando `/piada` com uma piada aleatória.
- Fácil de configurar e usar.

## Requisitos

- Node.js (versão 18 ou superior)
- NPM (gerenciador de pacotes do Node.js)
- Uma conta no Discord e um bot criado no [Portal de Desenvolvedores do Discord](https://discord.com/developers/applications)

## Instalação

1. Clone este repositório:
   ```
   git clone https://github.com/seu-usuario/bot-will.git
   cd bot-will
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   ```
   TOKEN=seu_token_do_bot
   CLIENT_ID=id_do_seu_bot
   GUILD_ID=id_do_seu_servidor
   ```

## Uso

1. Inicie o bot:
   ```
   node index.js
   ```

2. No Discord, use o comando `/piada` para receber uma piada aleatória.

## Tecnologias Utilizadas

- Discord.js
- dotenv

## Contribuição

Sinta-se à vontade para contribuir com novas piadas ou melhorias no código. Abra uma issue ou envie um pull request!

## Licença

Este projeto está licenciado sob a Licença ISC.
