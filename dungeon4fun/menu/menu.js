const ray = require("raylib")
const player = require("../player.js")

const STATUS = 
{
    MENU: "MENU",
    PLAYING: "PLAYING",
    PAUSED: "PAUSED"
}

let currentStatus = {current: STATUS.MENU}


const buttons = 
{
    play: 
    {
        x: 300,
        y: 200,
        width: 200,
        height: 60,
        color: ray.GRAY
    },
        backMenu: 
    {
        x: 300,
        y: 200,
        width: 200,
        height: 60,
        color: ray.GRAY
    },
}

function itsPause()
{
    const mousePos = ray.GetMousePosition();

    if (currentStatus.current === STATUS.PAUSED)
    {
        if (ray.CheckCollisionPointRec(mousePos, buttons.backMenu))
        {
            buttons.backMenu.color = ray.LIGHTGRAY

            if (ray.IsMouseButtonPressed(ray.MOUSE_BUTTON_LEFT))
            {
                currentStatus.current = STATUS.MENU
                console.log("voltando ao menu")
            }
        } else 
            {
                buttons.backMenu.color = ray.GRAY
            }
    }
}

function itsMenu()
{
        const mousePos = ray.GetMousePosition();

    // qnd estiver no modo menu vai rodar isso
    if (currentStatus.current === STATUS.MENU){
        // vê se o mouse ta em cima dos botões
        if (ray.CheckCollisionPointRec(mousePos, buttons.play)){
            buttons.play.color = ray.LIGHTGRAY // feedback visual

            // se clicar no botão
            if (ray.IsMouseButtonPressed(ray.MOUSE_BUTTON_LEFT))
                {
                currentStatus.current = STATUS.PLAYING
                console.log(currentStatus.current)
                }

        } else
            {
                buttons.play.color = ray.GRAY 
            };
    };
};

    function drawMenu()
    {
            // titulo do jogo
            ray.DrawText("Dungeon4fun", 240, 100, 30, ray.DARKGRAY);

            // desenha o botão
            ray.DrawRectangleRec(buttons.play, buttons.play.color);
            ray.DrawText("Play", buttons.play.x + 55, buttons.play.y + 15, 25, ray.WHITE);

    }

module.exports = 
{
    STATUS,
    buttons,
    currentStatus,
    itsMenu,
    drawMenu,
    itsPause
}
