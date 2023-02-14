const dotenv = require("dotenv");
dotenv.config(); //variable de entorno

const { DISCORD_TOKEN, CLIENT_ID } = require("./config");
const { ClientPresence, GatewayIntentBits, Client } = require("discord.js");
const colors = require("colors");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Bot ${client.user.tag} encendido`.bgBlue);
  console.log(`Bot ${client.user} encendido`.bgBlue);
  console.log(`Bot ${client.user.username} encendido`.bgBlue);

  client.user.setStatus("dnd"); //cambia el icono a rojo

  const testChanel = client.channels.cache;
  //console.log(testChanel.find(channel => channel.name === 'test'))//colocar el nombre del canal (usar uno de texto)
  client.application.commands.set([
    {
      name: "ping",
      description: "pong!",
      options: [],
    },
    {
      name: "game",
      description: "starts game (options: !stats, !pet, !feed)",
      options: [],
    },
  ]);
});
client.on("messageCreate", async (msg) => {
  // console.log(msg.author.username)
  // console.log(msg.content)
  if (msg.author.bot) return; //que no se conteste a si mismo

  if (msg.content === "ping") {
    await msg.reply("Pong!");
  }
  if (msg.content === "hola") {
    // await msg.channel.send('Hola bienvenido!')
    await msg.channel.send(`Hola bienvenido! ${msg.author}`);
  }
  if (msg.content === "!hola") {
    msg.reply("Hola que tal!!");
  }
  let argumentos = msg.content.split(" ");
  if (argumentos[0] == "!decir") {
    msg.reply(argumentos.slice(1).join(" "));
  }
  if (msg.content === "ribbit") {
    await msg.channel.send("ribbit");
  }
  //mayusculas
  if (msg.content === msg.content.toUpperCase()) {
    await msg.channel.send(`calla tonto ${msg.author} :^)`);
  }
  //palabrotas
  let tacos = ["recorcholis", "jambo", "equisde"];
  tacos.forEach((taco) => {
    if (msg.content.includes(taco)) {
      msg.reply("no en mi servidor cristiano!!");
    }
  });
});

client.on("interactionCreate", async (inter) => {
  if (inter.isCommand() && inter.commandName === "ping") {
    await inter.reply("pong!");
  }
});

// FROG GAME
const { Frog } = require("./game");
client.on("interactionCreate", async (inter) => {
  if (inter.isCommand() && inter.commandName === "game") {
    const frog = new Frog();
    console.log(frog.yourFrog());
    await inter.reply("game starting...");
    await inter.channel.send(frog.yourFrog());
    //start
    const start=setInterval(async()=>{
        if(frog.health>0){
            frog.health-=1
            frog.hunger-=2
            frog.fun-=1
            if(frog.hunger<=0){
                await inter.channel.send(`${frog.name} is really hungry`)
                frog.health-=1
            }
            if(frog.health<=10){
                await inter.channel.send(`${frog.name} health is really low`)
            }
            if(frog.fun<=0){
                await inter.channel.send(`${frog.name} is sad`)
                frog.health-=1
            }  
            console.log(frog.health)
        }else{
            
            frog.alive=false
            console.log(frog.health)
            clearInterval(start)
            await inter.channel.send(`${frog.name} is ded`)
        }
    },60000)
    if(frog.health>0){
    client.on("messageCreate", async (msg) => {
        if (msg.content == "!stats") {
           await msg.channel.send(frog.yourFrogStats());
        }
        if (msg.content == "!pet") {
            frog.petFrog();
           await msg.channel.send(frog.petFrog());
        }
        if (msg.content == "!feed") {
            frog.feedFrog();
           await msg.channel.send(frog.feedFrog());
        }
        })
    }
}});

client.login(DISCORD_TOKEN); //colocar token
