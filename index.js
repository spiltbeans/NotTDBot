const Discord = require("discord.js");
const timer = require('timers');
const bot = new Discord.Client();
const secrets = require('./secure/secrets');

const token = secrets.token;

const min = 60000;
const five_seconds = 5000;
bot.on('ready', ()=>{

    console.log("This bot is online!");
});


bot.on('message', msg=>{
    if(msg.content === "!start"){
        //default 7 min
        msg.reply("Timer started!");
        let openPOI = setTimeout(grace, min, msg, 0);
        let closePOI = setTimeout(grace, min*6, msg, 1);
        let closeSpeech = setTimeout(grace, min*7, msg, 2);
        let graceFirst = setTimeout(grace, (min*7) + five_seconds, msg, 3);
        let graceSecond = setTimeout(grace, (min*7) + five_seconds*2, msg, 4);
        let graceThird = setTimeout(grace, (min*7) + five_seconds*3, msg, 5);
       
    }else if(msg.content === "!start {7}"){
        //7 minute speech
        msg.reply("Timer started!");
        let openPOI = setTimeout(grace, min, msg, 0);
        let closePOI = setTimeout(grace, min*6, msg, 1);
        let closeSpeech = setTimeout(grace, min*7, msg, 2);
        let graceFirst = setTimeout(grace, (min*7) + five_seconds, msg, 3);
        let graceSecond = setTimeout(grace, (min*7) + five_seconds*2, msg, 4);
        let graceThird = setTimeout(grace, (min*7) + five_seconds*3, msg, 5);

    }else if(msg.content === "!start {10}"){
        //10 minute speech
        msg.reply("Timer started!");
        let openPOI = setTimeout(grace, min, msg, 0);
        let closePOI = setTimeout(grace, min*6, msg, 1);
        let closeSpeech = setTimeout(grace, min*10, msg, 2);
        let graceFirst = setTimeout(grace, (min*10) + five_seconds, msg, 3);
        let graceSecond = setTimeout(grace, (min*10) + five_seconds*2, msg, 4);
        let graceThird = setTimeout(grace, (min*10) + five_seconds*3, msg, 5);

    }else if(msg.content === "!start {3}"){
        //3 minute speech
        msg.reply("Timer started! All protected time!");
        let closeSpeech = setTimeout(grace, min*3, msg, 2);
        let graceFirst = setTimeout(grace, (min*3) + five_seconds, msg, 3);
        let graceSecond = setTimeout(grace, (min*3) + five_seconds*2, msg, 4);
        let graceThird = setTimeout(grace, (min*3) + five_seconds*3, msg, 5);

    }else if(msg.content === "!start {6}"){
        //6 minute speech
        msg.reply("Timer started!");
        let openPOI = setTimeout(grace, min/2, msg, 0);
        let closePOI = setTimeout(grace, ((min*5)+(min/2)), msg, 1);
        let closeSpeech = setTimeout(grace, min*6, msg, 2);
        let graceFirst = setTimeout(grace, (min*6) + five_seconds, msg, 3);
        let graceSecond = setTimeout(grace, (min*6) + five_seconds*2, msg, 4);
        let graceThird = setTimeout(grace, (min*6) + five_seconds*3, msg, 5);

    }else if(msg.content === "!start {4}"){
        //4 minute speech
        msg.reply("Timer started! All protected time!");
        let closeSpeech = setTimeout(grace, min*4, msg, 2);
        let graceFirst = setTimeout(grace, (min*4) + five_seconds, msg, 3);
        let graceSecond = setTimeout(grace, (min*4) + five_seconds*2, msg, 4);
        let graceThird = setTimeout(grace, (min*4) + five_seconds*3, msg, 5);

    }else if(msg.content === "!help"){
        msg.channel.send('Commands:\n - !help - provides commands\n - !start {LENGTH OF SPEECH} - gives time signal for speech, default is 7 minute time signals\n    options: 3, 4, 6, 7, 10\nIf you need any help add me: Spiltbeans#3644');

    }
});

bot.login(token);

function grace(msg, code){
    if(code == 0){
        
        msg.reply("POI's open");

    }else if(code == 1){
        msg.reply("POI's closed");

    }else if(code == 2){
        msg.reply("15 second grace started");

    }else if(code == 3){
        msg.reply("Grace: 5");

    }else if(code == 4){
        msg.reply("Grace: 10");

    }else if(code == 5){
        msg.reply("grace over!");
        msg.reply("*table bang* *table bang*");
    }
    
}