import { depthCreate } from "@/utils/recursiveCreate";

class SpriteBank {
  sprites: Record<string, Record<string, any>> = { maps: {}, sprites: {} };
  constructor() {}
  loadSprites(path: string, sprites: Record<string, string>) {
    const keys = path.split("/");
    depthCreate(path, this.sprites);
    const bank = keys.reduce((acc, key) => acc[key], this.sprites);
    for (const image in sprites) {
      const id = image.split(".")[0];
      const img = new Image();
      img.src = "data:image/png;base64," + sprites[image];
      bank[id] = img;
    }
  }
  getSprite(path: string) {
    const keys = path.split("/");
    return keys.reduce((acc, key) => acc[key], this.sprites);
  }
}

export default new SpriteBank();

//map[littleroot][main][0]
//sprites/trainer/name/sprite
