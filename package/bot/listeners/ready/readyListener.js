import Listener from "../../structures/Listener.js";

export default class Ready extends Listener {
  constructor(client) {
    super(client, {
      name: "ready"
    });
  }
  async run() {
    console.log("ok")
  }
}