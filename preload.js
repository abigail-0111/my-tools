// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  // watch submit
  const text = document.querySelector('#text')
  const submitBtn = document.querySelector('#btn-submit')
  submitBtn.addEventListener('click', () => {
    alert(text.value)
  })
})
