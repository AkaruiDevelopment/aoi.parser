// create test for createASt function
const {createAst} = require( '../dist/index.js' );

test( 'createAst function exists', () =>
{
    expect( createAst ).toBeDefined();
} );

test( 'createAst function returns an object', () =>
{
    expect( typeof createAst( 'test {hello: world}' ) ).toBe( 'object' );
} );
