const ray = require('raylib')
const player = require ('../player')
const {STATUS, itsPause, currentStatus, buttons} = require ('../menu/menu.js')

    function pause()
    {
            ray.DrawText("PAUSED", 240, 100, 30, ray.DARKGRAY);
            ray.DrawRectangleRec(buttons.backMenu, buttons.backMenu.color);
            ray.DrawText("MENU", buttons.backMenu.x + 55, buttons.backMenu.y + 15, 25, ray.WHITE);
            itsPause()
    }

    function drawPlaying()
    {
            
            player.playerDraw()
            player.playerWalk()
            ray.DrawText(`Vida: ${player.life}`, 10, 10, 10, ray.DARKBLUE); // escreve uma parada na tela
    }

module.exports = 
{
    drawPlaying,
    pause
}