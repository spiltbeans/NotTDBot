/**
 * Author: Eyas Valdez
 * Github: https://github.com/spiltbeans
 * version: 2.3
 * 05/13/2020
 */

//requires
const Discord = require("discord.js");
const timer = require('timers');
const bot = new Discord.Client();
// const secrets = require('./secure/secrets');

// const token = secrets.token;    //api token
const token = process.env.TOKEN;    //api token
const prefix = '!';             //prefix for commands

//convenient time conversions (ms)
const min = 60000;              
const five_seconds = 5000;

//help response string
const help_help = ' - !help - provides commands';
const timer_help = ' - !start - Gives time signal for a 7 minute speech';
const timer_help_2 = ' - !start {LENGTH OF SPEECH} - Gives time signal for speech\n   Options: 3, 4, 5, 6, 7, 8, 10';
const timer_help_3 = " - !start CUSTOM {LENGTH OF SPEECH} {POI'S START} {POI'S CLOSE}\n - Creates a speech with given parameters, in minutes (positive integers or decimals). (30 sec is 0.5 min)\n POI'S START: How long until poi's are open\n POI'S CLOSE: How long until protected time starts";
const poll_help = ' - !poll {question} [option1] [option2]\n   Your question and options can be as long as you want. Maximum poll of 20 options\nIf you have no option, a "yes" and "no" poll will be generated';
const poll_help2 = " - !poll DEBATE\n   Creates a poll with question: What would you like to do for today's meeting?. and options: Anything, Debate, Judge, Vibe";
const note_help = "**NOTE: ALL COMMANDS WITH PARAMETERS SHOULD HAVE THEIR PARAMETERS SEPARATED WITH ONE SPACE"
const contact_help = 'If you need any help add me: Spiltbeans#3644';
const add_bot = 'To add this bot to your server click: https://discordapp.com/oauth2/authorize?client_id=695434891638341733&scope=bot&permissions=8';
const add_server ="Join the CUDS Discord if you haven't already! https://discord.gg/Sxn7gyS";
const source_code = "You can find the source code here: https://github.com/spiltbeans/NotTDBot";
const help_response = '+ Commands:\n'+help_help+'\n\n'+timer_help+'\n\n'+timer_help_2+'\n\n'+timer_help_3+'\n\n'+poll_help2+'\n\n'+poll_help+'\n\n'+note_help+'\n\n'+"+ Info:\n"+contact_help+'\n\n'+add_bot+'\n\n'+add_server+'\n\n'+source_code;

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

    if(msg.content.charAt(0) != prefix){    //return if not a command
        return;
    }
    //command handler
    if(params[0] == 'start'){   //timer command
        if(params.length == 1){ //start having no parameters
            //7 minute speech
            msg.reply("Timer started!: 7 Minute Speech");
            let openPOI = setTimeout(signal, min, msg, 'OPEN');
            let closePOI = setTimeout(signal, min*6, msg, 'CLOSED');
            time_signal(msg, 7);
            return;

        }else if(params.length == 2){   //start having more than one parameter

            if(params[1]=='{3}'){
                //3 minute speech
                msg.reply("Timer started!: 3 Minute Speech! All protected time!");
                time_signal(msg, 3);
                return;

            }else if(params[1]=='{4}'){
                //4 minute speech
                msg.reply("Timer started!: 4 Minute Speech! All protected time!");
                time_signal(msg, 4);
                return;

            }else if(params[1]=='{5}'){
                //6 minute speech
                msg.reply("Timer started!: 5 Minute Speech");
                let openPOI = setTimeout(signal, min/2, msg, 'OPEN');
                let closePOI = setTimeout(signal, ((min*4)+(min/2)), msg, 'CLOSED');
                time_signal(msg, 5);
                return;

            }else if(params[1]=='{6}'){
                //6 minute speech
                msg.reply("Timer started!: 6 Minute Speech");
                let openPOI = setTimeout(signal, min/2, msg, 'OPEN');
                let closePOI = setTimeout(signal, ((min*5)+(min/2)), msg, 'CLOSED');
                time_signal(msg, 6);
                return;

            }else if(params[1]=='{8}'){
                //8 minute speech
                msg.reply("Timer started!: 8 Minute Speech");
                let openPOI = setTimeout(signal, min, msg, 'OPEN');
                let closePOI = setTimeout(signal, min*7, msg, 'CLOSED');
                time_signal(msg, 8);
                return;

            }else if(params[1]=='{10}'){
                //10 minute speech
                msg.reply("Timer started!: 10 Minute Speech");
                let openPOI = setTimeout(signal, min, msg, 'OPEN');
                let closePOI = setTimeout(signal, min*6, msg, 'CLOSED');
                time_signal(msg, 10);
                return;

            }else if(params[1] == '{7}'){
                //7 minute speech
                msg.reply("Timer started!: 7 Minute Speech");
                let openPOI = setTimeout(signal, min, msg, 'OPEN');
                let closePOI = setTimeout(signal, min*6, msg, 'CLOSED');
                time_signal(msg, 7);
                return;
    
            }
        }else{      //start having more than 2 parameters

            if(params[1] == 'CUSTOM'){  //timer with custom time-signals
                //!start CUSTOM {length} {poi_start} {protected_start}

                if(params.length == 5){ //needs 5 pieces of information
                    let temp_length = params[2].substring(1, params[2].length -1);
                    let temp_poi_st = params[3].substring(1, params[3].length -1);
                    let temp_prot_st = params[4].substring(1, params[4].length -1);
                    let length = parseFloat(temp_length);               //full length of the speech
                    let poi_start = parseFloat(temp_poi_st);            //what time the poi's open up
                    let protected_start = parseFloat(temp_prot_st);      //what time protected time starts
                    
                    
                    if(temp_length == length.toString() && temp_poi_st == poi_start.toString() && temp_prot_st == protected_start.toString()){    //proceed if parameters are numbers
                        if(protected_start >= length){
                            msg.reply("Could not make custom timer: looks like your protected time will start after or at the same time as when your speech is finished... I mean, I guess thats not entirely wrong, but...");
                            return;
                        }
                                 
                        if(poi_start == 0){
                            if(protected_start == 0){
                                msg.reply("Timer for "+length+" mins started!. Looks like the entire speech is protected time :)")
                            }else{
                                msg.reply("Timer for "+length+" mins started!. POI's open. Protected time start in " +protected_start +" mins");
                                let openPOI = setTimeout(signal, min*poi_start, msg, 'OPEN');
                            }
                            
                        }else{
                            if(poi_start >= protected_start){
                                msg.reply("Could not make custom timer: looks like your poi's will start after or at the same time as when your protected time starts");
                                return;
                            }
                            msg.reply("Timer for "+length+" mins started!. Protected time ends in "+poi_start+" mins and will start again in " +protected_start +" mins");
                            let openPOI = setTimeout(signal, min*poi_start, msg, 'OPEN');
                        }
                        
                        
                        let closePOI = setTimeout(signal, (min)*protected_start, msg, 'CLOSED');
                        time_signal(msg, length);
                        return;
                    }else{
                        msg.reply("Sorry, could not make timer. One or more parameters are not numbers :(");
                        return;
                    }
                    
                }
    
            }
            
        }
        msg.reply("Sorry, but that is not a recognized command. Please type !help if you need any help with commands :)");
                
            
    }else if(params[0] == 'poll'){ //poll command
        /**poll logic */

        //collect question
        //collect answers

        //is the question is question format - might be preset
            
            //if in question format 
                //if there are answers
                    //do the poll with given question and answers
                //else
                    //do poll with yes and no
        //if no
            //if a preset, do a preset poll

        if(params.length == 1){ //if command only
             msg.reply("Sorry, could not make poll. Your poll has no questions or options :(")
             return;
        }
        let question = "";     //the question being asked
        let answers = [];      //list of answers, makes it easier to collect

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
        

        if(question.charAt(0) == '{' && question.charAt(question.length-2) == '}'){ // if in question format
            if(answers.length == 0){
                answers.push('[Yes]');
                answers.push('[No]');
            }
            //sends response if there are more than 20 options
            if(answers.length > 20){
                msg.channel.send('Cannot make a poll with more than 20 options :(')
                return;
            }

            //remove the {} from question
            question = question.substring(1, question.length-2);

            poll_response(msg, question, answers);
            return;
        }else{
            let preset = question.substring(0, question.length-1);
            if(preset == 'DEBATE'){
                poll_response(msg, "What would you like to do for today's meeting?", ["[Anything]", "[Debate]","[Judge]","[Vibe]"]);
                return;
            }else{
                msg.reply("Sorry, could not make poll. Poll preset not recognized :(");
                return;
            }
        }
        
        
        
    }else if(params[0] == 'help'){  //help command
        if(params.length == 1){
            msg.channel.send({embed: {
                color: 3447003,
                title: 'Help Page',
                description: help_response,
            }})
        }else{
            return
        }
        
    }
    // }else if(params[0] == 'terminate'){
    //     if(params.length == 2){
    //         if(params[1] == secrets.terminate_key){
    //             bot.logout(token);
    //         }
    //     }else{
    //         return
    //     }
    // }
});

bot.login(token);       //bot login with token

//function to display the poll
function poll_response(msg, question, answers){
    let options = "\n";    //will be the string of options
    let index = 97;        //ascii value for A. Increments based on options index
                           // will basically have 65 = A, next option will be 65+1 = B, ....

    let emoji_pre = '\:regional_indicator_';

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
}

function time_signal(msg, length){
    let closeSpeech = setTimeout(signal, min*length, msg, 'END');
    let graceFirst = setTimeout(signal, (min*length) + five_seconds, msg, 'GRACE1');
    let graceSecond = setTimeout(signal, (min*length) + five_seconds*2, msg, 'GRACE2');
    let graceThird = setTimeout(signal, (min*length) + five_seconds*3, msg, 'GRACE3');

}
//sending out time signals, including grace period
/**
 * OPEN - poi's open msg
 * CLOSED - poi's close msg
 * END - 15 second grace msg
 * GRACE1 - 5 seconds in grade msg
 * GRACE2 - 10 seconds in grace msg
 * GRACE53 - grace over msg
**/
function signal(msg, code){
    if(code == 'OPEN'){
        msg.reply("POI's Open");
    }else if(code == 'CLOSED'){
        msg.reply("POI's Closed");

    }else if(code == 'END'){
        msg.reply("Started: 15 Second Grace");

    }else if(code == 'GRACE1'){
        msg.reply("Grace: 5");

    }else if(code == 'GRACE2'){
        msg.reply("Grace: 10");

    }else if(code == 'GRACE3'){
        msg.reply("Grace Over!");
        msg.reply("*table bang* *table bang*");
    }
    
}