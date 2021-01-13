import 'dotenv/config.js'
import puppeteer from 'puppeteer'
import fs from 'fs'

async function run() {
  const INSTAGRAM = process.env.INSTAGRAM
  const browser = await puppeteer.launch(/*{headless:false}*/)
  const page = await browser.newPage()
  await page.goto(`https://www.instagram.com/${INSTAGRAM}`)
  
  const imgList = await page.evaluate(()=>{
    const nodeList = document.querySelectorAll('article img')
    const imgArray = [...nodeList]
    const imgList = imgArray.map(({src})=>({
      src,
    }))

    return imgList
  })

  fs.writeFile('instagram.json',JSON.stringify(imgList,null,2),(e)=>{
    if(e){
      throw new Error('something went wrong')
    }
  })

  await browser.close();
}

run()