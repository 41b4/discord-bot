
class Frog{
    constructor(){
        this.name='Harold'
        this.health=100
        this.fun=5
        this.alive=true
        this.hunger=10
    }
    yourFrog(){
        return `${this.name} is now your pet :frog: `
    }
    yourFrogStats(){
        let msg=`STATS: ${this.name}
            -------------------------
            :heart: ${this.health} :fly: ${this.hunger} :kissing_smiling_eyes: ${this.fun}
            -------------------------`
        return msg
    }
    petFrog(){
        if(this.fun<5 && this.health<100){
          this.fun+=1

          this.health+=1 
        }else{
            return `${this.name} cannot be happier`
        }
        return `${this.name} is happy` 
    }
    feedFrog(){
        if(this.hunger<10 && this.health<100){
            this.hunger+=1
            this.health+=1  
          }else{
              return `${this.name} isnt hungry`
          }
          return `om nom nom` 
    }

    
}
module.exports={
    Frog
}