import path from 'path'
import ascii from '../src/index.js'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const toAscii = input => {
  return new Promise((resolve, reject) => {
    input.convert((err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

(async () => {
  const img1 = new ascii(`${__dirname}/demo.jpg`)
  const img2 = new ascii(`${__dirname}/demo2.jpg`)
  console.log(
    '\x1Bc\x1b[3J', 
    '\n\x1b[1mchromium:\x1b[0m\n', 
    await toAscii(img1), 
    '\n\n\x1b[1mlinux:\x1b[0m\n', 
    await toAscii(img2)
  )
})()
