const buttonsControls = document.querySelectorAll('#buttonsControls');
const modalArchive = document.querySelectorAll('.modal-archive');
var chars = document.querySelector('#chars');
const inputTextUser = document.querySelector('textarea');
const controls = document.querySelectorAll("#controls");
const reallyBox = document.querySelector('.really');
const buttonsReally = document.querySelectorAll("#button-really");
const saveFile = document.querySelector('.name-file');
const buttonSaveFile = document.querySelector('.save-file');
const inputNameFile = document.querySelector('.input-name-file');
const buttonCanceledFile = document.querySelector('.canceled-button-file');


const openModals = (click) => {
    if (click.target === buttonsControls[0]) {
        modalArchive[0].classList.toggle('active');
    } else {
        modalArchive[1].classList.toggle('active');
    }
}

// Run Function
buttonsControls.forEach((buttons) => {
    buttons.addEventListener('click', openModals);
});

const modalControlsEvents = (click) => {
    if (click.target === controls[0] || click.target === controls[1]) {
        if (inputTextUser.value !== "") {
            reallyBox.classList.add('active');
            buttonsReally.forEach((buttons) => {
                buttons.addEventListener('click', reallyButtonsEvents);
            });
        }
    } else {
        switch (click.target) {
            case controls[2]:
                controls[2].addEventListener('click', () => {
                    inputTextUser.select();
                    document.execCommand('copy');
                    modalArchive[1].classList.remove('active');
                });
                break;
            case controls[3]:
                break;
            case controls[4]:
                controls[4].addEventListener('click', () => {
                    const removeChar = inputTextUser.value.slice(0, -1);
                    console.log(inputTextUser.value = removeChar);
                });
                break;
            case controls[5]:
                const dates = new Date;
                const day = dates.getDate();
                const month = dates.getMonth() + 1;
                const year = dates.getFullYear();
                inputTextUser.value += `${day}:${month}:${year}`;
                chars.textContent = `Número de caracters: ${inputTextUser.value.length}`;
                break;
            case controls[6]:
                controls[6].addEventListener('click', ()=> {
                    const textUpperCase = inputTextUser.value.toUpperCase();
                    inputTextUser.value = textUpperCase;
                    modalArchive[1].classList.remove('active');
                })
                break;
            case controls[7]:
                controls[7].addEventListener('click', ()=> {
                    inputTextUser.classList.add('bold');
                });
            case controls[8]:
                controls[8].addEventListener('click', ()=> {
                    inputTextUser.classList.add('italic');
                })
        }
    }
}

// Confirm Events Really
const reallyButtonsEvents = (click) => {
    switch (click.target) {
        case buttonsReally[0]:
            saveFile.classList.add('active');
            reallyBox.classList.remove('active');
            saveFiles();
            break;
        case buttonsReally[1]:
            // Reseting Document
            reallyBox.classList.remove('active');
            modalArchive[0].classList.remove('active');
            inputTextUser.value = "";
            chars.textContent = `Número de caraceters: ${0}`;
            break;
        case buttonsReally[2]:
            // Canceled Actions ↓
            reallyBox.classList.remove('active');
            break;
    }
}

const saveFiles = () => {
    buttonSaveFile.addEventListener('click', () => {
        // Verify Input Null
        if (inputNameFile.value === "") {
            alert("Não deixe o campo vazio");
        } else {
            const blob = new Blob([inputTextUser.value], {
                type: "text/plain;charset=utf-8",
            });
            saveAs(blob, inputNameFile.value, inputTextUser.value + ".txt");
            saveFile.classList.remove('active');
            inputTextUser.value = "";
            modalArchive[0].classList.remove('active');
            chars.textContent = `Número de caracters: ${0}`;
        }
    })
}

// Canceled Saves Files
const canceledFiles = () => {
    saveFile.classList.remove('active');
}
buttonCanceledFile.addEventListener('click', canceledFiles);

// Run Function Modals
controls.forEach((modalControls) => {
    modalControls.addEventListener('click', modalControlsEvents);
});

const characterCounter = () => {
    // Run a JavaScript immediately after a page loads
    window.onload = () => {
        // Oniput -> Execute JavaScript when a user writes something in an <input> field
        inputTextUser.oninput = () => {
            chars.textContent = `Quantidade de caracters: ${inputTextUser.value.length}`;
        }
    }
}

// Run Function
characterCounter();