module.exports = class Command{
    constructor(bot, options = {}){
        this.bot = bot;
        this.name = options.name || "No name provided.";
        this.aliases = options.aliases || [];
        this.description = options.description || "No description provided.";
        this.category = options.category || "Misc.";
        this.usage = options.usage || "No usage provided.";
        this.presets = options.presets || "No presets assigned."
    }

    async execute(message, args){
        throw new Error(`Command ${this.name} doesn't have method.`)
    }

}