import gnirts from "gnirts";

const matchFileReg = /\.(js|tsx?|cjs|mjs)$/;
const _matchFile = (path) => matchFileReg.test(path);

export default function gnirtsPlugin({ matchFile, options = {} } = {}) {
  return {
    name: "vite-plugin-gnirts",
    enfore: "post",
    transform(src, id) {
      matchFile = matchFile || _matchFile;
      if (typeof matchFile !== "function") {
        console.warn("matchFile is not function");
        return;
      }
      if (matchFile(id)) {
        const gnirtsResult = src != null ? gnirts.mangle(src + "") : src;
        let result = { code: gnirtsResult };
        return result;
      }
    },
  };
}
