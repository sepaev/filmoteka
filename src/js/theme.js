if (!localStorage.theme) localStorage.theme = 'light'
document.body.className = localStorage.theme

toggleThemeBtn.onclick = () => {
    document.body.classList.toggle('dark')
    toggleThemeBtn.innerText = document.body.classList.contains('dark') ? '' : ''
    localStorage.theme = document.body.className || 'light'
}