import { TextureLoader, Texture, GLTFLoader } from "ogl";
// const tl = TextureLoader;

/* Textures
 **/

export async function loadTexture(gl, path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      const texture = new Texture(gl, { image: img });
      resolve(texture);
    };
  });
}

/* Gltf loader
 **/

export async function loadModel(gl, path) {
  return GLTFLoader.load(gl, path);
}

export async function loadGeometry(gl, path) {
  return new Promise((resolve) => {
    GLTFLoader.load(gl, path).then((data) => {
      resolve(data.meshes[0].primitives[0].geometry);
    });
  });
}
