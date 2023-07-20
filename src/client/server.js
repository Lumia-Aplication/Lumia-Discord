const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const discordWebhookURL = 'https://discord.com/api/webhooks/1131614783129518172/QXzYrO8GeFGWNGs4tQkGPISem8WFwWogGBHkEzDD1vZ_9GK-q6irQ2cTQBB_SbraLsuR';

app.use(express.json());

app.post('/github-webhook', (req, res) => {
  const event = req.headers['x-github-event'];
  const payload = req.body;

  if (event === 'push') {
    const commit = payload.head_commit;
    const message = commit.message;
    const author = commit.author.name;
    const repository = payload.repository.full_name;

    const content = `Novo commit no repositório **${repository}** por **${author}**:\n${message}`;

    // Envia a mensagem para o webhook do Discord
    axios.post(discordWebhookURL, { content })
      .then(() => console.log('Mensagem enviada com sucesso para o Discord!'))
      .catch(error => console.error('Erro ao enviar a mensagem:', error.message));
  }

  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Servidor Node.js em execução na porta ${port}`);
});