
//help response string
const note_help = "****NOTE: COMMANDS ARE CASE SENSITIVE AND ALL COMMANDS WITH PARAMETERS SHOULD HAVE THEIR PARAMETERS SEPARATED WITH ONE SPACE**"
const help_help = ' - +help - provides commands. You can type "+help {command/category}" for more information on a command.';
const start_help = ' - +start - Gives time signal for a 7 minute speech.';
const resume_help = ' - +resume - resumes a paused timer.';
const pause_help = ' - +pause - pauses a running timer.';
const msg_dev = ' - +msg DEV - used to send a message to the developer'
const checkin_help = ' - +checkin - used to set up a gate-keeper channel'
const poll_help = " - +poll DEBATE\n   Creates a poll with question: What would you like to do for today's meeting?. with options: Anything, Debate, Judge, Vibe.";
const add_bot = 'To add this bot to your server click https://discordapp.com/oauth2/authorize?client_id=695434891638341733&scope=bot&permissions=8';

const contact_help = 'If you need any help add me: Spiltbeans#3644';
const add_server ="Join the CUDS Discord if you haven't already! https://discord.gg/Sxn7gyS";
const suggestions = "If you have any suggestions for the bot, please fill out the form! https://forms.gle/urNntsGqJ8AvkEYQA"
const source_code = "You can find the source code here https://github.com/spiltbeans/NotTDBot; Version 4.1";

const help_response = note_help + '\n\n**Commonly used:**\n' + help_help + '\n\n' + start_help+ '\n\n' + resume_help+ '\n\n' + pause_help +'\n\n' +  poll_help +'\n\n' +  msg_dev +'\n\n' + checkin_help+ '\n\n**Categories:**\n - timer - Category for all timer commands \n - poll - Category for all poll commands\n - fan - Category for suggested commands\n - contact - Category for contact information! \n\n' + add_bot + "\n\n" + suggestions;

const Commands = require('./Command');
module.exports = class Help extends Commands{


    constructor(...args){
        super(...args,{
            name:'help',
            description:help_help,
            category: 'Help',
            usage: '+help  OR  +help {command/category}',
            presets: ""
        })
    }
    async execute(message, args){
        if(args.length == 1){
            return message.channel.send({embed: {
                color: 3447003,
                title: 'Help Page',
                description: help_response,
            }})
        }else if(args.length == 2){
            let command = (args[1].substring(1, args[1].length-1)).toLowerCase();
            if(this.bot.commands.has(command) && command != 'dev'){
                command = this.bot.commands.get(command);
                
                return message.channel.send({embed: {
                    color: 3447003,
                    title: command.category,
                    description: '**Command:** +'+command.name +'\n\n **Usage:** ' + command.usage + '\n\n **Description:** '+command.description + '\n\n **Presets:** '+ command.presets,
                }})
            }
            if(command == 'contact'){
                return message.channel.send({embed: {
                    color: 3447003,
                    title: 'Contact Information',
                    description: '**Developer:** '+contact_help +'\n\n **Server:** ' + add_server + '\n\n **Bot:** '+add_bot +'\n\n **Source Code:** '+source_code +'\n\n **Suggestion Form:** '+suggestions,
                }})
            }else if(command == 'start'){
                let b = {
                    name: "start",
                    description:"Creates a timer to give time signals for a debate speech",
                    category: 'Timer',
                    usage: "\n\n- +start \n\n OR \n\n- +start {LENGTH OF SPEECH} \n\n OR \n\n- +start CUSTOM {LENGTH OF SPEECH} {POIs START} {POIs CLOSE}",
                    parameters: "\n\n- {LENGTH OF SPEECH} - Options: 3, 4, 5, 6, 7, 8, 10 \n\n- CUSTOM {LENGTH OF SPEECH} {POIs START} {POIs CLOSE}\n **^** Creates a speech with given parameters, in minutes (positive integers or decimals). (30 sec is 0.5 min)\n POIs START: How long until pois are open\n POIs CLOSE: How long until protected time starts"
                }
                return message.channel.send({embed: {
                    color: 3447003,
                    title: b.category,
                    description: '**Command:** +'+b.name +'\n\n **Usage:** ' + b.usage + '\n\n **Description:** '+b.description + '\n\n **Parameters:** '+ b.parameters,
                }})
            }else if(command == 'pause'){
                let b = {
                    name: "pause",
                    description:"Pauses a timer currently running",
                    category: 'Timer',
                    usage: "\n\n- +pause \n\n OR \n\n- +pause {TIMER INDEX}",
                    parameters: "\n\n- {TIMER INDEX} - If more than one timer running, options: displayed when you type '+pause'"
                }
                return message.channel.send({embed: {
                    color: 3447003,
                    title: b.category,
                    description: '**Command:** +'+b.name +'\n\n **Usage:** ' + b.usage + '\n\n **Description:** '+b.description + '\n\n **Parameters:** '+ b.parameters,
                }})
                
            }else if(command == 'resume'){
                let b = {
                    name: "resume",
                    description:"Resumes a timer currently paused",
                    category: 'Timer',
                    usage: "\n\n- +resume \n\n OR \n\n- +resume {TIMER INDEX}",
                    parameters: "\n\n- {TIMER INDEX} - If more than one timer paused, options: displayed when you type '+resume'"
                }
                return message.channel.send({embed: {
                    color: 3447003,
                    title: b.category,
                    description: '**Command:** +'+b.name +'\n\n **Usage:** ' + b.usage + '\n\n **Description:** '+b.description + '\n\n **Parameters:** '+ b.parameters,
                }})
            }else if(command == 'end'){
                let b = {
                    name: "end",
                    description:"Kills a timer currently owned by user",
                    category: 'Timer',
                    usage: "\n\n- +end \n\n OR \n\n- +end {TIMER INDEX}",
                    parameters: "\n\n- {TIMER INDEX} - If more than one timer owned by user, options: displayed when you type '+end'"
                }
                return message.channel.send({embed: {
                    color: 3447003,
                    title: b.category,
                    description: '**Command:** +'+b.name +'\n\n **Usage:** ' + b.usage + '\n\n **Description:** '+b.description + '\n\n **Parameters:** '+ b.parameters,
                }})
            }else if(command == 'timers'){
                let b = {
                    name: "timers",
                    description:"Displays all timers currently owned by user",
                    category: 'Timer',
                    usage: "\n\n- +timers"
                }
                return message.channel.send({embed: {
                    color: 3447003,
                    title: b.category,
                    description: '**Command:** +'+b.name +'\n\n **Usage:** ' + b.usage + '\n\n **Description:** '+b.description,
                }})
            }else if(command == 'forward'){
                let b = {
                    name: "forward",
                    description:"Fast forward a timer currently owned by user",
                    category: 'Timer',
                    usage: "\n\n- +forward {TIME} \n\n OR \n\n- +forward {TIME} {TIMER INDEX}",
                    parameters: "\n\n- {TIME} - The amount of seconds you want to fast forward the timer \n\n- {TIMER INDEX} - If more than one timer owned by user, options: displayed when you type '+forward'"
                }
                return message.channel.send({embed: {
                    color: 3447003,
                    title: b.category,
                    description: '**Command:** +'+b.name +'\n\n **Usage:** ' + b.usage + '\n\n **Description:** '+b.description + '\n\n **Parameters:** '+ b.parameters,
                }})
            }else if(command == 'rewind'){
                let b = {
                    name: "rewind",
                    description:"Rewind a timer currently owned by user",
                    category: 'Timer',
                    usage: "\n\n- +rewind {TIME} \n\n OR \n\n- +rewind {TIME} {TIMER INDEX}",
                    parameters: "\n\n- {TIME} - The amount of seconds you want to rewind the timer \n\n- {TIMER INDEX} - If more than one timer owned by user, options: displayed when you type '+rewind'"
                }
                return message.channel.send({embed: {
                    color: 3447003,
                    title: b.category,
                    description: '**Command:** +'+b.name +'\n\n **Usage:** ' + b.usage + '\n\n **Description:** '+b.description + '\n\n **Parameters:** '+ b.parameters,
                }})
            }else if(command == 'f'){
                let b = {
                    name: "F",
                    description:"Pays respect. ~ Suggested by Gaura Cappelletti",
                    category: 'Fan Service',
                    usage: "\n\n- +f"
                }
                return message.channel.send({embed: {
                    color: 3447003,
                    title: b.category,
                    description: '**Command:** +'+b.name +'\n\n **Usage:** ' + b.usage + '\n\n **Description:** '+b.description,
                }})
            }else if(command == 'shake'){
                let b = {
                    name: "Shake",
                    description:"Sends a virtual 'Shaking hands' gif. ~ Suggested by Gaura Cappelletti",
                    category: 'Fan Service',
                    usage: "\n\n- +shake"
                }
                return message.channel.send({embed: {
                    color: 3447003,
                    title: b.category,
                    description: '**Command:** +'+b.name +'\n\n **Usage:** ' + b.usage + '\n\n **Description:** '+b.description,
                }})
            }else if(command == 'checkin'){
                let b = {
                    name: "checkin",
                    description:"Sends a response to help role assignment in a channel. One per server. ~ Suggested by Ellen Coady",
                    category: 'Check-In',
                    usage: "\n\n- +checkin {new_role_id} {equity_guideline}\n\nOR\n\n+checkin DELETE",
                    parameters: "new_role_id - Discord ID of the new role to be assigned\nequity_guideline - The Guideline, rules or constitution you would need users to agree with.\nDELETE - Deletes the current checkin"
                }
                return message.channel.send({embed: {
                    color: 3447003,
                    title: b.category,
                    description: '**Command:** +'+b.name +'\n\n **Usage:** ' + b.usage + '\n\n **Description:** '+b.description + '\n\n **Parameters:** '+ b.parameters,
                }})
            }else if(command == 'msg'){
                let b = {
                    name: "msg",
                    description:"Sends a message to the developer of the bot. If parameters are empty, will send a blank request for assistance",
                    category: 'Message Developer',
                    usage: "\n\n- +msg DEV {message}\n\nOR\n\n+msg DEV",
                    parameters: "message - parameter to fill with your customized message"
                }
                return message.channel.send({embed: {
                    color: 3447003,
                    title: b.category,
                    description: '**Command:** +'+b.name +'\n\n **Usage:** ' + b.usage + '\n\n **Description:** '+b.description + '\n\n **Parameters:** '+ b.parameters,
                }})
            }

            return message.channel.send('Sorry, that is not a recognized command. Please type +help if you need any help with commands')
        }
    }
}