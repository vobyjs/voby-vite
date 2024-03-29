# Voby Vite

The official Voby plugin for [Vite](https://vitejs.dev).

## Install

```sh
npm install --save voby-vite
```

## Usage

```ts
import {defineConfig} from 'vite';
import voby from 'voby-vite';

const config = defineConfig ({
  plugins: [
    voby ({
      hmr: { // HMR-related options
        enabled: ( process.env.NODE_ENV !== 'production' ), // Whether HMR is enabled or not
        filter: /\.(jsx|tsx)$/ // Regex matching the files containing components to enable HMR for
      }
    })
  ]
});

export default config;
```

## License

MIT © Fabio Spampinato
