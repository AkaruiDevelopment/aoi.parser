<div align="center">
    <img src="./docs/assets/tlogo.gif">

<p>A custom parser to upgrade aoi.js existing parsers to latest features</p>
</div>

## Installation

**node.js 17.0.0 or newer is required.**

```bash
npm install aoi.parser
yarn add aoi.parser
```

## Setup

```js
const { Util } = require("aoi.js");
const { setup } = require("aoi.parser");

setup(Util);
```

## Example
```js
//  example on sending a embed with 1 button
$sendMessage[
    {newEmbed:
        {title:Hello World}
        {description:This is an example}
        {color:Random}
        {footer:This is a footer}
    }
    {actionRow:
        {button:
            Label:
            1:
            customid:
            no:
            💀
        }
    }
]
```

## Links

- [Docs](https://usersatoshi.github.io/parsers)
- [NPM](https://npmjs.com/package/aoi.parser)
- [GitHub](https://github.com/usersatoshi/parsers)
  
## License

[Apache-2.0](./LICENSE)

## Contributors

- [USER SATOSHI](https://github.com/usersatoshi)
- [NeoDevils](https://github.com/Neodevils)
- [Liya](https://github.com/Slyrith)


