import HttpsProxyAgent from 'https-proxy-agent'
import https from 'https'
import url from 'url'
import chalk from 'chalk'

const websites = [
  'https://bilibili.com',
  'https://pornhub.com',
  'https://github.com',
  'https://youtube.com',
  'https://twitter.com',
  'https://nodejs.org',
  'https://google.com',
  'https://baidu.com',
  'https://music.163.com',
  'https://medium.com',
  'https://facebook.com',
  'https://wikipedia.org',
  'https://yahoo.com',
  'https://instagram.com',
  'https://taobao.com',
  'https://jd.com',
  'https://amazon.com',
  'https://weibo.com',
  'https://360.com',
  'https://live.com',
  'https://netflix.com',
  'https://microsoft.com',
  'https://office.com',
  'https://csdn.net',
  'https://bing.com',
  'https://myshopify.com',
  'https://stackoverflow.com',
  'https://ebay.com',
  'https://apple.com',
  'https://weather.com',
  'https://qq.com',
  'https://segmentfault.com',
  'https://blog.skk.moe/',
]

// HTTP/HTTPS proxy to connect to
const proxy = process.env.http_proxy || 'http://127.0.0.1:7890'
async function main() {
  for (let website of websites) {
    await test(website)
  }
}

function test(urlStr: string) {
  let flag = Date.now()
  let configUrl = urlStr
  let displayUrl = urlStr.split('https://')[1]

  return new Promise((resolve, reject) => {
    try {
      https
        .get(
          {
            ...url.parse(configUrl),
            // @ts-ignore
            agent: new HttpsProxyAgent(proxy),
          },
          function (res: unknown) {
            resolve(res)

            const time = Date.now() - flag
            let color = time > 500 ? chalk.yellow : chalk.green
            let timeStr = time.toString().padEnd(8)
            console.log(color(timeStr + displayUrl))
          }
        )
        .on('error', () => {
          console.log(chalk.red('timeout ' + displayUrl))
          resolve()
        })
    } catch {
      console.log(chalk.red('error   ' + displayUrl))
      resolve()
    }
  })
}

main()
