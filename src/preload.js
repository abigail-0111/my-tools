const iconv = require('iconv-lite');
const exec = require('child_process').exec

function runExec(cmdStr) {
  exec(cmdStr, { encoding: 'buffer' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${iconv.decode(error, 'cp936')}`)
    }
    if (stdout) {
      console.log(`stdout: ${iconv.decode(stdout, 'cp936')}`)
    }  
    if (stderr.length) {
      console.error(`stderr: ${iconv.decode(stderr, 'cp936')}`)
    }
    return
  })
}

window.addEventListener('DOMContentLoaded', () => {
  const text = document.querySelector('#text')
  const submitBtn = document.querySelector('#btn-submit')
  const activeBtns = document.querySelectorAll('.btn-group button')
  const resetBtn = document.querySelector('#btn-reset')

  // 输入框确认
  submitBtn.addEventListener('click', () => {
    if (!text.value || isNaN(+text.value)) {
      console.warn('需输入数字')
      return
    }
    const cmdStr = `shutdown -s -t ${text.value}`
    runExec(cmdStr)
  })

  // 操作按钮
  activeBtns.forEach(item => {
    item.addEventListener('click', () => {
      const cmdStr = `shutdown -s -t ${item.getAttribute('data-value')}`
      runExec(cmdStr)
    })
  })

  // 取消
  resetBtn.addEventListener('click', () => {
    const cmdStr = `shutdown -a`
    runExec(cmdStr)
  })
})
