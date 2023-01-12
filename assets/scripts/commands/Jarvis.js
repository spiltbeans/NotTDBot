const isTESTING = require('../../../config.json').isTESTING
const secrets = isTESTING ? require('./../../secure/secrets.json') : ""
const bot_owner = isTESTING ? secrets.bot_owner : process.env.BOT_OWNER

function IsAdmin(message){
    try{
       let authorization = false
        message.guild.members.cache.forEach(function(guildMember){
            if(guildMember.hasPermission("ADMINISTRATOR") && !guildMember.user.bot && message.author.id == guildMember.user.id){
                authorization = true
            }

        })
        return authorization
    }catch(err){
        console.log("Could not complete admin search: "+err)
    }
    
}

const Command = require('./Command');
const { MessageAttachment } = require('discord.js');
module.exports = class Jarvis extends Command{

    constructor(...args){
        super(...args, {
            name:'jarvis',
            description:'Helper module to run miscellaneous tasks',
            category: 'Helper',
            usage: '+jarvis',
            presets: "+checkin {new_role_id} {equity_constitution}"
            
        })
    }
    
    async execute(message, args){ 
        if(args[0] == 'checkin'){
            try{
                if(IsAdmin(message)){
                    if(args.length == 2){
                        if(args[1] == 'DELETE'){
                        
                            //delete process
                            if(this.database.get(message.guild.id)){
                                this.database.delete(message.guild.id)
                                message.channel.send('Check-in deleted for server ' +message.guild.name)
                                
                            }else{
                                message.channel.send('Check-in does not exist on the server yet. Please use +checkin to create a checkin')
                            }
                        }
                        
                    }else if(args.length == 3){
                        
                            //form of: +checkin {new_role_id} {equity_constitution}
                            //collection: server_id => {new_role_id, gate_keeper_channel}
        
                            let new_role = args[1].substring(args[1].indexOf('{')+1, args[1].indexOf('}'));
                            let equity = args[2].substring(args[2].indexOf('{')+1, args[2].indexOf('}'));
                            
                            await this.database.get(message.guild.id).then(guild =>{
                                if(guild){
                                    message.channel.send('Check-in already exists in server. Please use "+checkin DELETE" to delete existing check-in')
                                }else{
                                    this.database.set(message.guild.id, {role:new_role, channel:message.channel})
                                    let b = {
                                        name: message.guild.name,
                                        description:"You must react to this message to continue in this server. \n\n**By doing so, you agree to abide by the __"+message.guild.name + "__ equity guidelines:**\n\n"+equity
                                    }
                                    
                                    return message.channel.send({embed: {
                                        color: 3447003,
                                        title: b.name,
                                        description: b.description,
                                    }}).then(sent =>{
                        
                                        sent.react('✅')
                                    })
                                }
                            })
                           
                            
                    }else{
                        message.reply('You are not using the correct amount of parameters to use this command. Please see +help for reference')
                    }
         
                }else{
                    message.reply('Could not complete command. You are not recognized as a server admin.')
                }
                
            }catch(err){
                console.log("Error with check-in: "+err)
            }
            
                       
            
        }else if(args[0] == 'manual'){
            try{
                if(IsAdmin(message)){
                    //form of: +checkin {new_role_id} {equity_constitution} {server_id} {channel_id}
                    //collection: server_id => {new_role_id, gate_keeper_channel}

                    // let new_role = args[1].substring(args[1].indexOf('{')+1, args[1].indexOf('}'));
                    // let equity = args[2].substring(args[2].indexOf('{')+1, args[2].indexOf('}'));
                    // let server = args[3].substring(args[3].indexOf('{')+1, args[3].indexOf('}'));
                    // let channel = args[4].substring(args[4].indexOf('{')+1, args[4].indexOf('}'));

                    await this.bot.guilds.cache.forEach(function(guild) {
                            
                        console.log(guild)
                    })
                    // this.database.set(message.guild.id, {role:new_role, channel:message.channel})

                    // let b = {
                    //     name: message.guild.name,
                    //     description:"You must react to this message to continue in this server. \n\n**By doing so, you agree to abide by the __"+message.guild.name + "__ equity guidelines:**\n\n"+equity
                    // }
                    
                    // return message.channel.send({embed: {
                    //     color: 3447003,
                    //     title: b.name,
                    //     description: b.description,
                    // }}).then(sent =>{
        
                    //     sent.react('✅')
                    // })
         
                }else{
                    message.reply('Could not complete command. You are not recognized as a server admin.')
                }
                
            }catch(err){
                console.log("Error with check-in: "+err)
            }
            
                       
            
        }else if(args[0] == 'msg'){
            if(args[1] == 'DEV'){
                try{
                    
                    if(args.length == 2){
                        let b = {
                            name: 'Developer Help',
                            description:message.author.username + "#"+message.author.discriminator+" is asking for assistance!"
                            
                        }
                        this.bot.users.cache.get(bot_owner).send({embed: {
                            color: 3447003,
                            title: b.name,
                            description: b.description,
                        }})
                    }else{
                        let transport = ''
                        for(var i = 1; i< args.length; i++){
                            transport+= args[i] + ' '
                        }
                        let b = {
                            name: 'Developer Help',
                            description:transport.substring(transport.indexOf('{')+1, transport.indexOf('}'))
                            
                        }

                        this.bot.users.cache.get(bot_owner).send({embed: {
                            color: 3447003,
                            title: b.name,
                            description: message.author.username + "#"+message.author.discriminator+" is asking for assistance!\n"+b.description,
                        }})
                    }
                    return message.reply('Message sent to bot developer :)')
                }catch(err){
                    console.log('Could not send message to developer: '+err)
                }
                
                
            }else{
                message.reply("Sorry, I'm not sure who you are trying to contact. Type +help for help")
            }

        }
        
    }
}