/**
 * Author: Eyas Valdez
 * Github: https://github.com/spiltbeans
 * version: 2.0
 * 05/13/2020
 */

//requires
const Discord = require("discord.js");
const timer = require('timers');
const bot = new Discord.Client();
const secrets = require('./secure/secrets');

const token = secrets.token;    //api token
const prefix = '!';             //prefix for commands

//convenient time conversions (ms)
const min = 60000;              
const five_seconds = 5000;

//help response string
const help_help = ' - !help - provides commands';
const timer_help = ' - !start - Gives time signal for a 7 minute speech';
const timer_help_2 = ' - !start {LENGTH OF SPEECH} - Gives time signal for speech\n   Options: 3, 4, 6, 7, 8, 10';
const timer_help_3 = " - !start RESUME {LENGTH OF SPEECH} {POI'S START} {POI'S CLOSE}\n - Creates a speech with given parameters, in minutes. (30 sec is 0.5 min)\n POI'S START: How long until poi's are open\n POI'S CLOSE: How long until protected time starts";
const poll_help = ' - !poll {question} [option1] [option2]\n   Your question and options can be as long as you want. Maximum poll of 20 options';
const note_help = "**NOTE: ALL COMMANDS WITH PARAMETERS SHOULD HAVE THEIR PARAMETERS SEPARATED WITH ONE SPACE"
const contact_help = 'If you need any help add me: Spiltbeans#3644';
const add_bot = 'To add this bot to your server click: https://discordapp.com/oauth2/authorize?client_id=695434891638341733&scope=bot&permissions=8';
const add_server ="Join the CUDS Discord if you haven't already! https://discord.gg/XGnjJZz";
const source_code = "You can find the source code here: https://github.com/spiltbeans/NotTDBot";
const help_response = '+ Commands:\n'+help_help+'\n\n'+timer_help+'\n\n'+timer_help_2+'\n\n'+timer_help_3+'\n\n'+poll_help+'\n\n'+note_help+'\n\n'+"+ Info:\n"+contact_help+'\n\n'+add_bot+'\n\n'+add_server+'\n\n'+source_code;

//letters enum
const letters = [
    '🇦',
    '🇧',
    '🇨',
    '🇩',
    '🇪',
    '🇫',
    '🇬',
    '🇭',
    '🇮',
    '🇯',
    '🇰',
    '🇱',
    '🇲',
    '🇳',
    '🇴',
    '🇵',
    '🇶',
    '🇷',
    '🇸',
    '🇹',
    '🇺',
    '🇻',
    '🇼',
    '🇽',
    '🇾',
    '🇿']

//bot online
bot.on('ready', ()=>{
    console.log("This bot is online!");
});

//command handler
bot.on('message', msg=>{
    
    //command parameter parser
    let params = msg.content.substring(prefix.length).split(' ');

    //command handler
    if(params[0] == 'start'){   //timer command

        if(params[1] == 'RESUME'){  //start at any time
            //!start {} {length} {poi_start} {protected_start}

            let length = parseFloat(params[2].substring(1, params[2].length -1));               //full length of the speech
            let poi_start = parseFloat(params[3].substring(1, params[3].length -1));            //what time the poi's open up
            let protected_start = parseFloat(params[4].substring(1, params[4].length -1));      //what time protected time starts

            if(poi_start == 0){
                msg.reply("Timer for "+length+" mins started!. POI's open. Protected time start in " +protected_start +" mins");
            }else{
                msg.reply("Timer for "+length+" mins started!. Protected time ends in "+poi_start+" mins and will start again in " +protected_start +" mins");
            }
            

            let openPOI = setTimeout(signal, min*poi_start, msg, 0);
            let closePOI = setTimeout(signal, (min)*protected_start, msg, 1);
            let closeSpeech = setTimeout(signal, min*length, msg, 2);
            let graceFirst = setTimeout(signal, (min*length) + five_seconds, msg, 3);
            let graceSecond = setTimeout(signal, (min*length) + five_seconds*2, msg, 4);
            let graceThird = setTimeout(signal, (min*length) + five_seconds*3, msg, 5);


        }else if(params[1]=='{3}'){
            //3 minute speech
            msg.reply("Timer started!: 3 Minute Speech! All protected time!");
            let closeSpeech = setTimeout(signal, min*3, msg, 2);
            let graceFirst = setTimeout(signal, (min*3) + five_seconds, msg, 3);
            let graceSecond = setTimeout(signal, (min*3) + five_seconds*2, msg, 4);
            let graceThird = setTimeout(signal, (min*3) + five_seconds*3, msg, 5);
        }else if(params[1]=='{4}'){
            //4 minute speech
            msg.reply("Timer started!: 4 Minute Speech! All protected time!");
            let closeSpeech = setTimeout(signal, min*4, msg, 2);
            let graceFirst = setTimeout(signal, (min*4) + five_seconds, msg, 3);
            let graceSecond = setTimeout(signal, (min*4) + five_seconds*2, msg, 4);
            let graceThird = setTimeout(signal, (min*4) + five_seconds*3, msg, 5);
        }else if(params[1]=='{6}'){
            //6 minute speech
            msg.reply("Timer started!: 6 Minute Speech");
            let openPOI = setTimeout(signal, min/2, msg, 0);
            let closePOI = setTimeout(signal, ((min*5)+(min/2)), msg, 1);
            let closeSpeech = setTimeout(signal, min*6, msg, 2);
            let graceFirst = setTimeout(signal, (min*6) + five_seconds, msg, 3);
            let graceSecond = setTimeout(signal, (min*6) + five_seconds*2, msg, 4);
            let graceThird = setTimeout(signal, (min*6) + five_seconds*3, msg, 5);
        }else if(params[1]=='{8}'){
            //8 minute speech
            msg.reply("Timer started!: 8 Minute Speech");
            let openPOI = setTimeout(signal, min, msg, 0);
            let closePOI = setTimeout(signal, min*7, msg, 1);
            let closeSpeech = setTimeout(signal, min*8, msg, 2);
            let graceFirst = setTimeout(signal, (min*8) + five_seconds, msg, 3);
            let graceSecond = setTimeout(signal, (min*8) + five_seconds*2, msg, 4);
            let graceThird = setTimeout(signal, (min*8) + five_seconds*3, msg, 5);
        }else if(params[1]=='{10}'){
            //10 minute speech
            msg.reply("Timer started!: 10 Minute Speech");
            let openPOI = setTimeout(signal, min, msg, 0);
            let closePOI = setTimeout(signal, min*6, msg, 1);
            let closeSpeech = setTimeout(signal, min*10, msg, 2);
            let graceFirst = setTimeout(signal, (min*10) + five_seconds, msg, 3);
            let graceSecond = setTimeout(signal, (min*10) + five_seconds*2, msg, 4);
            let graceThird = setTimeout(signal, (min*10) + five_seconds*3, msg, 5);
        }else{
            //7 minute speech
            msg.reply("Timer started!: 7 Minute Speech");
            let openPOI = setTimeout(signal, min, msg, 0);
            let closePOI = setTimeout(signal, min*6, msg, 1);
            let closeSpeech = setTimeout(signal, min*7, msg, 2);
            let graceFirst = setTimeout(signal, (min*7) + five_seconds, msg, 3);
            let graceSecond = setTimeout(signal, (min*7) + five_seconds*2, msg, 4);
            let graceThird = setTimeout(signal, (min*7) + five_seconds*3, msg, 5);
        }
                
            
    }else if(params[0] == 'poll'){ //poll command

        let question = "";     //the question being asked
        let options = "\n";    //will be the string of options
        let answers = [];      //list of answers, makes it easier to collect
        let index = 97;        //ascii value for A. Increments based on options index
                               // will basically have 65 = A, next option will be 65+1 = B, ....

        let emoji_pre = '\:regional_indicator_';

        //parsing the poll parameter to isolate: question and options
        for(var i = 0; i < params.length; i++){
            if(i != 0){ //skips over keyword "poll"

                //if param in [] - its an option, else its part of the question
                if(params[i].charAt(0) == '[' && params[i].charAt(params[i].length-1) == ']' ){
                    answers.push(params[i]);
                }else{
                    question+= params[i]+ ' ';
                }
            }

        }

        //sends response if there are more than 20 options
        if(answers.length > 20){
            msg.channel.send('Cannot make a poll with more than 20 options :(')
            return;
        }

        //remove the {} from question
        question = question.substring(1, question.length-2);

        //parse through answers and add to options string, with index
        for(var i = 0; i < answers.length; i++){
            let temp = answers[i].charAt(1).toUpperCase()+answers[i].substring(2, answers[i].length-1); //capitalizes the option
            options+= '\n';
            options+= (emoji_pre+String.fromCharCode(index)+':'+': '+ temp + '\n');                     //adding the option with the emoji
            index++;
        }
        
        //poll response
        msg.channel.send({embed: {
            title:'Poll: '+question,
            color: 3447003,
            description: options
          }}).then(sent =>{

            //add reactions, to do poll things
            for(var i = 0; i < answers.length; i++){        
                sent.react(letters[i])
                
            }
            
            
        })
        
    }else if(params[0] == 'help'){  //help command
        msg.channel.send({embed: {
            color: 3447003,
            title: 'Help Page',
            description: help_response,
        }})
        
    }
});

bot.login(token);       //bot login with token

//sending out time signals, including grace period
/**
 * 0 - poi's open msg
 * 1 - poi's close msg
 * 2 - 15 second grace msg
 * 3 - 5 seconds in grade msg
 * 4 - 10 seconds in grace msg
 * 5 - grace over msg
**/
function signal(msg, code){
    if(code == 0){
        msg.reply("POI's Open");
    }else if(code == 1){
        msg.reply("POI's Closed");

    }else if(code == 2){
        msg.reply("Started: 15 Second Grace");

    }else if(code == 3){
        msg.reply("Grace: 5");

    }else if(code == 4){
        msg.reply("Grace: 10");

    }else if(code == 5){
        msg.reply("Grace Over!");
        msg.reply("*table bang* *table bang*");
    }
    
}