// 感谢这篇文章的启发 [基于canvas将图片转化成字符画](http://www.cssha.com/img2txt-canvas)

export default class asciiFromCanvas {
  constructor() {
    this.style = "<style type='text/css'>* {margin: 0;padding: 0;} .ascii {font-size: 12px;font-family: simsun;}</style>"
    // 按照不同的终端输出
    this.types = {
      cli: {
        br: '\n',
        blank: ' '
      },
      html: {
        br: '</br>',
        blank: '&nbsp;'
      }
    }
  }

  // 根据灰度生成相应字符
  toText(type, g) {
    if (g <= 30) {
      return '#'
    } else if (g > 30 && g <= 60) {
      return '&'
    } else if (g > 60 && g <= 120) {
      return '$'
    } else if (g > 120 && g <= 150) {
      return '*'
    } else if (g > 150 && g <= 180) {
      return 'o'
    } else if (g > 180 && g <= 210) {
      return '!'
    } else if (g > 210 && g <= 240) {
      return ';'
    } else {
      return this.types[type].blank
    }
  }

  // 根据rgb值计算灰度
  getGray(r, g, b) {
    return 0.299 * r + 0.578 * g + 0.114 * b
  }

  // 初始化
  init(type, ctx, pic) {
    const data = ctx.getImageData(0, 0, pic.width, pic.height)
    let text = ''

    for (let h = 0; h < data.height; h += 12) {
      let p = '';
      for (let w = 0; w < data.width; w += 6) {
        const index = (w + data.width * h) * 4;
        const r = data.data[index + 0];
        const g = data.data[index + 1];
        const b = data.data[index + 2];
        const gray = this.getGray(r, g, b);
        p += this.toText(type, gray);
      }
      p += this.types[type].br;
      text += p;
    }

    return (type === 'html') ? this.style + "<div class='ascii'>" + text + '</div>' : text;
  }
}
