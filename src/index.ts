
/* MAIN */

const vite = () => {

  return {
    name: 'voby',
    config: () => {

      return {
        esbuild: {
          jsxInject: `import {createElement as $$c, Fragment as $$F} from 'voby';\n`,
          jsxFactory: '$$c',
          jsxFragment: '$$F'
        }
      };

    }
  };

};

/* EXPORT */

export default vite;
