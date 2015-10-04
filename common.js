var markdownText = document.getElementById('text-content').textContent;
document.getElementById('text-content').innerHTML = marked(markdownText);