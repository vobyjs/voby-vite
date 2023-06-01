
/* IMPORT */

import type {Options} from './types';

/* MAIN */

const vite = ( options: Options = {} ) => {

  const hmrEnabled = !!options.hmr?.enabled;
  const hmrFilter = options.hmr?.filter || /\.(jsx|tsx)$/;
  const hmrDefaultExportRe = /^export\s+default\s+(_?[A-Z][a-z0-9$_-]*)\s*(;|$)/m;
  const hmrNamedInlineExportRe = /^export\s+(function\s+(_?[A-Z][a-z0-9$_-]*))/m;

  return {
    name: 'voby',
    config: () => {

      return {
        esbuild: {
          jsxInject: `import {createElement as $$c, Fragment as $$F, hmr as $$hmr} from 'voby';\n`,
          jsxFactory: '$$c',
          jsxFragment: '$$F'
        }
      };

    },
    transform: ( code: string, id: string ) => {

      if ( !hmrEnabled ) return;

      if ( !hmrFilter.test ( id ) ) return;

      code = code.replace ( hmrDefaultExportRe, ( _, $1, $2 ) => {

        return `export default $$hmr(import.meta.hot?.accept, ${$1})${$2}`;

      });

      code = code.replace ( hmrNamedInlineExportRe, ( _, $1, $2 ) => {

        return `const $$hmr_${$2} = $$hmr(import.meta.hot?.accept, ${$2});\nexport {$$hmr_${$2} as ${$2}};\n${$1}`;

      });

      return code;

    }
  };

};

/* EXPORT */

export default vite;
