## Voby Vite

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
  plugins: [voby ()]
});

export default config;
```

## License

MIT © Fabio Spampinato
