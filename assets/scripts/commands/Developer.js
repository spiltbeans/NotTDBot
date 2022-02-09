const Command = require('./Command');
const secrets = require('./../../secure/secrets.json');
module.exports = class Developer extends Command{

    constructor(...args){
        super(...args,{
            name:'dev',
            description:'Commands to for the developer',
            category: 'Developer',
            usage: '!dev',
            presets: "**Commands:**\n- terminate - shut down bot\n\n - servers - list host servers for bot\n\n - wake - just checking in\n\n - commands - display commands"
        })
    }
    async execute(message, args){
        //if(message.author.id == process.env.bot_owner){
        if(message.author.id == secrets.bot_owner){

            if(args.length < 2){
                return message.reply('You need a command, King'); 
            }else if(args.length == 3){

                if(args[1] == 'terminate'){
                    await message.reply('Bot shutting down...');
                    return process.exit();

                }else if(args[1] == 'servers'){ //list the servers the bot is connected to
                    try{
                        let servers = "";
                        let counter = 0;
                        this.bot.guilds.cache.forEach(function(guildMember, guildMemberId) {
                            servers += guildMember.name + "; \n";
                            counter++
                        })
                        return message.author.send({embed: {
                            title:"**Servers List**",
                            description: servers + '\n'+counter+ ' servers joined.',
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
                        let counter = 0;
                        await this.bot.guilds.cache.forEach(function(guild) {
                            guild.members.cache.forEach(function(guildMember){
                                if(guildMember.hasPermission("ADMINISTRATOR") && guildMember.user.bot == false && !(guildMember.user.id in admins)){
                                
                                    admins[guildMember.user.id] = guildMember.user
                                    counter++;
                                }

                            })
                            
                        })
                        for (var id of Object.keys(admins)) {
                            response += '- '+admins[id].username +"#"+admins[id].discriminator+ "\n"
                         
                        }
                        message.author.send({embed: {
                            color: 3447003,
                            title: '**Administrators**',
                            description: response + '\n'+counter+ ' recognized administrators.',
                        }})
                        

                    }catch(err){
                        return console.log('Could not make announcement to admins: '+ err)
                    }

                }else if(args[1] == 'checkins'){    //check how many servers the "checkin" feature is used
                    try{
                        let servers = []
                        let response = ""
                        let counter = 0;
                        await this.bot.guilds.cache.forEach(function(guild) {
                            
                            servers.push(guild)
                        })
                        
                        for(var i = 0; i< servers.length; i++){
                            if(await this.database.get(servers[i].id)){
                                console.log("IN DATABASE")
                                response+= servers[i].name + '; \n';
                                counter++;
                            }
                            
                        }
                        return message.author.send({embed: {
                            title:"**Checkin List**",
                            description: response + '\n'+counter+ ' servers using checkin.',
                        }})
                    }catch(err){
                        return console.log('could not find checkins: '+ err)
                    }

                }else if(args[1] == 'wake'){
                    message.reply("I'm wide awake!");

                }else if(args[1] == 'commands'){
                    message.author.send(this.presets)
                }
            }
        }else{
            message.reply('Cannot complete command. You are not recognized as the bot owner'); 
        }
        
    }
}
