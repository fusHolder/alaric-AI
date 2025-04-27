const windows = document.getElementById('windows');
const template = document.getElementById('code-window-template');
const addWindowBtn = document.getElementById('addWindow');

function createCodeWindow() {
    const clone = template.content.cloneNode(true);
    const section = clone.querySelector('.code-window');
    const codeBlock = section.querySelector('.code-block code');
    const langSelect = section.querySelector('.lang-select');
    const copyBtn = section.querySelector('.copy-btn');
    const previewBtn = section.querySelector('.preview-btn');
    const removeBtn = section.querySelector('.remove-btn');
    const previewArea = section.querySelector('.preview-area');

    // Syntax highlighting on input
    codeBlock.addEventListener('input', () => {
        Prism.highlightElement(codeBlock);
    });

    // Change language
    langSelect.addEventListener('change', () => {
        const lang = langSelect.value;
        codeBlock.className = 'language-' + lang;
        Prism.highlightElement(codeBlock);
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', () => {
        const text = codeBlock.innerText;
        navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = "Copy", 1200);
    });

    // Preview code
    previewBtn.addEventListener('click', () => {
        const lang = langSelect.value;
        let code = codeBlock.innerText;
        if (lang === "html") {
            previewArea.innerHTML = code;
        } else if (lang === "css") {
            previewArea.innerHTML = `<style>${code}</style><div style="padding:1rem;">CSS Preview Area</div>`;
        } else if (lang === "javascript") {
            try {
                previewArea.innerHTML = "";
                const result = eval(code);
                if (result !== undefined) {
                    previewArea.innerText = result;
                }
            } catch (e) {
                previewArea.innerText = e;
            }
        } else {
            previewArea.innerText = "Preview not supported for this language.";
        }
        previewArea.classList.add('active');
    });

    // Remove window
    removeBtn.addEventListener('click', () => {
        section.remove();
    });

    windows.appendChild(section);
    Prism.highlightElement(codeBlock);
}

addWindowBtn.addEventListener('click', createCodeWindow);

// Add initial window
createCodeWindow();
