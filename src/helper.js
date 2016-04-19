var expires, date, nameEQ, ca, c;

export function createCookie(name,value,days) {
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = '; expires='+date.toGMTString();
    }
    else expires = '';
    document.cookie = name+'='+value+expires+'; path=/';
}

export function readCookie(name) {
    nameEQ = name + '=';
    ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export function eraseCookie(name) {
    createCookie(name,'',-1);
}


//******************************

export function cloneState(state) {
    let newState = Object.assign({}, state);
    newState.posts = [];
    state.posts.forEach(function(elem){
        let newObj = Object.assign({}, elem);
        newState.posts.push(newObj);
    });
    return newState;
}