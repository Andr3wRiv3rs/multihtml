;let $ = e => ( document.querySelectorAll(e) );

let textarea = new Vue({
    el: 'div#textarea',
    data: {
        lines: []
    }
});

let line = {
    index: w => ( eval( w.parentNode.querySelector('.index').innerText ) ),
    add: () => {
        let index = textarea.lines.length+1;
        textarea.lines.push({ index: index, tabs: 0 });
        let wait = setInterval(()=>{
            if ( $('.text').length == index+1 ){
                line.focus(index);
                clearInterval(wait);
                $('.text')[index-1].style.paddingLeft='0.5em';
            }
        },50);
    },
    focus: w => {
        $('.text')[w].focus()
    }
    
}

window.addEventListener( 'keypress', e => {
    if ( /\btext\b/.test(e.target.className) ) {
        switch( e.key.toLowerCase() ) {
            case 'enter': 
                line.add();
                break;
            case 'tab':
                return false;
                break;
        }
    }
});

window.addEventListener( 'keydown', e => {
    if ( /\btext\b/.test(e.target.className) ) {
        let index = line.index(e.target)-1;
        switch( e.key.toLowerCase() ) {
            case 'tab':
                let p = e.target.style.paddingLeft;
                if ( p == '' ){
                    e.target.style.paddingLeft='0.5em'
                    p = e.target.style.paddingLeft;
                }
                let p2 = eval( p.replace('em','') );
                let offset = 2;

                if ( p2 >= 2.5 ) {
                    if ( e.shiftKey ) {
                        offset = -2;
                    }
                } else if ( e.shiftKey ) {
                    offset = 0;
                } else {
                    offset = 2;
                }

                switch ( offset ) {
                    case -2:
                        textarea.lines[index].tabs-=1;
                        break;
                    case 2:
                        textarea.lines[index].tabs+=1;
                }

                $('.text')[index].blur();
                $('.text')[index].focus();

                e.target.style.paddingLeft = p2 + offset + 'em';
                e.cancelBubble = true;
                e.returnValue = false;
                break;
            case 'backspace':
                if ( textarea.lines[index].tabs > 0 ) {
                    if ( e.target.selectionStart == 0 ) {
                        e.target.style.paddingLeft = eval(  e.target.style.paddingLeft.replace('em','') ) - 2 + 'em';
                    }
                }
                break;
        }
    }
});

line.add();