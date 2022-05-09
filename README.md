# use-plug

a vue-like plugin system

[![NPM version](https://img.shields.io/npm/v/use-plug?color=a1b858&label=)](https://www.npmjs.com/package/use-plug)

## Useage

```ts
import { createUse } from 'use-plug/core'
import axios from 'axios'
import useAxiosUri from 'use-axios-uri'
import useAxiosForward from 'use-axios-forward'

const ins = createUse(new axios.create())
  .use(useAxiosUri)
  .use(useAxiosForward)

export default ins
```


## License

[MIT](./LICENSE) License © Present [Wayco Wei](https://github.com/waycowei)
