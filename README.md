# parsers
An extension for aoi.js' custom message parsing system

## Installation
```bash
npm install aoi.parser
```

## Usage
```js
const {  Util } = require("aoi.js");
const { parse, createAst } = require( `aoi.parser` );
const {parseEmbed, parseComponents, parseFiles, parseExtraOptions} = require("aoi.parser/dist/components.js")
Util.parsers.ErrorHandler = parse;
Util.parsers.ComponentParser = ( data ) =>
{
  const ast = createAst( data );
  console.log( {ast,data})
  const d = ast.childs.map( ( c ) => parseComponents( c ) );
  console.log( d )
  return d;
};
Util.parsers.EmbedParser = ( data ) =>
{
  const ast = createAst( data );
  const d = ast.childs.map( ( c ) => parseEmbed( c ) );
  return d;
}
Util.parsers.FileParser = ( data ) =>
{
  const ast = createAst( data );
  const d = ast.childs.map( ( c ) => parseFiles( c ) );
  return d;
}
Util.parsers.OptionParser = ( data ) =>
{
  const ast = createAst( data );
  const d = ast.childs.map( ( c ) => parseExtraOptions( c ) );
  return d;
}
```