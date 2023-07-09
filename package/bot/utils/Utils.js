import { readdir, readdirSync } from 'fs';
import path from 'path';

export default class Utils {
  constructor(client) {
    this.client = client;
  }

  async loadCommands() {
    readdir('./package/bot/commands', async (err, files) => {
      if (err)
        return console.log(err)

      for (const dir of files) {
        const commands = await readdirAsync(`./package/bot/commands/${dir}/`);

        if (commands instanceof Error)
          return console.log(commands);

        for (const com of commands) {
          try {
            const Command = (await import(`../../bot/commands/${dir}/${com}`)).default;
            if (!com) return;
            const command = new Command(this.client);
            this.client.commands.set(command.name, command);
            command.aliases.map((a) => this.client.aliases.set(a, command));
          } catch (e) {
            console.log(e)
          }
        }
      }
    });
  }

  async loadEvents() {
    const eventFolder = await readdirAsync('./package/bot/listeners/');

    if (eventFolder instanceof Error)
      return console.log(
        `Warn: ${eventFolder}`
      );

    for (const dir of eventFolder) {
      const folderFiles = await readdirAsync(`./package/bot/listeners/${dir}/`);

      if (folderFiles instanceof Error)
        return;

      for (const file of folderFiles) {
        try {
          const Event = (await import(`../../bot/listeners/${dir}/${file}`)).default;
          const eventFile = new Event(this.client);

          const listener = eventFile;
          this.client.on(listener.name, (...args) => {
            listener.run(...args);
          });
        } catch (e) {
          return console.log(e)
        }
      }
    }
  }
}

async function readdirAsync(path) {
  return new Promise((resolve) => {
    readdir(path, (err, files) => {
      if (err) resolve(err);
      resolve(files);
    });
  });
}
