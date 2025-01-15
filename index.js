const Canvas = require("canvas")
const GIFEncoder = require("gifencoder")
const path = require("path")

/**
 * Generador de imágenes y gif basados en tu avatar de Habbo.
 * 
 * Información de uso: https://github.com/zlarosav/habbo-imagine
 */
class HabboImagine {
    constructor() {
        this.canvas = null
        this.ctx = null
        this.encoder = null
        this.shipGif1 = []
        this.shipGif2 = []
    }

    /**
     * Inicializa el lienzo para la generación de imágenes.
     * @private Este método es únicamente para uso interno.
     */
    async initializeCanvas(width, height) {
        this.canvas = Canvas.createCanvas(width, height)
        this.ctx = this.canvas.getContext("2d")
    }

    /**
     * Inicializa el codificador GIF para la generación de imágenes animadas.
     * @private Este método es únicamente para uso interno.
     */
    async initializeGIFEncoder(width, height, delay) {
        this.encoder = new GIFEncoder(width, height)
        this.encoder.start()
        this.encoder.setRepeat(0)
        this.encoder.setDelay(delay)
        this.encoder.setTransparent(0x00FF00) // Usar verde puro como transparente
    }

    /**
     * Genera una imagen "ship" basada en las URLs del avatar de Habbo y el nombre de usuario.
     * 
     * Retorna una imagen con un porcentaje de compatibilidad entre ambos usuarios.
     * @param {string[]} usernames - Un array de dos nombres de dos usuarios diferentes.
     * @param {string[]} urls - Un array de dos URLs de los Habbo avatar de dos usuarios diferentes.
     * 
     * @example
     * // Ejemplo de uso:
     * await habboGenerator.generateShipImage(
     *   ["https://www.habbo.es/habbo-imaging/avatarimage?&user=Marcos", "https://www.habbo.es/habbo-imaging/avatarimage?&user=Elena"],
     *   ["Marcos", "Elena"]
     * );
     * 
     */
    async generateShipImage(usernames, urls) {
        if (!Array.isArray(urls)) throw new Error("Debes especificar un array de solo dos url.\n>> Ejemplo: [\"https://www.habbo.es/habbo-imaging/avatarimage?&user=Marcos\", \"https://www.habbo.es/habbo-imaging/avatarimage?&user=Elena\"]\n\n")
        if (urls.length != 2) throw new Error("Debes especificar un array de solo dos url.\n>> Ejemplo: [\"https://www.habbo.es/habbo-imaging/avatarimage?&user=Marcos\", \"https://www.habbo.es/habbo-imaging/avatarimage?&user=Elena\"]\n\n")

        if (!Array.isArray(usernames)) throw new Error("Debes especificar un array de solo dos nombres de usuario.\n>> Ejemplo: [\"Marcos\", \"Elena\"]\n\n")
        if (usernames.length != 2) throw new Error("Debes especificar un array de solo dos nombres de usuario.\n>> Ejemplo: [\"Marcos\", \"Elena\"]\n\n")

        // Calcula el porcentaje de la compatibilidad
        const number = Math.floor(Math.random() * 100)
        if (number > 50) {
            await this.initializeCanvas(311, 236)
            await this.initializeGIFEncoder(311, 236, 300)

            // Modificar las posiciones de los avatares
            const urls1 = [
                `${urls[0]}&action=std&direction=1&head_direction=1&img_format=png&gesture=std&frame=1&headonly=0&size=m`,
                `${urls[0]}&action=std&direction=1&head_direction=1&img_format=png&gesture=spk&frame=1&headonly=0&size=m`,
                `${urls[0]}&action=std&direction=1&head_direction=1&img_format=png&gesture=eyb&frame=1&headonly=0&size=m`,
                `${urls[0]}&action=crr&direction=1&head_direction=1&img_format=png&gesture=eyb&frame=1&headonly=0&size=m`
            ]
            const urls2 = [
                `${urls[1]}&action=std&direction=5&head_direction=5&img_format=png&gesture=std&frame=1&headonly=0&size=m`,
                `${urls[1]}&action=wlk&direction=5&head_direction=5&img_format=png&gesture=std&frame=1&headonly=0&size=m`,
                `${urls[1]}&action=wlk&direction=5&head_direction=5&img_format=png&gesture=std&frame=2&headonly=0&size=m`,
                `${urls[1]}&action=drk&direction=5&head_direction=5&img_format=png&gesture=eyb&frame=2&headonly=0&size=m`
            ]

            // Cargar Frames
            const bg = await Canvas.loadImage(path.resolve(__dirname, "assets", "ship.png"))
            const corazones = await Canvas.loadImage(path.resolve(__dirname, "assets", "corazones.png"))
            for (let i=0; i < 4; i++) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.ctx.drawImage(bg, 0, 0, this.canvas.width, this.canvas.height)
                this.ctx.textAlign = "center"
                this.ctx.fillStyle = "white"
                this.ctx.font = "bold 40px Arial"
                this.ctx.fillText(`${number}%`, 155, 72)
                this.ctx.fillStyle = "black"
                this.ctx.font = "bold 12px Arial"
                this.ctx.fillText(`¡${usernames[0]} y ${usernames[1]} son compatibles!`, 155, 225)
                this.shipGif1.push(await Canvas.loadImage(urls1[i]))
                this.shipGif2.push(await Canvas.loadImage(urls2[i]))
                this.ctx.drawImage(this.shipGif2[i], 155-10*i, 95, 64, 110)
                this.ctx.drawImage(this.shipGif1[i], 100, 95, 64, 110)
                if (i==3) this.ctx.drawImage(corazones, 0, 0, this.canvas.width, this.canvas.height)
                this.encoder.addFrame(this.ctx)
            }

            this.encoder.finish()
            return this.encoder.out.getData()
        } else {
            await this.initializeCanvas(311, 236)

            const url1 = `${urls[0]}&action=sit&gesture=sad&direction=4&head_direction=4&img_format=png&size=m`
            const url2 = `${urls[1]}&action=sit,drk=6&direction=2&head_direction=2&img_format=png&size=m`
            const bg = await Canvas.loadImage(path.resolve(__dirname, "assets", "ship-fail.png"))
            const img1 = await Canvas.loadImage(url1)
            const img2 = await Canvas.loadImage(url2)
            this.ctx.drawImage(bg, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img1, 80, 95, 64, 110)
            this.ctx.drawImage(img2, 165, 95, 64, 110)

            this.ctx.textAlign = "center"
            this.ctx.fillStyle = "white"
            this.ctx.font = "bold 40px Arial"
            this.ctx.fillText(`${number}%`, 155, 72)
            this.ctx.fillStyle = "black"
            this.ctx.font = "bold 12px Arial"
            this.ctx.fillText(`¡${usernames[0]} y ${usernames[1]} no son compatibles!`, 155, 225)

            return this.canvas.toBuffer()
        }
    }

    /**
     * Genera una imagen "shark" basada en la URL del avatar de un usuario de Habbo.
     * 
     * Retorna una imagen de un usuario siendo devorado por un tiburón.
     * @param {string} url - Un string con la URL del avatar del usuario.
     * 
     * @example
     * // Ejemplo de uso:
     * await habboGenerator.generateSharkImage("https://www.habbo.es/habbo-imaging/avatarimage?&user=Marcos");
     * 
     */
    async generateSharkImage(url) {
        await this.initializeCanvas(145, 150)
                
        // Upload habbo image
        const imageUrl = `${url}&action=std&direction=4&head_direction=4&img_format=png&gesture=srp&frame=1&headonly=0&size=m`
        const habbo = await Canvas.loadImage(imageUrl)
        this.ctx.drawImage(habbo, 23, 16, 64, 110)

        // Upload shark image
        const shark = await Canvas.loadImage(path.resolve(__dirname, "assets", "shark.png"))
        this.ctx.drawImage(shark, 0, 14, 145, 136)

        return this.canvas.toBuffer()
    }
}

module.exports = HabboImagine
