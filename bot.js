/**
 * Author: Eyas Valdez
 * Github: https://github.com/spiltbeans
 * version: 4.1
 * 06/16/2020
 */
/**
 * TODO: motion bank
 * TODO: dev stop timers
 * TODO: anonymous polls 
 * TODO: HELP ALL!!!!!!!!!!!!
 * TODO: live timer 
 * TODO: delete x amount of messages
 */

//requires
const Discord = require("discord.js");
const bot = new Discord.Client();
//const secrets = require('./assets/secure/secrets');

const fs = require('fs');

bot.commands = new Discord.Collection();
bot.checkins = new Discord.Collection();

const commandFiles = fs.readdirSync('./assets/scripts/commands/').filter(file=>file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./assets/scripts/commands/${file}`);

    bot.commands.set(command.name.toLowerCase(), new command(bot))
}

//const token = secrets.token;    //api token
//const token = secrets.test_token;
const token = process.env.TOKEN;    //api token
const prefix = '+';             //prefix for commands

//bot online
bot.on('ready', ()=>{
    console.log("This bot is online!");
    bot.user.setActivity('a Fire Speech {'+prefix+'help}', {type: 'LISTENING'}).catch(console.error)
});

//command handler
bot.on('message', async msg=>{
    if(msg.content.charAt(0) != prefix){    //return if not a command
        return;
    }
    //command parameter parser
    let params = msg.content.substring(prefix.length).split(' ');
    let command = params[0].toLowerCase();

    //command handler
    if(command == 'start' || command == 'pause' || command == 'resume' || command == 'timers' || command == 'end' || command == 'rewind' || command == 'forward'){   //timer command  
        bot.commands.get('timer').execute(msg, params);

    }else if(command == 'poll'){ //poll command
        bot.commands.get('poll').execute(msg, params);
        
    }else if(command == 'help'){  //help command
        bot.commands.get('help').execute(msg, params);
        
    }else if(command == 'dev'){ //developer commands
        
        bot.commands.get('developer').execute(msg, params);

    }else if(command == 'f' || command == 'shake'){ //part of the suggested commands

        bot.commands.get('fan').execute(msg, params);

    }else if(command == 'checkin' || command == 'msg'){ //equity checker command *only done by admin
        //form of: +checkin {new_role_id} {equity_guideline}
        //collection: server_id => {new_role_id, gate_keeper_channel}

        bot.commands.get('jarvis').execute(msg, params)
    }
});

bot.on('messageReactionAdd', async (reaction, user) =>{
    try{
        if(reaction.message.partial) await reaction.message.fetch();
        if(reaction.partial) await reaction.fetch();
    
        if(user.bot) return;
    
        if(!reaction.message.guild) return;

        let data = (bot.checkins.get(reaction.message.guild.id))
        if(data){
            if(reaction.message.channel.id === data.channel.id){
                if(reaction.emoji.name == '✅'){
        
                    await reaction.message.guild.members.cache.get(user.id).roles.add(data.role)
                }
            }
        }
        
    }catch(err){
        return console.log('Problem assigning a role: ' + err)
    }
    


})
bot.on('messageReactionRemove', async (reaction, user) =>{
    try{
        if(reaction.message.partial) await reaction.message.fetch();
        if(reaction.partial) await reaction.fetch();
    
        if(user.bot) return;
    
        if(!reaction.message.guild) return;

        let data = (bot.checkins.get(reaction.message.guild.id))
        if(data){
            if(reaction.message.channel.id === data.channel.id){
                if(reaction.emoji.name == '✅'){
        
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(data.role)
                }
            }
        }

    }catch(err){
        return console.log('Problem removing a role: '+err)
    }
    


})


bot.login(token);       //bot login with token
