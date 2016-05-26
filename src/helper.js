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
    try {
    nameEQ = name + '=';
    ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
    }
    catch (e) {
      console.log('Error writing cookies')
    }
}

export function eraseCookie(name) {
    createCookie(name,'',-1);
}


//******************************


export function formArrayToJson(formArray) {
    let obj = {};
    formArray.forEach(function (elem) {
    if (elem.name.indexOf('__') > 0) {
        let nameAndKey = elem.name.split('__');
        let name = nameAndKey[0];
        let key = nameAndKey[1];
        if(!obj[name]) obj[name] = [];
        obj[name].push(key);
    }
        else {
        obj[elem.name] = elem.value;
    }

    });
    return obj;

}

export function mapNodes(nodes, func) {
    let ids = nodes.ids;
    let entities = nodes.entities;
    /*
    let iterator = {
        [Symbol.iterator]: function() {
        let currentIndex = 0;
        return {
            next() {
                if (currentIndex < ids.length) return {value: entities[ids[currentIndex++]], done:false}
                else return {done: true}
            }
        }
    }
    }
    return iterator;
    */
    return ids.map(function (id, index) {
    return func(entities[id], index);
    })

}