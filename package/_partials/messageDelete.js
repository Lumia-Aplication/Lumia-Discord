
function messageDelete(message, time) {
  setTimeout(async () => {
    try {
      await message.delete();
    } catch {
      return;
    }
  }, time);
}

module.exports = messageDelete;