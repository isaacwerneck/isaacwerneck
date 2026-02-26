const ray = require('raylib')

// obj player
const player = {
    x: 400,
    y:225,
    radius: 20,
    color: ray.YELLOW,
    speed: 5,
    life: 5,

// input de botões
playerWalk: function()
{
    
    let dx = 0;
    let dy = 0;

        if (ray.IsKeyDown(ray.KEY_D)) {dx += 1}
        if (ray.IsKeyDown(ray.KEY_A)) {dx -= 1}
        if (ray.IsKeyDown(ray.KEY_W)) {dy -= 1}
        if (ray.IsKeyDown(ray.KEY_S)) {dy += 1}

        if (dx !== 0 && dy !== 0)
            {
            const diagonal = Math.sqrt(0.5);
            dx *= diagonal
            dy *= diagonal
            }

        player.x += dx * player.speed
        player.y += dy * player.speed
},

// desenha o personagem na tela
playerDraw: function()
{
    ray.DrawCircle(player.x, player.y, player.radius, player.color);
}

};
module.exports = player;