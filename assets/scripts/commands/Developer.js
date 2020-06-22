const Command = require('./Command');
module.exports = class Developer extends Command{

    constructor(...args){
        super(...args,{
            name:'dev',
            description:'Commands to for the developer',
            category: 'Developer',
            usage: '+dev',
            presets: "**Commands:**\n- terminate - shut down bot\n\n - servers - list host servers for bot\n\n - wake - just checking in\n\n - commands - display commands"
        })
    }
    async execute(message, args){
        if(message.author.id == process.env.bot_owner){
            if(args.length < 2){
                return message.reply('You need a command, King'); 
            }else if(args.length == 2){

                if(args[1] == 'terminate'){
                    await message.reply('Bot shutting down...');
                    process.exit();

                }else if(args[1] == 'servers'){
                    let servers = "";
                    this.bot.guilds.cache.forEach(function(guildMember, guildMemberId) {
                        console.log("Server Name: " + guildMember.name + ", Server ID: "+ guildMemberId);
                        servers += guildMember.name + "; \n";
                    })
                    return message.reply(servers); 

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
