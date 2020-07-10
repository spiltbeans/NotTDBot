/**
 * Author: Eyas Valdez
 * Github: https://github.com/spiltbeans
 * version: 3.4.2
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
const secrets = require('./secure/secrets');

const fs = require('fs');

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./assets/scripts/commands/').filter(file=>file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./assets/scripts/commands/${file}`);

    bot.commands.set(command.name.toLowerCase(), new command(bot))
}

//const token = secrets.token;    //api token
const token = secrets.test_token;
//const token = process.env.TOKEN;    //api token
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

    }
});

bot.login(token);       //bot login with token
