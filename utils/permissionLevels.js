const { PermissionLevels } = require("klasa");

const perms = new PermissionLevels()
  .add(0, () => true)
  .add(2, (client, msg) => {
    const guild = client.guilds.get(client.constants.mainGuild);
    if(!guild) return false;
    const member = guild.members.get(msg.author.id);
    if(!member) return false;
    return member.roles.has(client.constants.betaRole);
  }, { fetch: true, break: true })
  .add(3, (client, msg) => {
    const guild = client.guilds.get(client.constants.mainGuild);
    if(!guild) return false;
    const member = guild.members.get(msg.author.id);
    if(!member) return false;
    return member.roles.has(client.constants.premiumRole);
  }, { fetch: true, break: true })
  .add(4, (client, message) => message.guild && message.member.permissions.has("MANAGE_MESSAGES"), { fetch: true })
  .add(5, (client, message) => message.guild && (message.member.permissions.has("BAN_MEMBERS") && message.member.permissions.has("KICK_MEMBERS")), { fetch: true })
  .add(6, (client, message) => message.guild && message.member.permissions.has("MANAGE_GUILD"), { fetch: true })
  .add(7, (client, message) => message.guild && message.member.permissions.has("ADMINISTRATOR"), { fetch: true })
  .add(8, (client, message) => message.guild && message.member === message.guild.owner, { fetch: true })
  .add(9, (client, message) => message.author === client.owner, { break: true })
  .add(10, (client, message) => message.author === client.owner);

module.exports = perms;