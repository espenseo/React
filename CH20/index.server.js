import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import path from 'path';
import fs from 'fs';


// asset-manifest.json에서 파일 경로들을 조회합니다.
const manifest = JSON.parse(
  fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8')
);



const chunks = Object.keys(manifest.files)
  .filter(key => /chunk</span>.js$/.exec(key)) // chunk.js로 끝나는 키를 찾아서
  .map(key => &lt;script src=</span><span class="cd2 co31">"</span><span class="co49">${</span><span class="cd2 co33">manifest[key]</span><span class="co49">}</span><span class="cd2 co31">"</span><span class="cd2 co31">&gt;&lt;/script&gt;) // 스크립트 태그로 변환하고
  .join(“); // 합침



function createPage(root) {
  return &lt;!DOCTYPE html&gt;</span>
<span class="cd2 co31">  &lt;html lang=</span><span class="cd2 co31">"</span><span class="cd2 co31">en</span><span class="cd2 co31">"</span><span class="cd2 co31">&gt;</span>
<span class="cd2 co31">  &lt;head&gt;</span>
<span class="cd2 co31">    &lt;meta charset=</span><span class="cd2 co31">"</span><span class="cd2 co31">utf-8</span><span class="cd2 co31">"</span><span class="cd2 co31"> /&gt;</span>
<span class="cd2 co31">    &lt;link rel=</span><span class="cd2 co31">"</span><span class="cd2 co31">shortcut icon</span><span class="cd2 co31">"</span><span class="cd2 co31"> href=</span><span class="cd2 co31">"</span><span class="cd2 co31">/favicon.ico</span><span class="cd2 co31">"</span><span class="cd2 co31"> /&gt;</span>
<span class="cd2 co31">    &lt;meta</span>
<span class="cd2 co31">      name=</span><span class="cd2 co31">"</span><span class="cd2 co31">viewport</span><span class="cd2 co31">"</span>
<span class="cd2 co31">      content=</span><span class="cd2 co31">"</span><span class="cd2 co31">width=device-width,initial-scale=1,shrink-to-fit=no</span><span class="cd2 co31">"</span>
<span class="cd2 co31">    /&gt;</span>
<span class="cd2 co31">    &lt;meta name=</span><span class="cd2 co31">"</span><span class="cd2 co31">theme-color</span><span class="cd2 co31">"</span><span class="cd2 co31"> content=</span><span class="cd2 co31">"</span><span class="cd2 co31">#000000</span><span class="cd2 co31">"</span><span class="cd2 co31"> /&gt;</span>
<span class="cd2 co31">    &lt;title&gt;React App&lt;/title&gt;</span>
<span class="cd2 co31">    &lt;link href=</span><span class="cd2 co31">"</span><span class="co49">${</span><span class="cd2 co33">manifest[</span><span class="cd2 co31">'</span><span class="cd2 co31">main.css</span><span class="cd2 co31">'</span><span class="cd2 co33">]</span><span class="co49">}</span><span class="cd2 co31">"</span><span class="cd2 co31"> rel=</span><span class="cd2 co31">"</span><span class="cd2 co31">stylesheet</span><span class="cd2 co31">"</span><span class="cd2 co31"> /&gt;</span>
<span class="cd2 co31">  &lt;/head&gt;</span>
<span class="cd2 co31">  &lt;body&gt;</span>
<span class="cd2 co31">    &lt;noscript&gt;You need to enable JavaScript to run this app.&lt;/noscript&gt;</span>
<span class="cd2 co31">    &lt;div id=</span><span class="cd2 co31">"</span><span class="cd2 co31">root</span><span class="cd2 co31">"</span><span class="cd2 co31">&gt;</span>
<span class="cd2 co31">      </span><span class="co49">${</span><span class="cd2 co34">root</span><span class="co49">}</span>
<span class="cd2 co31">    &lt;/div&gt;</span>
<span class="cd2 co31">    &lt;script src=</span><span class="cd2 co31">"</span><span class="co49">${</span><span class="cd2 co33">manifest[</span><span class="cd2 co31">'</span><span class="cd2 co31">runtime~main.js</span><span class="cd2 co31">'</span><span class="cd2 co33">]</span><span class="co49">}</span><span class="cd2 co31">"</span><span class="cd2 co31">&gt;&lt;/script&gt;</span>
<span class="cd2 co31">    </span><span class="co49">${</span><span class="cd2 co33">chunks</span><span class="co49">}</span>
<span class="cd2 co31">    &lt;script src=</span><span class="cd2 co31">"</span><span class="co49">${</span><span class="cd2 co33">manifest[</span><span class="cd2 co31">'</span><span class="cd2 co31">main.js</span><span class="cd2 co31">'</span><span class="cd2 co33">]</span><span class="co49">}</span><span class="cd2 co31">"</span><span class="cd2 co31">&gt;&lt;/script&gt;</span>
<span class="cd2 co31">  &lt;/body&gt;</span>
<span class="cd2 co31">  &lt;/html&gt;</span>
<span class="cd2 co31">;
}
const app = express();



// 서버 사이드 렌더링을 처리할 핸들러 함수입니다.
const serverRender = (req, res, next) => {
  // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해 줍니다.



const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고
  res.send(createPage(root)); // 결과물을 응답합니다.
};



const serve = express.static(path.resolve('./build'), {
  index: false // “/” 경로에서 index.html을 보여 주지 않도록 설정
});



app.use(serve); // 순서가 중요합니다. serverRender 전에 위치해야 합니다.
app.use(serverRender);



// 5000 포트로 서버를 가동합니다.
app.listen(5000, () => {
  console.log('Running on http://localhost:5000');
});