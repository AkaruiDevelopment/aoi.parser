const quickstart = document.getElementById( 'quickstart' );
const installation = document.getElementById( 'installation' );
const functions = document.getElementById( 'functions' );
const parsers = document.getElementById( 'parsers' );
const embed = document.getElementById( 'embed' );
const component = document.getElementById( 'component' );
const file = document.getElementById( 'file' );
const cl = document.getElementById( 'cl' );

const contents = {
    quickstart: `
    <div class=titlec>
        <div class="title">
            Quickstart
        </div>
        <div class="description">
            Aoi.parser is a custom message parser for aoi.js' message system 
        </div>
    </div>
    <div class="setup">
        <div class="title">
            Basic Setup
        </div>
                    <div class="codeblock">
                <div class="copyButton" data-id="basicsetup">
                    <i class="material-icons" id="copy">content_copy</i>
                </div>
                <code class="code"id=basicsetup>
                        <span class="keyword">const</span>
                        { <span class="class">Util</span> } =
                        <span class="global">require</span>(
                        <span class="string" style="font-style:italic;">'aoi.js'</span>
                        );

                        <br />

                        <span class="keyword">const</span>
                        { <span class="function">setup</span> } =
                        <span class="global">require</span>(
                        <span class="string" style="font-style:italic;">'aoi.parser'</span>
                        );

                        <br />
                        <br />
                        <span class="comment"
                            >/*<br />This will update All the parsers in aoi.js<br />*/</span
                        >
                        <br />
                        <span class="function">setup</span>(<span class="class"
                            >Util</span
                        >);

                        <br />
                        <br />


                    </code>
            </div>
    </div>
    <div class="setup">
        <div class="title">
            Advanced Setup
        </div>
            <div class="codeblock">
                <div class="copyButton" data-id="advsetup">
                    <i class="material-icons" id="copy">content_copy</i>
                </div>
                <code class="code" id=advsetup>
                <pre class="comment">
/*
    Advanced setup where you can choose which parsers to be updated               
*/                
</pre>
<br>
                        <span class="keyword">const</span>
                        { <span class="class">Util</span> } =
                        <span class="global">require</span>(
                        <span class="string" style="font-style:italic;">'aoi.js'</span>
                        );

                        <br />

                        <span class="keyword">const</span>
                        { <span class="function">parse</span>,
                        <span class="function">createAst</span>, <span class="function">parseChatInputOptions</span> } =
                        <span class="global">require</span>(
                        <span class="string" style="font-style:italic;">'aoi.parser'</span>
                        );

                        <br>

                        <span class="keyword">const</span>
                        { 
                            <br>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="function">parseEmbed</span>, 
                            <br>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="function">parseComponents</span>,
                            <br>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="function">parseFiles</span>
                            <br>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="function">parseExtraOptions</span>
                            <br>


                        } = <span class="global">require</span>( <span class="string" style="font-style:italic;">'aoi.parser/components'</span> );

                        <br />
                        <br />
                        <span class="class">Util</span>.<span class="object"
                            >parsers</span
                        >.<span class="function">ErrorHandler</span> =
                        <span class="function">parse</span>;

                        <br />
                        <br />

                        <span class="class">Util</span>.<span class="object">parsers</span>.<span class="function">EmbedParser</span> = ( <span class="object">data</span> ) => {
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="keyword">return</span> 
                            <span class="function">createAst</span>( <span class="object">data</span> ).<span class="object">children</span>.<span class="function">map</span>( <span class="function">parseEmbed</span> );
                            <br>
                        }

                        <br />
                        <br />

                        <span class="class">Util</span>.<span class="object">parsers</span>.<span class="function">ComponentParser</span> = ( <span class="object">data</span> ) => {
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="keyword">return</span>
                            <span class="function">createAst</span>( <span class="object">data</span> ).<span class="object">children</span>.<span class="function">map</span>( <span class="function">parseComponents</span> );
                            <br>
                        }
                        
                        <br />
                        <br />

                        <span class="class">Util</span>.<span class="object">parsers</span>.<span class="function">FileParser</span> = ( <span class="object">data</span> ) => {
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="keyword">return</span>
                            <span class="function">createAst</span>( <span class="object">data</span> ).<span class="object">children</span>.<span class="function">map</span>( <span class="function">parseFiles</span> );
                            <br>
                        }

                        <br />
                        <br />

                        <span class="class">Util</span>.<span class="object">parsers</span>.<span class="function">OptionsParser</span> = ( <span class="object">data</span> ) => {
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;    
                            <span class="keyword">return</span>
                            <span class="function">createAst</span>( <span class="object">data</span> ).<span class="object">children</span>.<span class="function">map</span>( <span class="function">parseExtraOptions</span>
                            );
                            <br>
                        }

                        <br />
                        <br />

                        <span class="class">Util</span>.<span class="object">parsers</span>.<span class="function">SlashOptionsParser</span> = <span class="function">parseChatInputOptions</span>;
                        
                        <br />
                        <br />
                    </code>
            </div>
                        <br>
                        <br>
                        <br>
                        <br>
            <div class="description note">
                    <strong>Note:<strong>
                    <br>
                    After this, you can use the parser in your code.
            </div>
    </div>
    `,
    installation: `
    <div class="titlec">
        <div class="title">
            Installation
        </div>
        <div class="description note" style="display:flex;flex-direction:column;">
            <strong>Note:</strong>
            You need to have Node.js v17 installed on your system to use this package.
        </div>
    </div>
    <div class="setup">
        <h3>Install via NPM</h3>
            <div class="codeblock">
                <div class="copyButton" data-id="npm">
                    <i class="material-icons" id="copy">content_copy</i>
                </div>
                <code class="code" id=npm>
                        <span class="variable">npm</span>
                        <span class="function">i</span>
                        <span class="global">aoi.parser</span>
                    </code>
            </div>
        <br>
        <br>
        <br>
        <h3>Install via Yarn</h3>
            <div class="codeblock">
                <div class="copyButton
                " data-id="yarn">
                    <i class="material-icons" id="copy">content_copy</i>
                </div>
                <code class="code" id=yarn>
                        <span class="variable">yarn</span>
                        <span class="function">add</span>
                        <span class="global">aoi.parser</span>
                </code>
            </div>

        <br>
        <br>
        <br>

        <h3>Install via Git</h3>
            <div class="codeblock" >
                <div class="copyButton
                " data-id="git">
                    <i class="material-icons" id="copy">content_copy</i>
                </div>
                <code class="code" id=git>
                        <span class="variable">git</span>
                        <span class="function">clone</span>
                        <span class="global"> https://github.com/USERSATOSHI/parsers.git</span>
    </div>
    `,
    functions: `
    <div class="titlec">
        <div class="title">
            Functions
        </div>
    </div>
    <div class="setup">
        <div class="titlec" style="height:auto;">
            <h2><span class="function">createAst</span></h2>
            <br>
            <br>
            <div class="description">
                <strong>createAst</strong> is the function that creates the AST of the parser.
            </div>
            <br>
            <br>
            <div class="codeblock">
                <div class="copyButton
                " data-id="createAst">
                    <i class="material-icons" id="copy">content_copy</i>
                </div>
                <code class="code" id="createAst">
                    <span class="function">createAst</span>( <pre class="string">\`
{newEmbed:
    {title:hi}
    {description:hello}
    {color:Random}
    {timestamp}
    {footer:hi}
}
\`</pre> )
                </code>
            </div>
            <br>
            <br>
    </div>
    <div class="setup">
        <div class="titlec" style="height:auto;">
            <h2><span class="function">parse</span></h2>
            <br>
            <br>
            <div class="description">
                <strong>parse</strong> is the main function of this package. It parses the parser and returns the parsed messagePayload data.
            </div>
            <br>
            <br>
            <div class="codeblock">
                <div class="copyButton" data-id="parse">
                    <i class="material-icons" id="copy">content_copy</i>
                </div>
                <code class="code" id=parse>
                    <span class="function">parse</span>( <pre class="string">\`
{newEmbed:
    {title:hi}
    {description:hello}
    {color:Random}
    {timestamp}
    {footer:hi}
}
{actionRow:
    {button: Hi : 1 : hi }
}
\`</pre> );
</code>
</div>
<div class="codeblock">
    <code class="code">
    <h1 class="class">Output</h1>
    <br>
<pre class="comment">/* 
    returns
    {
        data : {
            content: "",
            embeds: [{
                title: "hi",
                description: "hello",
                color: 16777215,
                timestamp: "2021-10-05T12:00:00.000Z",
                footer: {
                    text: "hi"
                }
            }],
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    label: "Hi",
                    style: 1,
                    custom_id: "hi"
                }]
            }]
        }
    }
*/</pre>
                </code>
            </div>
        </div>
        <br>
        <br>
        <br>
        <div class="titlec" style="height:auto;">
            <h2><span class="function">parseChatInputOptions</span></h2>
            <br>
            <br>
            <div class="description">
                <strong>parseChatInputOptions</strong> is the function to parse slash command options.
            </div>
            <br>
            <br>
            <div class="codeblock">
                <div class="copyButton" data-id="parsecio">
                    <i class="material-icons" id="copy">content_copy</i>
                </div>
                <code class="code" id=parsecio>
                    <span class="function">parseChatInputOptions</span>( <pre class="string">\`
{string:
    name:
    description:
    yes:
    yes:
    1:
    200
}
{number:
    name2:
    description2:
    yes:
    yes:
    1:
    200
}
\`</pre> );
</code>
</div>
<div class="codeblock">
    <code class="code">
    <span class="comment" style="display:flex;"><h2>//</h2> <h2 class="class">Output</h2></span>
    <br>
<pre class="comment">/*
    returns
    [{
        name: "name",
        description: "description",
        type: 3,
        required: true,
        autocomplete: true,
        minLength: 1,
        maxLength: 200
    },{
        name: "name2",
        description: "description2",
        type: 4,
        required: true,
        autocomplete: true,
        minValues: 1,
        maxValues: 200
    }]
    </div>
        </div>
        <br>
        <br>
        <br>
    </div>
    `,
    parsers: `
    <div class="titlec">
        <div class="title">
            Parsers
        </div>
        <div class="description">
          List of all parsers:
        </div>
        <br>
        <br>
        <br>
        <div class="titlec" style="height:auto;">
            <h2><span class="function">Embed</span></h2>
            <br>
            <h2><span class="function">Component</span></h2>
            <br>
            <h2><span class="function">File</span></h2>
            <br>
            <h2><span class="function">ChatInputOptions</span></h2>
            <br>
            <h2><span class="function">Options</span></h2>
            <br>
            <h2><span class="function">ExtraOptions</span></h2>
    `,
    embed: `
    <div class="titlec">
        <div class="title">
            Embed
        </div>
        <div class="description">
            Embed parser:
        </div>
    </div>
    <div class="setup">
        <div class="titlec" style="height:auto;">
            <h2>List</h2>
            <br>
            <br>
            <div class="description">
                <strong>newEmbed</strong> - Creates a new embed
                usage: <pre class="string">{newEmbed: embed sub parsers}</pre>
                <br>
                <br>
                <strong>title</strong> - Title of the embed
                usage: <pre class="string">{title: title}</pre>
                <br>
                <br>
                <strong>description</strong> - Description of the embed
                usage: <pre class="string">{description: description}</pre>
                <br>
                <br>
                <strong>url</strong> - Url of the embed
                usage: <pre class="string">{url: url}</pre>
                <br>
                <br>
                <strong>timestamp</strong> - Timestamp of the embed
                usage: <pre class="string">{timestamp} or {timestamp:time in ms}</pre>
                <br>
                <br>
                <strong>color</strong> - Color of the embed
                usage: <pre class="string">{color:hex + ColorResolvable}</pre>
                <br>
                <br>
                <strong>footer</strong> - Footer of the embed
                usage: <pre class="string">{footer:text:iconUrl?}</pre>
                <br>
                <br>
                <strong>image</strong> - Image of the embed
                usage: <pre class="string">{image:url}</pre>
                <br>
                <br>
                <strong>thumbnail</strong> - Thumbnail of the embed
                usage: <pre class="string">{thumbnail:url}</pre>
                <br>
                <br>
                <strong>author</strong> - Author of the embed
                usage: <pre class="string">{author:name:iconUrl?}</pre>
                <br>
                <br>
                <strong>authorUrl</strong> - Author url of the embed
                usage: <pre class="string">{authorUrl:url}</pre>
                <br>
                <br>
                <strong>field</strong> - Field of the embed
                usage: <pre class="string">{field:name:value:inline?}</pre>
                <br>
                <br>
    `,
};



document.addEventListener( 'DOMContentLoaded', () =>
{ 
    if(!window.location.hash)
        window.location.hash = "quickstart";
    const currentHash = window.location.hash.replace( "#", "" );
    cl.innerHTML = contents[ currentHash ];
} );
quickstart.addEventListener( 'click', () =>
{ 
    window.location.hash = "quickstart";
    const currentHash = window.location.hash.replace( "#", "" );
    cl.innerHTML = contents[ currentHash ];
} );

installation.addEventListener( 'click', () =>
{ 
    window.location.hash = "installation";
    const currentHash = window.location.hash.replace( "#", "" );
    cl.innerHTML = contents[ currentHash ];
} );

functions.addEventListener( 'click', () =>
{ 
    window.location.hash = "functions";
    const currentHash = window.location.hash.replace( "#", "" );
    cl.innerHTML = contents[ currentHash ];
} );

parsers.addEventListener( 'click', () =>
{ 
    window.location.hash = "parsers";
    const currentHash = window.location.hash.replace( "#", "" );
    cl.innerHTML = contents[ currentHash ];
} );

embed.addEventListener( 'click', () =>
{ 
    window.location.hash = "embed";
    const currentHash = window.location.hash.replace( "#", "" );
    cl.innerHTML = contents[ currentHash ];
} );

cl?.addEventListener( "click", ( e ) =>
{
    console.log({
        contains: e.target.classList.contains("copyButton"),
        classlist: e.target.classList,
        id: e.target.id,
    });
    // check if target class is copyButton
    if(e.target.classList.contains( "copyButton" ) || e.target.id === "copy")
    {
        let dataid;
        let copyButton;
        let copyid;
        if ( e.target.id === "copy" )
        {
            copyid = e.target;
            copyButton = e.target.parentElement;
            dataid = copyButton.getAttribute( "data-id" );
        } else
        {
            copyid = e.target.children[ 0 ];
            copyButton = e.target;
            dataid = e.target.getAttribute( "data-id" );
        }
        const data = document.getElementById( dataid );
        const text = data.innerText;
        navigator.clipboard.writeText( text );
        copyid.innerText = "done";
        setTimeout( () =>
        {
            copyid.innerText = "content_copy";
        }, 1000 );
    }
})