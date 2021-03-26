const exec = require('child_process').exec

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  // watch submit
  const text = document.querySelector('#text')
  const submitBtn = document.querySelector('#btn-submit')
  submitBtn.addEventListener('click', () => {
    alert(text.value)
    const cmdStr = 'echo "rewz 中文 123"'

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行的错误: ${error}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.error(`stderr: ${stderr}`)
    })
  })
})
