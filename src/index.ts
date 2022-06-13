
/* MAIN */

const vite = () => {

  return {
    name: 'voby',
    config: () => {

      return {
        esbuild: {
          jsxInject: `import {h as $$h, Fragment as $$F} from 'voby';\n`,
          jsxFactory: '$$h',
          jsxFragment: '$$F'
        }
      };

    }
  };

};

/* EXPORT */

export default vite;
