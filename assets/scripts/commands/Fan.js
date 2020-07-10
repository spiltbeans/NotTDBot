const Command = require('./Command');
module.exports = class Fan extends Command{

    constructor(...args){
        super(...args,{
            name:'Fan',
            description:'Commands that were suggested by bot users',
            category: 'Fan Service',
            usage: '\n\n- +f \n\n- +shake',
            presets: ""
        })
    }
    async execute(message, args){
        
        if(args.length == 1){
            if(args[0] == 'f'){
                return message.channel.send('*Paying Respects...*'); 
            }else if(args[0] == 'shake'){
                return message.channel.send('https://tenor.com/view/hand-shake-phone-digital-agree-agreement-gif-12726796');
            }
        }else{
            message.reply("Sorry, thats not a recognized command or improper usage."); 
        }
        
    }
}
