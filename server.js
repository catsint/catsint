require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Discord bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

// Express middleware
app.use(cors());
app.use(express.json());

// Endpoint to fetch server stats
app.get('/api/stats', async (req, res) => {
  try {
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    const members = await guild.members.fetch();
    const roles = await guild.roles.fetch();

    const stats = {
      totalMembers: guild.memberCount,
      onlineMembers: members.filter(m => m.presence?.status === 'online' || m.presence?.status === 'idle' || m.presence?.status === 'dnd').size,
      boosts: guild.premiumSubscriptionCount || 0,
      customerMembers: members.filter(m => m.roles.cache.some(r => r.name === 'Customer')).size,
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});