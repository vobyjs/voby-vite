
/* IMPORT */

import type {Options} from './types';

/* MAIN */

const vite = ( options: Options = {} ) => {

  const hmrEnabled = !!options.hmr?.enabled;
  const hmrFilter = options.hmr?.filter || /\.(jsx|tsx)$/;
  const hmrDefaultExportRe = /^export\s+default\s+([A-Z][a-z0-9$_-]*)\s*(;|$)/m;

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

    },
    transform: ( code: string, id: string ) => {

      if ( !hmrEnabled ) return;

      if ( !hmrFilter.test ( id ) ) return;

      return code.replace ( hmrDefaultExportRe, ( _, $1, $2 ) => {

        return `import {hmr as $$hmr} from 'voby';\nexport default $$hmr(import.meta.hot?.accept, ${$1})${$2}`;

      });

    }
  };

};

/* EXPORT */

export default vite;
