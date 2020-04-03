const Discord = require("discord.js");
const timer = require('timers');
const bot = new Discord.Client();
const secrets = require('./secure/secrets');

const token = secrets.token;

bot.on('ready', ()=>{

    console.log("This bot is online!");
});


bot.on('message', msg=>{
    if(msg.content === "!start"){
        //default 7 min
        msg.reply("Timer started!");
        let openPOI = setTimeout(grace, 60000, msg, 0);
        let closePOI = setTimeout(grace, 360000, msg, 1);
        let closeSpeech = setTimeout(grace, 420000, msg, 2);
        let graceFirst = setTimeout(grace, 425000, msg, 3);
        let graceSecond = setTimeout(grace, 430000, msg, 4);
        let graceThird = setTimeout(grace, 435000, msg, 5);
       
    }else if(msg.content === "!start {7}"){
        //7 minute speech
        msg.reply("Timer started!");
        let openPOI = setTimeout(grace, 60000, msg, 0);
        let closePOI = setTimeout(grace, 360000, msg, 1);
        let closeSpeech = setTimeout(grace, 420000, msg, 2);
        let graceFirst = setTimeout(grace, 425000, msg, 3);
        let graceSecond = setTimeout(grace, 430000, msg, 4);
        let graceThird = setTimeout(grace, 435000, msg, 5);

    }else if(msg.content === "!start {10}"){
        //10 minute speech
        msg.reply("Timer started!");
        let openPOI = setTimeout(grace, 60000, msg, 0);
        let closePOI = setTimeout(grace, 360000, msg, 1);
        let closeSpeech = setTimeout(grace, 600000, msg, 2);
        let graceFirst = setTimeout(grace, 605000, msg, 3);
        let graceSecond = setTimeout(grace, 610000, msg, 4);
        let graceThird = setTimeout(grace, 615000, msg, 5);

    }else if(msg.content === "!start {3}"){
        //3 minute speech
        msg.reply("Timer started! All protected time!");
        let closeSpeech = setTimeout(grace, 180000, msg, 2);
        let graceFirst = setTimeout(grace, 185000, msg, 3);
        let graceSecond = setTimeout(grace, 190000, msg, 4);
        let graceThird = setTimeout(grace, 195000, msg, 5);

    }else if(msg.content === "!start {4}"){
        //4 minute speech
        msg.reply("Timer started! All protected time!");
        let closeSpeech = setTimeout(grace, 240000, msg, 2);
        let graceFirst = setTimeout(grace, 245000, msg, 3);
        let graceSecond = setTimeout(grace, 250000, msg, 4);
        let graceThird = setTimeout(grace, 255000, msg, 5);

    }else if(msg.content === "!help"){
        msg.channel.send('Commands:\n - !help - provides commands\n - !start {LENGTH OF SPEECH} - gives time signal for speech, default is 7 minute time signals\n    options: 3, 4, 7, 10');

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