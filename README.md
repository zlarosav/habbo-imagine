# Habbo Imagine

Esta biblioteca sirve para generar imágenes y GIFs a partir de avatares de Habbo utilizando URLs generadas por herramientas como [Nitro-imager](https://github.com/billsonnn/nitro-imager) y [Habbo-imaging](https://www.habbo.es/habbo-imaging/avatarimage?user=nevtr4l). Habbo-Imagine tiene soporte para Habbo (Sulake), Habbo holos, Habbo copias, Habbo retros, etc.

## Instalación

Para instalar la biblioteca, utiliza el siguiente comando en tu terminal:

```bash
npm install habbo-imagine
```

## Funciones públicas

- **Generar Imagen Ship** `generateShipImage(usernames, urls)`

  Crea una imagen positiva o negativa dependiendo del porcentaje de compatibilidad entre dos usuarios.
  
  | Parámetro    | Descripción                                                     |
  | ------------ | --------------------------------------------------------------- |
  | `usernames`  | Recibe un **array** con los dos nombres de ambos usuarios       |
  | `urls`       | Recibe un **array** de dos URLs de los avatar de ambos usuarios |

  ![Ship Fail](https://github.com/zlarosav/habbo-imagine/blob/main/examples/ship-fail.gif)
  ![Ship](https://github.com/zlarosav/habbo-imagine/blob/main/examples/ship.gif)

- **Generar Imagen Shark** `generateSharkImage(url)`

  Crea una imagen de un usuario siendo devorado por un tiburón.

  | Parámetro    | Descripción                                               |
  | ------------ | --------------------------------------------------------- |
  | `url`        | Recibe un **string** de la URL del avatar del usuario     |

  ![Shark](https://github.com/zlarosav/habbo-imagine/blob/main/examples/shark.gif)

## Ejemplos de uso

Esta biblioteca puede ser usada en todo tipo de aplicaciones, incluyendo bots de discord, etc.

```js
// Importa la biblioteca
const HabboImagine = require("habbo-imagine");

// Crea un objeto HabboImagine
const habboGenerator = new HabboImagine();

// Ejemplo de generación de imagen "ship"
const shipImage = await habboGenerator.generateShipImage(
  ["https://www.habbo.es/habbo-imaging/avatarimage?&user=Marcos", "https://www.habbo.es/habbo-imaging/avatarimage?&user=Elena"],
  ["Marcos", "Elena"]
);

// Ejemplo de generación de imagen "shark"
const sharkImage = await habboGenerator.generateSharkImage("https://www.habbo.es/habbo-imaging/avatarimage?&user=Marcos");
```

![Imagen](https://github.com/zlarosav/habbo-imagine/blob/main/examples/shark-discord.png)