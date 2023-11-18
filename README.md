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

  ![image](https://cdn.discordapp.com/attachments/886715894066200617/1174615042692493352/test.gif?ex=65683c81&is=6555c781&hm=012fcdb95f694e5948b1d478643d498f42b1063f4d537829a88484e73cf1581a&)
  ![image](https://cdn.discordapp.com/attachments/938014069871484973/1175354724531318875/ship.gif?ex=656aed63&is=65587863&hm=4c18915ee81a59054609b09af586400ccfe46a96e4ce7ee075310a9a15c33c36&)

- **Generar Imagen Shark** `generateSharkImage(url)`

  Crea una imagen de un usuario siendo devorado por un tiburón.

  | Parámetro    | Descripción                                               |
  | ------------ | --------------------------------------------------------- |
  | `url`        | Recibe un **string** de la URL del avatar del usuario     |

  ![image](https://cdn.discordapp.com/attachments/938014069871484973/1175306724727607316/shark.gif?ex=656ac0af&is=65584baf&hm=f69515b5bbcc7b54158e8f24f298df3d0522636fe13677252c2afcf0ad711111&)

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

![Imagen](https://media.discordapp.net/attachments/938014069871484973/1175357531850276904/image.png?ex=656af000&is=65587b00&hm=fcecc88f9ae5e67600471c8f04ac0dd9c49930c269af802bd5a01ed65f4fce20&=)
![Imagen](https://media.discordapp.net/attachments/938014069871484973/1175357749928931398/image.png?ex=656af034&is=65587b34&hm=f329e34e27f3e079eeae7ddc01d5695e42390258aed89bb7d9badfdf2bdcfa4d&=)