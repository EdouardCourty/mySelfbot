# The ultimate Discord Selfbot and CLI Manager

Welcome to this beautiful repository.  
I worked to create a full CLI experience with Discord.  
Support for chatting will be added in the next days.

## CLI Usage
Using the CLI is made using the console.  
Commands are used the following way:
```shell script
bin/console <command> <args>
```
Examples: `bin/console exportFriends` - `bin/console readMessages 100 <DiscordID>`  

The existing commands are thez following  
- listGuilds
- listFriends
- exportGuilds
- exportFriends
- listenToGuildsMessages <GuildID or Null (will listen to all guilds)>
- listenToDmMessages <UserID or Null (will listen for all dms)>
- listenToChannel <ChannelID>