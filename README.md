# Aoi.Parser
<div align="center">
    <img src="./docs/assets/tlogo.gif">
</div>

A custom parser to upgrade aoi.js existing parsers to latest features

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
- [liya](https://github.com/Slyrith)


