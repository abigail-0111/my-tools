const iconv = require('iconv-lite');
const exec = require('child_process').exec

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const text = document.querySelector('#text')
  const submitBtn = document.querySelector('#btn-submit')
  const resetBtn = document.querySelector('#btn-reset')

  submitBtn.addEventListener('click', () => {
    if (text.value) {
      console.log(Boolean(text.value))
    }
    if (!text.value || isNaN(+text.value)) {
      console.warn('需输入数字')
      return
    }

    const cmdStr = `shutdown -s -t ${text.value}`

    exec(cmdStr, { encoding: 'buffer' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行的错误: ${iconv.decode(error, 'cp936')}`)
      }
      if (stdout) {
        console.log(`stdout: ${iconv.decode(stdout, 'cp936')}`)
        alert('将在指定时间后关机')
      }  
      if (stderr.length) {
        console.error(`stderr: ${iconv.decode(stderr, 'cp936')}`)
      }
      return
    })
  })

  resetBtn.addEventListener('click', () => {
    const cmdStr = `shutdown -a`

    exec(cmdStr, { encoding: 'buffer' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行的错误: ${iconv.decode(error, 'cp936')}`)
      }
      if (stdout) {
        console.log(`stdout: ${iconv.decode(stdout, 'cp936')}`)
        console.log('取消定时关机')
      }  
      if (stderr.length) {
        console.error(`stderr: ${iconv.decode(stderr, 'cp936')}`)
      }
      return
    })
  })
})
