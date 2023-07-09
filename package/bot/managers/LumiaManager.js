import { Client, Collection } from "discord.js";
import Utils from "../utils/Utils.js";

export class LumiaManager extends Client {
  constructor(...options) {
    super(...options);
    this.commands = new Collection()
    this.aliases = new Collection()
    this.utils = new Utils(this)
  }

  async load(token) {
    super.login(token ? token : process.env.BOT_TOKEN)
    this.utils.loadCommands()
    this.utils.loadEvents()
  }
}