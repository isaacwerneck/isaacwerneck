const ray = require('raylib')
const player = require('./player')
const { STATUS, currentStatus, itsMenu, drawMenu} = require("./menu/menu.js");
const {drawPlaying, pause} = require('./gameplay/playing.js');

// tamanho da janela
const screenWidth = 800;
const screenHeight = 450;

ray.InitWindow(screenWidth, screenHeight, "dungeon4fun"); // pra abrir a janela rodando o jogo
ray.SetTargetFPS(60); // define a trava de 60 fps
ray.SetExitKey(0)

// loop pra enquanto o jogo não fechar ele vai rodar isso
while(!ray.WindowShouldClose()){

    itsMenu()

    // rendering
    ray.BeginDrawing();

        ray.ClearBackground(ray.WHITE)

        if(currentStatus.current === STATUS.MENU)
        {
            drawMenu();
        } 
        
        if(currentStatus.current === STATUS.PLAYING)
        {    
            drawPlaying();
        }

        if(ray.IsKeyReleased(ray.KEY_ESCAPE))
        {
            if (currentStatus.current === STATUS.PLAYING)
            {
                currentStatus.current = STATUS.PAUSED
            }
        }
        if(currentStatus.current === STATUS.PAUSED)
        {
            pause();
        }

    ray.EndDrawing();

    if (player.life <= 0){ray.CloseWindow()}

};

ray.CloseWindow();

