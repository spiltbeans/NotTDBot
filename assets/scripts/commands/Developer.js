const Command = require('./Command');
module.exports = class Developer extends Command{

    constructor(...args){
        super(...args,{
            name:'dev',
            description:'Commands to for the developer',
            category: 'Developer',
            usage: '+dev',
            presets: "**Commands:**\n\n- terminate - shut down bot\n\n - servers - list host servers for bot\n\n - wake - just checking in\n\n - announce {} - make an announcement to all admins for every server\n\n - commands - display commands"
        })
    }
    async execute(message, args){
        if(message.author.id == process.env.bot_owner){
        //if(message.author.id == '146353786703577088'){

            if(args.length < 2){
                return message.reply('You need a command, King'); 
            }else{

                if(args[1] == 'terminate'){ //kill the bot
                    await message.reply('Bot shutting down...');
                    return process.exit();

                }else if(args[1] == 'servers'){ //list the servers the bot is connected to
                    try{
                        let servers = "";
                        this.bot.guilds.cache.forEach(function(guildMember, guildMemberId) {
                            console.log("Server Name: " + guildMember.name + ", Server ID: "+ guildMemberId);
                            servers += guildMember.name + "; \n";
                        })
                        return message.author.send({embed: {
                            title:"**Servers List**",
                            description: servers,
                        }})
                    }catch(err){
                        console.log("Could not fetch servers: "+ err)
                    }
  
                }else if(args[1] == 'wake'){    //check in for the bot
                    return message.reply("I'm wide awake!");

                }else if(args[1] == 'commands'){    //tell the developer what commands are usable by the bot
                    return message.author.send({embed: {
                        title:"**Developer Commands**",
                        description: this.presets,
                    }})

                }else if(args[1] == 'announce'){    //announcement to all server admins
                    if(args.length == 2){
                        return message.reply('You cannot make a blank announcement')
                    }else{
                        try{
                            let announcement = ""
                            let admins = {};
                            for(var i = 1; i<args.length; i++){
                                announcement += args[i] + " ";
                            }

                            announcement = announcement.substring(announcement.indexOf('{')+1, announcement.indexOf('}'));

                            await this.bot.guilds.cache.forEach(function(guild) {
                                guild.members.cache.forEach(function(guildMember){
                                    if(guildMember.hasPermission("ADMINISTRATOR") && guildMember.user.bot == false && !(guildMember.user.id in admins)){
                                    
                                        admins[guildMember.user.id] = guildMember.user
                                    }

                                })
                                
                            })
                            for (var id of Object.keys(admins)) {
                                admins[id].send({embed: {
                                    color: 3447003,
                                    title: '**Announcement!**',
                                    description: "Heyo! You are recognized as an administrator on a server that has the me on it. My dad would like me to tell you the following message:\n\n**"+announcement+"**",
                                }})
                             
                            }
                            

                        }catch(err){
                            return console.log('Could not make announcement to admins: '+ err)
                        }
                    }

                }else if(args[1] == 'admins'){    //announcement to all server admins
                    try{
                        let admins = {}
                        let response = ""
                        await this.bot.guilds.cache.forEach(function(guild) {
                            guild.members.cache.forEach(function(guildMember){
                                if(guildMember.hasPermission("ADMINISTRATOR") && guildMember.user.bot == false && !(guildMember.user.id in admins)){
                                
                                    admins[guildMember.user.id] = guildMember.user
                                }

                            })
                            
                        })
                        for (var id of Object.keys(admins)) {
                            response += '- '+admins[id].username + "\n"
                         
                        }
                        message.author.send({embed: {
                            color: 3447003,
                            title: '**Administrators**',
                            description: response,
                        }})
                        

                    }catch(err){
                        return console.log('Could not make announcement to admins: '+ err)
                    }

                }
            }
        }else{
            return message.reply('Cannot complete command. You are not recognized as the bot owner'); 
        }
        
    }
}
