const dotenv = require('dotenv')
dotenv.config()//variable de entorno

const {DISCORD_TOKEN, CLIENT_ID}=require('./config')
const {ClientPresence, GatewayIntentBits, Client} = require('discord.js')
const colors=require('colors')

const client= new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.MessageContent,
    ]
})

client.once('ready',()=>{
    console.log(`Bot ${client.user.tag} encendido`.bgBlue)
    console.log(`Bot ${client.user} encendido`.bgBlue)
    console.log(`Bot ${client.user.username} encendido`.bgBlue)

    console.log(client.user.presence.status)
    client.user.setStatus('dnd') //cambia el icono a rojo
    console.log(client.user.presence.status)

    const testChanel =client.channels.cache
    console.log(testChanel.find(channel => channel.name === 'test'))//colocar el nombre del canal (usar uno de texto)
    client.application.commands.set([
        {
            name:'ping',
            description:'pong!',
            options:[]
        }
    ])
})
client.on('messageCreate',async(msg)=>{
    console.log(msg.author.username)
    console.log(msg.content)
    if (msg.author.bot) return

    if (msg.content==='ping'){
        await msg.reply('Pong!')
    }
    if (msg.content==='hola'){
        await msg.channel.send('Hola bienvenido!')
        await msg.channel.send(`Hola bienvenido! ${msg.author}`)
    }
    if (msg.content==='!hola'){
        msg.reply('Hola que tal!!')
    }
    let argumentos = msg.content.split(' ')
    if (argumentos[0]== '!decir'){
        msg.reply(argumentos.slice(1).join(' '))
    }
    if (msg.content==='ribbit'){
        await msg.channel.send("ribbit")
    }
    //mayusculas
    if (msg.content===msg.content.toUpperCase()){
        await msg.channel.send(`calla tonto ${msg.author} :^)`)
    }
    //palabrotas
    let tacos=['recorcholis','jambo','equisde']
    tacos.forEach(taco=>{if(msg.content.includes(taco)){
        msg.reply('no en mi servidor cristiano!!')
    }})
    
})

client.on('interactionCreate',async inter =>{
    if(inter.isCommand() && inter.commandName==='ping'){
        await inter.reply('pong!')
    }
})

client.login(DISCORD_TOKEN)//colocar token
