# ChillMusic

**ChillMusic** es un bot de musica con soporte **Youtube** y **Spotify**. Desarrollado sin fines de lucro.

### Configuraciones

Ubicadas en el documento `config.js`.

```js
module.exports = {
    app: {
        token: 'XXX',
        global: true,
        guild: 'XXX'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEmpty: true,
        leaveOnEnd: true,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
```

### Instalación.

1. Conseguir el token de tu bot en [Discord Developers](https://discordapp.com/developers/applications)
2. Clona el repositorio
   ```sh
   git clone https://github.com/NicoYaez/ChillMusic
   ```
3. Instalar NPM packages
   ```sh
   npm install
   ```
4. Coloca tu token en `config.js`
   ```JS
   token: 'TU_TOKEN_AQUI'
   ```

Configuración Basica

- `app/token`, El token del bot disponible en [Discord Developers](https://discordapp.com/developers/applications).
- `app/global`, Si los comandos funcionarán en todos los servidores o solo en uno (si son globales, pueden tardar hasta una hora en aparecer)
- `app/guild`, En el canal en el que se cargará el comando de barra (esto solo se aplica si global se establece en falso)

Configuración Modo DJ

- `opt/DJ/enabled`, Si el modo DJ debe activarse o no.
- `opt/DJ/roleName`, El nombre del role de DJ que se utilizará.
- `opt/DJ/commands`, La lista de comandos limitada a miembros con el rol de DJ.

Configuración Avanzada

- `opt/maxVol`, El volumen máximo que los usuarios pueden definir.
- `opt/leaveOnEmpty`,  Si el bot se irá al estar vacio el canal.
- `opt/leaveOnEnd`,  Si el bot se irá al terminar la cola.
- `opt/loopMessage`, Si el mensaje de que se está reproduciendo una música debe enviarse cuando se reproduce en bucle.
- `opt/spotifyBridge`, Toma canciones/listas de reproducción de spotify y las busca en youtube y las reproduce (muy recomendable).
- `opt/defaultvolume`, Es el volumen predeterminado en el que comenzará la cola.
- `opt/discordPlayer`, Opciones usadas por discord-player.


Desarrollado por [NicoYaez](https://github.com/NicoYaez).

No retire la licencia y mantenga los créditos en este proyecto.
