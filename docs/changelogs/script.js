const cl = document.getElementById( "cl" );

document.addEventListener( "DOMContentLoaded", async function ()
{ 
    const data = await ( await fetch( "../cl/cl.json" ) ).json();
    
    data.forEach( d =>
    {
        const div = document.createElement( "div" );
        div.classList.add( "cl" );
        div.innerHTML = `
            <div class="added-ball"></div>
                        <div class="fixed-ball"></div>
            <div class="removed-ball"></div>
            <h2 class="head">${d.name}</h2>
            <div class="cl-content">
                <div class="date">${d.date}</div>

                <ol class="changes">
                    <h3>Changes</h3>

                        ${d.changes
                            .map(
                                (c) =>
                                    `<li class="${c.type}">${c.content}</li>`,
                            )
                            .join("")}

                </ol>
            </div>`;
        cl.appendChild( div );
    })
});