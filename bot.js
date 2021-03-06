/**
 * Author: Eyas Valdez
 * Github: https://github.com/spiltbeans
 * version: 3.0
 * 06/16/2020
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

const token = secrets.token;    //api token
//const token = secrets.test_token;
//const token = process.env.TOKEN;    //api token
const prefix = '!';             //prefix for commands

//bot online
bot.on('ready', ()=>{
    console.log("This bot is online!");
    bot.user.setActivity('a Fire Speech {!help}', {type: 'LISTENING'}).catch(console.error)
});

//command handler
bot.on('message', async msg=>{
    if(msg.content.charAt(0) != prefix){    //return if not a command
        return;
    }
    //command parameter parser
    let params = msg.content.substring(prefix.length).split(' ');
    let command = params[0];

    //command handler
    if(command == 'start' || command == 'pause' || command == 'resume' || command == 'timers' || command == 'end'){   //timer command  
        bot.commands.get('timer').execute(msg, params);

    }else if(params[0] == 'poll'){ //poll command
        bot.commands.get('poll').execute(msg, params);
        
    }else if(params[0] == 'help'){  //help command
        bot.commands.get('help').execute(msg, params);
        
    }else if(params[0] == 'dev'){ //developer commands
        params.push(secrets)
        bot.commands.get('developer').execute(msg, params);
    }
});

bot.login(token);       //bot login with token
