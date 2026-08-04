// js/script.js - Logic Engine (ಇದನ್ನು ಮತ್ತೆ ಎಡಿಟ್ ಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ)

// --- ೧. ಭಾಷೆ ಬದಲಾಯಿಸುವ ಲಾಜಿಕ್ ---
function changeLanguage() {
    // 'translations' ಎಂಬ ಡೇಟಾ ಆಯಾ HTML ಫೈಲ್‌ನಿಂದ ಬರುತ್ತದೆ
    const lang = document.getElementById('lang-switch').value;
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

// --- ೨. ರಸಪ್ರಶ್ನೆಯ ಲಾಜಿಕ್ ---
function checkAnswer(btn, qNum, isCorrect) {
    let buttons = btn.parentElement.getElementsByTagName('button');
    for(let b of buttons) { 
        b.disabled = true; 
        b.style.opacity = "0.7"; 
        b.style.cursor = "not-allowed"; 
    }

    if(isCorrect) {
        btn.classList.add('correct'); 
        btn.style.opacity = "1";
        
        setTimeout(() => {
            document.getElementById('q' + qNum).classList.remove('active');
            
            // ಮುಂದಿನ ಪ್ರಶ್ನೆ ಇದೆಯಾ ಎಂದು ತಾನಾಗಿಯೇ ಚೆಕ್ ಮಾಡುತ್ತದೆ
            let nextQuestion = document.getElementById('q' + (qNum + 1));
            if(nextQuestion) { 
                nextQuestion.classList.add('active'); 
            } else { 
                document.getElementById('success-msg').style.display = 'block'; 
            }
        }, 1000);
    } else {
        btn.classList.add('wrong'); 
        btn.style.opacity = "1";
        for(let b of buttons) { 
            if(b.getAttribute('onclick').includes('true')) { 
                b.classList.add('correct'); 
                b.style.opacity = "1"; 
            } 
        }
        setTimeout(() => { location.reload(); }, 1500);
    }
}

// ಪೇಜ್ ಲೋಡ್ ಆದ ತಕ್ಷಣ ಭಾಷೆ ಸೆಟ್ ಮಾಡಲು
window.onload = changeLanguage;