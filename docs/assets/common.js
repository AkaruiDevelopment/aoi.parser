const sidebarbtn = document.querySelector(".sidebarbtn");
const sidebar = document.querySelector(".sidebar");
const closebtn = document.querySelector( ".closebtn" );
const copy = document.querySelectorAll(".copyButton");
sidebarbtn.addEventListener("click", function () {
    sidebar.style.width = "50%";
    sidebar.style.opacity = "1";
    sidebar.style.filter = "blur(0px)";
});

closebtn?.addEventListener("click", function () {
    sidebar.style.width = "";
    sidebar.style.opacity = "0";
    sidebar.style.filter = "blur(5px)";
});


const ddd = document.querySelectorAll(".ddd");
document.addEventListener("DOMContentLoaded", async function () {
    const data = await (
        await fetch(
            "https://api.npmjs.org/downloads/point/last-year/aoi.parser",
        )
    ).json();

    ddd.forEach(x => x.textContent = data.downloads);
} );

const copydata = btn =>
{
    const dataid = btn.getAttribute( "data-id" );
    const data = document.getElementById( dataid );
    window.navigator.clipboard.writeText( data.innerText );
};


$(".copyButton").click(() => {
    const dataid = $(this).attr("data-id");
    const data = $(`#${dataid}`).text();
    navigator.clipboard.writeText(data);
    console.log("done");
});