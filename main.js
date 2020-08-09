const btns = document.querySelectorAll('.btn');

const TextArea = (function () {
    const area = document.querySelector('.text-place')
    let text = '';
    let isCapsLock = false;
    let temp;
    function add(str) {
        if (isCapsLock) {
            text = area.innerHTML + str.toUpperCase();
        } else {
            text = area.innerHTML + str;
        }
        area.innerHTML = text;
    }

    function remove() {
        text = area.innerHTML
        text = text.slice(0, text.length - 1)
        area.innerHTML = text;
    }

    function switchCaps(is) {
        temp = isCapsLock
        if( is != undefined){
            isCapsLock = is;
        }else {
            isCapsLock = temp
        }
    }

    return {
        add: add,
        remove: remove,
        switchCaps: switchCaps
    }

})();

function btnAnimation(elem) {
    function remove() {
        elem.classList.remove('active')
    }
    elem.classList.add('active')
    setTimeout(remove, 1000)

}

function mainCheck(key) {
    switch (key) {
        case 'Backspace':
            TextArea.remove();
            break;
        case 'Tab':
            TextArea.switchCaps(false)
            TextArea.add('&emsp;')
            TextArea.switchCaps(undefined);
            break;
        case ' ':
            TextArea.switchCaps(false)
            TextArea.add('&ensp;')
            TextArea.switchCaps(undefined);
            break
        case 'CapsLock':
            TextArea.switchCaps();
            break;
        case 'Enter':
            TextArea.add('<br>')
            break;
        case 'Shift':
            break;
        default:
            TextArea.add(event.key)
    }
}

document.querySelector('#button-area').addEventListener('click', event => {
    if (event.target.classList.contains('btn')) {
        btnAnimation(event.target)
        console.log(event.target.innerHTML)
        mainCheck(event.target.innerHTML)
    }
})

window.addEventListener('keydown', event => {
    for (let i = 0; i < btns.length; i++) {
        let key = event.key;
        if (btns[i].innerHTML == key || btns[i].innerHTML == key.toLowerCase()) {
            btnAnimation(btns[i])
            mainCheck(key)
        }
    }
})
