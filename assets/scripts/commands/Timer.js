//msg.reply("Sorry, but that is not a recognized command. Please type +help if you need any help with commands :)");
const Command = require('./Command')

//convenient time conversions (ms)           
const secondMS = 1000.0;

//structure to hold all timers
let timers = {}

//Timer class to keep track of time signals
class Timer{
    //time will be saved in minute value
    constructor(message, poiOpen, poiClose, speechLength){
        this.message = message;
        this.poiOpen = poiOpen;
        this.poiClose = poiClose;
        this.speechLength = speechLength;
        this.running = false;
        this.alive = true;
        this.count = 0;     
        //if the author does not have a list of timers, make id 0
        if(!timers[this.message.author.id]){
            this.id = 0;
        }else{
        //otherwise, set the id to the length of the timer array        
            this.id = timers[this.message.author.id].length;
            
        }
    }
    //sets the id
    setId(id){
        this.id = id;
    }

    //start the timer
    start(){
        this.running = true;
        this.tick()
    }

    //pause the timer
    pause(){
        this.running = false;
        
    }

    //stop the timer, effectively killing the timer
    stop(){
        this.alive = false;
        this.running = false;
        removeTimer(this.message, this.id);
        
    }
    
    tick(){
        
        //if the timer is running
        if(this.running){
            
            //check if the timer should send a poi open signal
            if(this.count == (this.poiOpen*60)){
                signal(this.message, 'OPEN');
            
            //check if the timer should send a poi closed signal
            }else if(this.count == (this.poiClose*60)){
                signal(this.message, 'CLOSED')
            
            //check if the timer should send a speech ending signal
            }else if(this.count == (this.speechLength * 60)){
                start_grace(this.message);
                this.stop();
            }
            //increment timer and restart tick
            this.count++;
            setTimeout(tickTimer, secondMS, this)
            
        }
        
    }

}


module.exports = class Timer extends Command{

    constructor(...args){
        super(...args,{
            name:'timer',
            description:"Creates a timer to give time signals for a debate speech",
            category: 'Timer',
            usage: "\n\n- +start \n\n- +pause \n\n- +resume \n\n- +end \n\n- +timers",
            presets: ""
        })
    }
    async execute(message, args){
        //gets args in minutes
        if(args[0] == 'start'){
            //process the arguments to start the correct timer
            return processTimer(message, args);

        }else if(args[0] == 'pause'){
            //check if the message author has a timer currently
            if(message.author.id in timers){
                //if yes, get the author's timer list and send pause request for timer
                let t = timers[message.author.id]
                pauseTimer(message, t, args);

            }else{
                message.reply("You have no timers currently ticking.")
            }
        }else if(args[0] == 'resume'){
            //check if the message author has a timer currently
            if(message.author.id in timers){
                //if yes, get the author's timer list and send resume request for timer
                let t = timers[message.author.id]
                resumeTimer(message, t, args);

            }else{
                message.reply("You have no timers currently paused.")
            }
        }else if(args[0] == 'timers'){
            //check if the message author has a timer currently
            if(message.author.id in timers){
                //if yes, get the author's timer list and send list request for timer
                let t = timers[message.author.id]
                listTimers(message, t, args);

            }else{
                message.reply("You have no timers currently ticking.")
            }
        }else if(args[0] == 'end'){
            //check if the message author has a timer currently
            if(message.author.id in timers){
                //if yes, get the author's timer list and send kill request for timer
                let t = timers[message.author.id]
                killTimer(message, t, args);

            }else{
                message.reply("You have no timers currently ticking.")
            }
        }
        
        
    }
}


//get params in minutes
function createTimer(message, poiOpen, poiClose, speechLength){
    //creates and starts timer
    let t = new Timer(message, poiOpen, poiClose, speechLength)
    t.start();

    //check if message author already has a timer, if it does - append to list
    if(message.author.id in timers){
        timers[message.author.id].push(t);
    }else{
        timers[message.author.id] = [t];
    }
}

//tick timer
function tickTimer(t){
    t.tick();
}

//pause a given timer
function pauseTimer(message, t, args){
    //if there are no +pause parameters
    if(args.length == 1){

        /**
         * Basically a loop to check how many timers are running, and create a string to summarize information
         */
        let run = 0;
        let res = "";
        let index = 0;
        for(var i = 0; i < t.length; i++){
            if(t[i].running){
                run++;
                res+= " {"+i+"} - "+ t[i].speechLength + " minute speech; Currently at " + Math.trunc(t[i].count/60) + " : " + t[i].count%60 + " minutes.\n\n"
                index = i;
            }
        }
        res += "To pause a timer, type '+pause {TIMER INDEX}' - index refers to the order of the timers you own";

        //if there is only one timer running, pause it
        if(run == 1){
            message.reply(message.author.username + "'s timer paused!; Currently at " + Math.trunc(t[index].count/60) + " : " + t[index].count%60 + " minutes.")
            return t[index].pause();
            
        }else if(run == 0){
            return message.reply("You have no timers currently ticking.")
        }else{
        //if multiple timers running, send out timers summary response
            return message.reply(" You Have " + run + " timers running:\n" + res);
        }
    
    //if there are parameters on the +pause command
    }else if(args.length == 2){
        //extract number from the parameters
        let temp_index = args[1].substring(1, args[1].length -1);
        let index = parseFloat(temp_index);

        //check if the parameter is a number
        if(temp_index == index.toString()){
            
            //if the parameter is greater than the amount of timers available
            if(index < t.length){
                if(t[index].running){
                    message.reply(message.author.username + "'s timer paused!; Currently at " + Math.trunc(t[index].count/60) + " : " + t[index].count%60 + " minutes.");
                    return t[index].pause();
                }
                
                
            }
            
        }
        return message.reply('Timer not found. You might not have one ticking.');    
    }
    
    
    
}

function resumeTimer(message, t, args){
    //if there are no +resume parameters
    if(args.length == 1){

        /**
         * Basically a loop to check how many timers are paused, and create a string to summarize information
         */
        let not_run = 0;
        let res = "";
        let index = 0;
        for(var i = 0; i < t.length; i++){
            if(!t[i].running){
                not_run++;
                res+= " {"+i+"} - "+ t[i].speechLength + " minute speech; Currently at " + Math.trunc(t[i].count/60) + " : " + t[i].count%60 + " minutes.\n\n"
                index = i;
            }
        }
        res += "To resume a timer, type '+resume {TIMER INDEX}' - index refers to the order of the timers you own";

        //if there is only one timer paused, resume it
        if(not_run == 1){
            message.reply(message.author.username + "'s timer resumed!; Currently at " + Math.trunc(t[index].count/60) + " : " + t[index].count%60 + " minutes.")
            return t[index].start();
            
        }else if(not_run == 0){
            return message.reply("You have no timers currently paused.")
        }else{
        //if multiple timers paused, send out timers summary response
            return message.reply(" You Have " + not_run + " timers paused:\n" + res);
        }
    
    //if there are parameters on the +resume command
    }else if(args.length == 2){
        //extract number from the parameters
        let temp_index = args[1].substring(1, args[1].length -1);
        let index = parseFloat(temp_index);

        //check if the parameter is a number
        if(temp_index == index.toString()){
            
            //if the parameter is greater than the amount of timers available
            if(index < t.length){
                if(!t[index].running){
                    message.reply(message.author.username + "'s timer resumed!; Currently at " + Math.trunc(t[index].count/60) + " : " + t[index].count%60 + " minutes.");
                    return t[index].start();
                }
                
                
            }
            
        }
        return message.reply('Timer not found. You might not have one paused.');     
    }
    
}


function killTimer(message, t, args){
    //if there are no +end parameters
    if(args.length == 1){

        /**
         * Basically a loop to check how many timers exist, and create a string to summarize information
         */
        let timer_count = 0;
        let res = "";
        for(var i = 0; i < t.length; i++){
            if(t[i].running){
                res+= " {"+i+"} - "+ t[i].speechLength + " minute speech; Currently RUNNING at " + Math.trunc(t[i].count/60) + " : " + t[i].count%60 + " minutes.\n\n"

            }else{
                res+= " {"+i+"} - "+ t[i].speechLength + " minute speech; Currently PAUSED at " + Math.trunc(t[i].count/60) + " : " + t[i].count%60 + " minutes.\n\n"
            }
            timer_count++;
        }
        res += "To kill a timer, type '+end {TIMER INDEX}' - index refers to the order of the timers you own";
        
        //if there is only one timer end it
        if(timer_count == 1){
            message.reply(message.author.username + "'s timer ended!; Ended at " + Math.trunc(t[0].count/60) + " : " + t[0].count%60 + " minutes.");
            return t[0].stop();
            
        }else if(timer_count == 0){
            return message.reply("You have no timers currently ticking.")
        }else{
        //if multiple timers exist, send out timers summary response
            return message.reply(" You Have " + timer_count + " timers:\n" + res);
        }

            
    //if there are parameters on the +end command
    }else if(args.length == 2){
        //extract number from the parameters
        let temp_index = args[1].substring(1, args[1].length -1);
        let index = parseFloat(temp_index);

        //check if the parameter is a number
        if(temp_index == index.toString()){
            
            //if the parameter is greater than the amount of timers available
            if(index < t.length){
                message.reply(message.author.username + "'s timer ended!; Ended at " + Math.trunc(t[index].count/60) + " : " + t[index].count%60 + " minutes.");
                return t[index].stop();
                
            }
            
        }
        return message.reply('Timer not found. It may not exist.');
                
    }
    
}

//removes timer from list of timers
function removeTimer(message, index){
    let id  = message.author.id;

    //remove timer from array
    (timers[id]).splice(index, 1);
    
    //re-adjust the timer id's
    for(var i = 0; i< (timers[id]).length; i ++){
        (timers[id])[i].setId(i);
    }

}

function listTimers(message, t, args){
    if(args.length == 1){
        /**
         * Basically a loop to check how many timers exist, and create a string to summarize information
         */
        let timer_count = 0;
        let res = "";
        for(var i = 0; i < t.length; i++){
            if(t[i].running){
                res+= " {"+i+"} - "+ t[i].speechLength + " minute speech; Currently RUNNING at " + Math.trunc(t[i].count/60) + " : " + t[i].count%60 + " minutes.\n\n"

            }else{
                res+= " {"+i+"} - "+ t[i].speechLength + " minute speech; Currently PAUSED at " + Math.trunc(t[i].count/60) + " : " + t[i].count%60 + " minutes.\n\n"
            }
            timer_count++;
        }
        return message.reply(" You Have " + timer_count + " timers:\n" + res);
    }

    
}


function processTimer(message, args){
    
    if(args.length == 1){ //start having no parameters
        //7 minute speech
        message.reply("Timer started!: 7 Minute Speech");
        createTimer(message, 1, 6, 7)
        

    }else if(args.length == 2){   //start having more than one parameter

        if(args[1]=='{3}'){
            //3 minute speech
            message.reply("Timer started!: 3 Minute Speech! All protected time!");
            createTimer(message, -1, -1, 3)
            

        }else if(args[1]=='{4}'){
            //4 minute speech
            message.reply("Timer started!: 4 Minute Speech! All protected time!");
            createTimer(message, -1, -1, 4)

        }else if(args[1]=='{5}'){
            //6 minute speech
            message.reply("Timer started!: 5 Minute Speech");
            createTimer(message, 0.5, 4.5, 5)
            
        }else if(args[1]=='{6}'){
            //6 minute speech
            message.reply("Timer started!: 6 Minute Speech");
            createTimer(message, 0.5, 5.5, 6)
            

        }else if(args[1]=='{8}'){
            //8 minute speech
            message.reply("Timer started!: 8 Minute Speech");
            createTimer(message, 1, 7, 8)

        }else if(args[1]=='{10}'){
            //10 minute speech
            message.reply("Timer started!: 10 Minute Speech");
            createTimer(message, 1, 6, 10)
            
        }else if(args[1] == '{7}'){
            //7 minute speech
            message.reply("Timer started!: 7 Minute Speech");
            createTimer(message, 1, 6, 7)

        }
    }else{      //start having more than 2 parameters

        if(args[1] == 'CUSTOM'){  //timer with custom time-signals
            //+start CUSTOM {length} {poi_start} {protected_start}

            if(args.length == 5){ //needs 5 pieces of information
                let temp_length = args[2].substring(1, args[2].length -1);
                let temp_poi_st = args[3].substring(1, args[3].length -1);
                let temp_prot_st = args[4].substring(1, args[4].length -1);
                let length = parseFloat(temp_length);               //full length of the speech
                let poi_start = parseFloat(temp_poi_st);            //what time the poi's open up
                let protected_start = parseFloat(temp_prot_st);      //what time protected time starts
                
                if(temp_length == length.toString() && temp_poi_st == poi_start.toString() && temp_prot_st == protected_start.toString()){    //proceed if parameters are numbers
                    if(protected_start >= length){
                        return message.reply("Could not make custom timer: looks like your protected time will start after or at the same time as when your speech is finished... I mean, I guess thats not entirely wrong, but...");
                        
                    }
                                
                    if(poi_start == 0){
                        if(protected_start == 0){
                            message.reply("Timer for "+length+" mins started!. Looks like the entire speech is protected time :)")
                            return createTimer(message, -1, -1, length)
                        }else{
                            message.reply("Timer for "+length+" mins started!. POI's open. Protected time start in " +protected_start +" mins");
                            return createTimer(message, -1, protected_start, length)
                        }
                        
                    }else{
                        if(poi_start >= protected_start){
                            return message.reply("Could not make custom timer: looks like your poi's will start after or at the same time as when your protected time starts");
                            
                        }
                        message.reply("Timer for "+length+" mins started!. Protected time ends in "+poi_start+" mins and will start again in " +protected_start +" mins");
                        return createTimer(message, poi_start, protected_start, length)
                    }
                    
                    
                }else{
                    return message.reply("Sorry, could not make timer. One or more parameters are not numbers :(");
                    
                }
                
            }

        }
        
    }
}

function start_grace(msg){
    signal(msg, 'END');
    let graceFirst = setTimeout(signal, secondMS*5, msg, 'GRACE5');
    let graceSecond = setTimeout(signal, secondMS*10, msg, 'GRACE10');
    let graceThird = setTimeout(signal, secondMS*15, msg, 'GRACE15');
}
//sending out time signals, including grace period
/**
 * OPEN - poi's open msg
 * CLOSED - poi's close msg
 * END - 15 second grace msg
 * GRACE5 - 5 seconds in grade msg
 * GRACE10 - 10 seconds in grace msg
 * GRACE15 - grace over msg
**/
function signal(msg, code){
    if(code == 'OPEN'){
        msg.reply("POI's Open");
    }else if(code == 'CLOSED'){
        msg.reply("POI's Closed");

    }else if(code == 'END'){
        msg.reply("Started: 15 Second Grace");

    }else if(code == 'GRACE5'){
        msg.reply("Grace: 5");

    }else if(code == 'GRACE10'){
        msg.reply("Grace: 10");

    }else if(code == 'GRACE15'){
        msg.reply("Grace Over!");
        msg.reply("*table bang* *table bang*");
    }
    
}