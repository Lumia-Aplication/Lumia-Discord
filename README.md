# Lumia Discord

Descrição breve do projeto.

## Tecnologias

- Discord.js: ^14.11.0
- Dotenv: ^16.3.1
- Glob: ^10.3.1
- i18next: ^23.2.6
- Module-alias: ^2.2.3
- Mongoose: ^7.3.1

## Diretórios

### src/client

Este diretório contém o código relacionado ao cliente Discord.

- Alias: Arquivo `alias.js` contendo a configuração do módulo-alias.
- Database: Arquivo `database.js` para a conexão com o banco de dados MongoDB.
- i18n: Arquivo `i18n.js` para a configuração de internacionalização (i18n).
- Index: Arquivo `index.js` que inicia o cliente Discord.

### src/handlers

Este diretório contém os manipuladores (handlers) para comandos e eventos.

- Commands: Arquivo `commands.js` contendo os manipuladores de comandos.
- Events: Arquivo `events.js` contendo os manipuladores de eventos.
- Slashs: Arquivo `slashs.js` contendo os manipuladores de comandos rápidos.

### src/locales

Este diretório contém as traduções para diferentes idiomas.

- en: Arquivo `en.js` contendo as traduções para o idioma inglês.
- br: Arquivo `br.js` contendo as traduções para o idioma português brasileiro.

### src/schemas

Este diretório contém os schemas para o Mongoose.

- Schemas: Diretório contendo os schemas para o Mongoose.

### src/package

Este diretório contém os comandos, eventos e funções relacionados ao pacote.

## Como Executar

1. Certifique-se de ter as dependências instaladas corretamente executando o comando `npm install`.
2. Configure as variáveis de ambiente no arquivo `.env`.
3. Execute o projeto com o comando `npm run dev`.
