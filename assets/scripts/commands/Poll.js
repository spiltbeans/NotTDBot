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
const Command = require('./Command')
module.exports = class Poll extends Command{

    constructor(...args){
        super(...args, {
            name:'poll',
            description:'Creates a poll with custom question and answers.\n   Your question and options can be as long as you want. Maximum poll of 20 options\nIf you have no option, a "yes" and "no" poll will be generated',
            category: 'Poll',
            usage: '+poll {question} [option1] [option2]',
            presets: "DEBATE - Creates a poll with question: What would you like to do for today's meeting?. with options: Anything, Debate, Judge, Vibe."
            
        })
    }
    
    async execute(message, args){ 
        let question;
        let answers = [];

        if(args.length == 1){ //if command only
            return message.reply("Sorry, could not make poll. Your poll has no questions or options :(")
            

        }else if(args.length == 2){ //looking to generate preset poll
            if(args[1] == 'DEBATE'){
                return poll_response(message, "What would you like to do for today's meeting?", ["Anything", "Debate","Judge","Vibe"]);
                
            }else{
                if(!getQuestions(args, message)){
                    return message.reply("Sorry, could not make poll. Poll preset not recognized :(");
                }
                
            }
            
        }
        
        question = getQuestions(args, message);  //the question being asked
        answers = getAnswers(args, message);     //list of answers, makes it easier to collect
        if(!question){
            return message.reply("Sorry, could not make poll. Problem with poll question");
        }
        if(answers.length == 0){
            answers.push('Yes');
            answers.push('No');
        }
        
        //sends response if there are more than 20 options
        if(answers.length > 20){
            message.channel.send('Cannot make a poll with more than 20 options :(')
            return;
        }
        return poll_response(message, question, answers);
    }
}


//function to display the poll
function poll_response(message, question, answers){
    let options = "\n";    //will be the string of options
    let index = 97;        //ascii value for A. Increments based on options index
                           // will basically have 65 = A, next option will be 65+1 = B, ....

    let emoji_pre = '\:regional_indicator_';

    //parse through answers and add to options string, with index
    for(var i = 0; i < answers.length; i++){
        let temp = answers[i].charAt(0).toUpperCase()+answers[i].substring(1); //capitalizes the option
        options+= '\n';
        options+= (emoji_pre+String.fromCharCode(index)+':'+': '+ temp + '\n');                     //adding the option with the emoji
        index++;
    }
    
    //poll response
    message.channel.send({embed: {
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

function getQuestions(args, message){
    try{
        
        let full = "";
        let q = "";
        for(var i = 0; i < args.length; i++){
            full+=args[i] + " ";
        }
        if(full.indexOf('{') < 0  || full.indexOf('}') < 0){
            return false;
        }

        q = full.substring(full.indexOf('{')+1, full.indexOf('}'));
        return q;
    }catch(e){
        message.reply('There is something wrong with the question');
        return console.log(e + ': There is something wrong with the question');
    }
    
}
function getAnswers(args, message){
    try{
        let full = "";
        let a = [];
        let temp = "";
        let collect = false;
        for(var i = 0; i < args.length; i++){
            full+=args[i] + " ";
        }
        for(var t = full.indexOf('}'); t < full.length; t++){
            
            if(full.charAt(t) == '['){
                collect = true;
            }else if(full.charAt(t) == ']'){
                collect = false;
                a.push(temp.substring(1));
                temp = "";
            }
            if(collect){
                temp+= full.charAt(t);
            }
        }
        return (a);
    }catch(e){
        message.reply('There is something wrong with the options');
        return console.log(e + ': There is something wrong with the options');
    }
}