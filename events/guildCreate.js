const { Event } = require("klasa");
const { MessageEmbed } = require("discord.js");

class GuildCreate extends Event {

  async run(guild) {
    if (!guild.available) return;
    const channel = this.client.channels.get("513347390653202460");
    if(!guild.owner && guild.ownerID) await guild.members.fetch(guild.ownerID);
    const embed = new MessageEmbed()
      .setTitle("Amber joined a new server!")
      .setDescription(guild.name)
      .setColor(0x00ff00)
      .setThumbnail(guild.iconURL())
      .addField("Owner", guild.owner.user.tag)
      .addField("Member Count", guild.memberCount)
      .setFooter(guild.id);
    if (this.client.settings.guildBlacklist.includes(guild.id)) {
      embed.setFooter(guild.id + " | Blacklisted");
      guild.leave();
      this.client.emit("warn", `Blacklisted guild detected: ${guild.name} [${guild.id}]`);
    }
    
    channel.send({ embed });
    this.client.user.setActivity(`@Amber help | ${this.client.guilds.size} servers`);
  }
}

module.exports = GuildCreate;
