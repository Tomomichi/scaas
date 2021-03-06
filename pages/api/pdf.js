import { GA_TRACKING_ID } from '../../lib/gtag'

let chrome = {};
let puppeteer = {};
if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
  //Vercel
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
}else{
  //Local Test
  puppeteer = require('puppeteer');
}

export default async (req, res) => {
  if(!req.query.url) {
    return res.status(404).end();
  }
  const URL = req.query.url;

  // Google Analytics
  const gaPayload = {v: '1', tid: GA_TRACKING_ID, cid: '555', t: 'pageview', dl: encodeURIComponent(URL) };
  fetch('http://www.google-analytics.com/collect', {method: 'post', body: gaPayload});

  // 各種パラメータ（指定なければデフォルト値）
  const slowMo = req.query.slowMo ? Number(req.query.slowMo) : 0;
  const fullPage = (req.query.fullPage == 'true') ? true : false;
  const maxAge = req.query.maxAge ? Number(req.query.maxAge) : 60*60*24;
  const viewportWidth = req.query.viewportWidth ? Number(req.query.viewportWidth) : 1200;
  const viewportHeight = req.query.viewportHeight ? Number(req.query.viewportHeight) : 800;

  if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
    await chrome.font('https://raw.githack.com/minoryorg/Noto-Sans-CJK-JP/master/fonts/NotoSansCJKjp-Medium.ttf');
  }

  const browser = await puppeteer.launch({
    slowMo: slowMo,
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: viewportWidth,
    height: viewportHeight,
  });
  await page.goto(URL);

  const pdf = await page.pdf();
  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', pdf.length);
  res.setHeader('Cache-Control', `public, s-maxage=0, stale-while-revalidate`);
  res.send(pdf);
}
