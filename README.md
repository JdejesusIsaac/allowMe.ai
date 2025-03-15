# AllowMe.ai

AllowMe.ai is an AI-powered educational finance platform that automates allowance distribution based on verified educational achievements. Built on ElizaOS's agent framework and Polygon blockchain.

## 🎯 Overview

AllowMe.ai transforms traditional allowance systems by:
- Creating AI-verified educational achievements
- Automating reward distribution via Plugins
- Teaching financial literacy through hands-on experience
- Providing secure parental controls and oversight

## 🛠️ Technical Architecture

- **ElizaOS Integration**
 - Assessment Agent: Creates and validates educational activities
 - Reward Agent: Manages automated allowance distribution
 - Mass Payments Plugin: Handles on-chain transactions
 

**Goat-Plugin/CoinBase-plugin**
 - Achievement verification
 - Automated rewards
 - Parental controls
 - Spending limits

## 🚀 Features

### For Parents/Trustees
- Custom educational goal setting
- Spending parameter controls 
- Progress monitoring dashboard
- Transaction oversight

### For Students
- Educational achievement tracking
- Digital wallet management
- Progress visualization
- Reward history



## 💻 Integrations 





# Client Integrated 

https://github.com/elizaOS/eliza/tree/main/packages/client-telegram





# PlugIns 

https://github.com/elizaos-plugins/plugin-coinbase/tree/main

https://github.com/elizaOS/eliza/blob/main/packages/plugin-goat/src/wallet.ts

## Edit the character files

Open `src/character.ts` to modify the default character. Uncomment and edit.

### Custom characters

To load custom characters instead:
- Use `pnpm start --characters="path/to/your/character.json"`
- Multiple character files can be loaded simultaneously

### Add clients
```
clients: [Clients.TWITTER, Clients.DISCORD],
```

## Duplicate the .env.example template

```bash
cp .env.example .env
```

\* Fill out the .env file with your own values.

### Add login credentials and keys to .env
```
DISCORD_APPLICATION_ID="discord-application-id"
DISCORD_API_TOKEN="discord-api-token"
...
OPENROUTER_API_KEY="sk-xx-xx-xxx"
...
TWITTER_USERNAME="username"
TWITTER_PASSWORD="password"
TWITTER_EMAIL="your@email.com"
```

## Install dependencies and start your agent

```bash
pnpm i pnpm build && pnpm start
```
Note: this requires node to be at least version 22 when you install packages and run the agent.

