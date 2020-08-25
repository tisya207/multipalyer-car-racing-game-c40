class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value",function(data){
            gameState = data.val()
        })
        }

    update(state){
database.ref('/').update({
    gameState:state
})
    }

    async start(){
        if(gameState === 0){
            player = new Player()
            var playerCountRef = await database.ref("playerCount").once("value")
            if(playerCountRef.exists()){
        playerCount = playerCountRef.val()
        player.getCount()
            }
           
            form = new Form()
            form.display();
        }
        car1 = createSprite(100,200)
        car1.addImage("car1Img",car1Img)
        car2 = createSprite(300,200)
        car2.addImage("car2Img",car2Img)
        car3 = createSprite(500,200)
        car3.addImage("car3Img",car3Img)
        car4 = createSprite(700,200)
        car4.addImage("car4Img",car4Img)
        cars = [car1,car2,car3,car4]
    }
    play(){
        form.hide()
        Player.getPlayerInfo()
        text("game start", 120 ,100)
        //continue
        Player.getPlayerInfo()
        player.getCarsAtEnd()
        if(allPlayers!= undefined){
            background("white")
            image(trackImg,0,-displayHeight/4,displayWidth,displayHeight*5)
            var index = 0;
            var xPos = 175
            var yPos = 0
          //  var displayPosition = 130

            for(var plr in allPlayers){
            index += 1
            xPos += 200
            yPos = displayHeight - allPlayers[plr].distance
            cars[index - 1].x = xPos
            cars[index - 1 ].y = yPos
            if(index=== player.index){
                strokeWeight(10)
                fill("red")
                ellipse(xPos,yPos,60,60)
                cars[index - 1].shapeColor = "red"
                camera.position.x = displayWidth/2
                camera.position.y = cars[index - 1].y

            }
           // displayPosition+= 20

           // text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,displayPosition)
            }
        }
        if(keyIsDown(UP_ARROW) && player.index!=null){
            player.distance+= 50
            player.update()


        }
        if(player.distance > 3860){
              gameState = 2
              player.rank+=1
              Player.updateCarsAtEnd(player.rank)                    
        }
        drawSprites()
    }
    end(){
        console.log("gameEnded")
        game.update(2)
        console.log(player.rank)
    }
}



