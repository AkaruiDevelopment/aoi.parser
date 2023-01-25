<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./style.css" />
    <link rel="stylesheet" href="./assets/common.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    <title>Aoi.Parser</title>
</head>

<style>
    @import url("https://fonts.cdnfonts.com/css/cascadia-code");

:root {
    --color-primary: #001e29;
    --menu-hover-primary: #00161a;
    --body-pseudo-display: none;
    --container-color: #2c2c2c;

    --variable-color: #ffb84d;
    --global-color: #ff4128;
    --comment-color: #6d6d6d;
    --operator-color: #72fff1;
    --string-color: #81ff8e;
    --number-color: #73eaff;
    --keyword-color: #43d0ff;
    --boolean-color: #62b1ff;
    --function-color: #5affd6;
    --class-color: #ffa7ec;
    --codeblock-text-color: rgb(173, 173, 173);

    --text-button-color: rgb(218, 218, 218);
    --text-button-color-alpha: rgba(218, 218, 218, var(--a, 0.5));
    --sidebar-bg-color: #1b3032;
    --sidebar-h0ver-bg: #0e2123;
    --color-primary-hover: #071c1e;
    --body-text-color: rgb(210, 210, 210);
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Cascadia Code";
}
html,
body {
    height: 100%;
    width: 100%;
    background-color: #000000;
    color: #d4d4d4;
    scroll-behavior: smooth;
}

body {
    scroll-behavior: smooth;
    overflow: overlay;
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: transparent;
    border: 2px solid #d4d4d434;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #d4d4d4;
}

.navbar {
    height: 100px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.454);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 10;
}

.navbar .logo {
    max-width: 300px;
    width: 100%;
    height: 100px;
    object-fit: cover;
    object-position: center;
}

.navbar .links,.navbar .box,
.sidebar .links {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 50%;
    font-size: 20px;
    gap: 20px;
}

.navbar .links {
    width: 100%;
}

.navbar .links .link,
.sidebar .links .link {
    text-decoration: none;
    color: #d4d4d4;
    transition: 500ms;
    font-style: italic;
    cursor: pointer;
}

.navbar .links .link:hover,
.sidebar .links .link:hover {
    color: #ff0000;
    transform: scale(1.2);
}

.navbar .links .link.active,
.sidebar .links .link.active {
    color: #ff0000;
}

.navbar .box .sidebarbtn {
    cursor: pointer;
    width: 20px;
    height: 20px;
    color: #d4d4d4;
    transition: 500ms;
    position: relative;
}

.navbar .links .sidebarbtn:hover {
    color: #ff0000;
    transform: scale(1.2);
}

.line {
    height: 2px;
    width: 100%;
    background-color: #d4d4d4;
    margin-top: 4px;
}

.mid {
    width: 50%;
}

.sidebar {
    height: 100%;
    width: 0;
    max-width: 500px;
    background-image: linear-gradient(
        180deg,
        #d4d4d4 0%,
        #d4d4d4d8 50%,
        #d4d4d432 100%
    );
    color: #000000;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    transition: 1s width, 500ms filter, 500ms opacity;
    filter: blur(5px);
    opacity: 0;
    z-index: 15;
}

.sidebar .links {
    width: 100%;
    height: 50%;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 50px;
}

.sidebar .links .link {
    color: #000000;
    font-size: 25px;
}

.closebtn {
    cursor: pointer;
    width: 30px;
    height: 30px;
    color: #000000;
    transition: 500ms;
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}


.stats {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    flex-wrap: wrap;
}

.stats .stat {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-size: 30px;
    font-weight: 900;
    font-style: italic;
    color: #d4d4d4;
}

.stats .stat .stathead {
    font-size: 20px;
}

.stats .stat .statcontent {
    font-size: 20px;
    font-weight: 400;
    font-style: italic;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
    width: 100%;
    height: auto;
    min-height: 75vh;
    /* flex-wrap: nowrap; */
}

.main {
    width: 100%;
    height: 100vh;
}

.mainlogo {
    width: 100%;
    height: 100%;
    background-image: url(./assets/logo.gif);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    position: relative;
}

.about,
.setup {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
}
.about {
    background-image: linear-gradient(180deg, #d4d4d47d, #000000);
}

.head {
    color: #ff0000;
    font-size: 60px;
    font-style: italic;
    font-weight: bolder;
}

.content {
    font-size: 30px;
}

.options {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 30px;
    font-weight: 900;
}

.options .op {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 40px;
}

.options strong {
    font-style: italic;
}

.platforms {
    font-size: 30px;
    font-weight: 900;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-style: italic;
    gap: 20px;
}

.platforms a {
    text-decoration: none;
    color: #d4d4d4;
    transition: 500ms;
    font-size: 40px;
}

.platforms a:hover {
    color: #ff0000;
    transform: scale(1.2);
}

.platforms .links {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.setup {
    background-color: #000000;
    height: 100%;
}

.codeblock {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    word-wrap: break-word;
    height: auto;
    padding: 20px;
    background-color: rgba(183, 183, 183, 0.169);
}

.codeblock .copyButton {
    float: right;
    transition: 500ms;
    color: rgb(56, 56, 56);
}

.codeblock .copyButton i {
    cursor: pointer;
    transition: 0.5s;
}

.codeblock .copyButton i:hover {
    transform: scale(1.1);
}

.codeblock .code {
    display: block;
    box-sizing: border-box;
    margin-top: 30px;
    font-size: 20px;
    width: 75%;
    height: auto;
    color: var(--codeblock-text-color);
    word-wrap: break-word;
    left: 0;
    float: left;
    text-align: left;
    margin-left: 60px;
}

.codeblock code span {
    word-wrap: break-word;
}

.keyword {
    color: var(--keyword-color);
}

.string {
    color: var(--string-color);
}

.number {
    color: var(--number-color);
}

.comment {
    color: var(--comment-color);
}

.global {
    color: var(--global-color);
}

.boolean {
    color: var(--boolean-color);
}

.variable,
.object {
    color: var(--variable-color);
}

.object {
    font-style: italic;
}

.class {
    color: var(--class-color);
}

.function {
    color: var(--function-color);
}

.linker {
    background-image: linear-gradient(0deg, #d4d4d434, #000000);
    height: 100%;
    min-height: 75vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.linker .links {
    margin-top: 50px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 50px;
}

.linker .links .link {
    color: #d4d4d4;
    font-size: 30px;
    text-decoration: none;
    transition: 500ms;
}

.linker .links .link:hover {
    color: #ff0000;
    transform: scale(1.2);
}

.linksbtn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}

@media screen and (max-width: 720px) {
    .mainlogo {
        background-size: contain;
        height: 75vh;
    }
    .stats .stats {
        font-size: 10px;
    }
    .stats .stat .stathead {
        font-size: 15px;
    }

    .stats .stat .statcontent {
        font-size: 10px;
    }

    .head {
        font-size: 30px;
    }

    .codeblock .code {
        font-size: 10px;
    }

    .opt {
        font-size: 10px;
    }

    .content {
        font-size: 10px;
    }

    .options {
        font-size: 20px;
    }

    .platforms,
    .platforms a {
        font-size: 20px;
    }

    .link {
        font-size: 20px;
    }

    .linker .links .link {
        font-size: 15px;
    }

    .copyright {
        font-size: 10px;
    }

    .linker .links {
        gap: 5px;
    }
    .setup {
        gap: 10px;
    }

    .codeblock .copyButton {
        width: 10px;
        height: 10px;
    }

    #copy {
        font-size: 20px;
    }
}

</style>
<body>
    <div class="navbar">
        <a class="logo" href="#"><img src="./docs/assets/logo.gif" alt="" class="logo" /></a>
        <div class="box">
            <div class="links">
                <a class="link" href="./changelogs">1.2.0</a>
                <a href="#about" class="link">About</a>
                <a href="#setup" class="link">Setup</a>
                <a href="#links" class="link">Links</a>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="main">
            <div class="mainlogo">
                <div class="stats">
                    <div class="stat">
                        <div class="stathead">Version:</div>
                        <div class="statcontent">1.2.0</div>
                    </div>
                    <div class="stat">
                        <div class="stathead">Downloads:</div>
                        <div class="statcontent ddd">0</div>
                    </div>
                    <div class="stat">
                        <div class="stathead">License:</div>
                        <div class="statcontent">Apache-2.0</div>
                    </div>
                    <div class="stat">
                        <div class="stathead">Maintainer:</div>
                        <div class="statcontent">USERSATOSHI</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="about" id="about">
            <div class="head">Aoi.Parser</div>
            <div class="content">
                An aoi.js plugin that makes writing parsers way easier and
                readable.
            </div>
            <div class="options">
                Available options:
                <div class="opt">
                    <strong>1) Message Parser.</strong>
                    <strong>2) ChatInput Option Parser</strong>
                </div>
            </div>
            <div class="platforms">
                Available on:
                <div class="links">
                    <a href="https://www.npmjs.com/package/aoi.parser" target="_blank"><i
                            class="fa-brands fa-npm"></i></a>
                    <a href="https://github.com/usersatoshi/parsers" target="_blank"><i
                            class="fa-brands fa-github"></i></a>
                </div>
            </div>
        </div>
        <div class="setup" id="setup">
            <div class="head">Setup</div>
            <br />
            <div class="content">Installation</div>
            <div class="codeblock">
                <div class="copyButton" data-id="npm">
                    <i class="material-icons" id="copy">content_copy</i>
                </div>
                <code class="code" id="npm">
                        <span class="variable">npm</span>
                        <span class="function">i</span>
                        <span class="global">aoi.parser</span>
                    </code>
            </div>
            <div class="content">Setup</div>
            <div class="codeblock">
                <div class="copyButton" data-id="bsetup">
                    <i class="material-icons" id="copy">content_copy</i>
                </div>
                <code class="code" id="bsetup">
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
        <div class="linker" id="links">
            <div class="head">Links</div>
            <div class="links">
                <a href="https://www.npmjs.com/package/aoi.parser" target="_blank" class="link">NPM</a>
                <a href="https://github.com/usersatoshi/parsers" target="_blank" class="link">Github</a>
                <a href="./docs" class="link">Documentation</a>
            </div>
        </div>
        <div class="footer">
            <div class="copyright">
                &copy; 2023 USERSATOSHI. All rights reserved.
            </div>
        </div>
                <script src="./assets/common.js"></script>
        <script src="./script.js"></script>

</body>
</html>