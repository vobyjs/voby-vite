
/* IMPORT */

import type {Options} from './types';

/* MAIN */

const vite = ( options: Options = {} ) => {

  const hmrEnabled = !!options.hmr?.enabled;
  const hmrFilter = options.hmr?.filter || /\.(jsx|tsx)$/;
  const hmrDefaultExportRe = /^export\s+default\s+(_?[A-Z][a-z0-9$_-]*)\s*(;|$)/m;
  const hmrNamedExportRe = /^export\s+{([^}]+)}/gm;
  const hmrNamedExportSingleRe = /^\s*(_?[A-Z][a-z0-9$_-]*)\s*$/;
  const hmrNamedExportAliasedRe = /^\s*([a-zA-Z$_][a-zA-Z0-9$_]*)\s+as\s+(_?[A-Z][a-z0-9$_-]*)\s*$/;
  const hmrNamedInlineExportRe = /^export\s+((?:function|const)\s+(_?[A-Z][a-z0-9$_-]*))/gm;

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

      const exports: string[] = [];

      code = code.replace ( hmrDefaultExportRe, ( _: string, $1: string, $2: string ) => {

        return `export default $$hmr(import.meta.hot?.accept, ${$1})${$2}`;

      });

      code = code.replace ( hmrNamedInlineExportRe, ( _: string, $1: string, $2: string ) => {

        exports.push ( `const $$hmr_${$2} = $$hmr(import.meta.hot?.accept, ${$2});\nexport {$$hmr_${$2} as ${$2}};` );

        return $1;

      });

      code = code.replace ( hmrNamedExportRe, ( _: string, $1: string ) => {

        return $1.split ( ',' ).filter ( part => {

          const matchSingle = part.match ( hmrNamedExportSingleRe );
          const matchAliased = part.match ( hmrNamedExportAliasedRe );

          if ( matchSingle ) {

            const name = matchSingle[1];

            exports.push ( `const $$hmr_${name} = $$hmr(import.meta.hot?.accept, ${name});\nexport {$$hmr_${name} as ${matchSingle}};` );

            return false;

          } else if ( matchAliased ) {

            const name = matchAliased[1];
            const alias = matchAliased[2];

            exports.push ( `${name}.__hmr_as__ = "${alias}";\nconst $$hmr_${name} = $$hmr(import.meta.hot?.accept, ${name});\nexport {$$hmr_${name} as ${alias}};` );

            return false;

          } else {

            return true;

          }

        }).join ( ',' );

      });

      if ( exports.length ) {

        code += `\n${exports.join ( '\n' )}`;

      }

      return code;

    }
  };

};

/* EXPORT */

export default vite;
