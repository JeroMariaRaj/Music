const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.');

files.forEach(file => {
    if (!file.endsWith('.html')) {
        return;
    }
    
    let content = fs.readFileSync(file, 'utf-8');
    
    const tagRegex = /<(\/?)(\w+)([^>]*)>/g;
    
    content = content.replace(tagRegex, (match, isClosing, tagName, attrsStr) => {
        if (isClosing) {
            return match;
        }
        
        const attrRegex = /([a-zA-Z0-9_:-]+="[^"]*")|([a-zA-Z0-9_:-]+='[^']*')|([a-zA-Z0-9_:\.\-\[\]\/]+)/g;
        
        let classes = [];
        let newAttrs = [];
        let matchAttr;
        
        while ((matchAttr = attrRegex.exec(attrsStr)) !== null) {
            const p1 = matchAttr[1];
            const p2 = matchAttr[2];
            const p3 = matchAttr[3];
            
            if (p1) {
                newAttrs.push(p1);
            } else if (p2) {
                newAttrs.push(p2);
            } else if (p3) {
                if (['required', 'checked', 'disabled', 'selected'].includes(p3)) {
                    newAttrs.push(p3);
                } else {
                    classes.push(p3);
                }
            }
        }
        
        let existingClassIdx = -1;
        for (let i = 0; i < newAttrs.length; i++) {
            if (newAttrs[i].startsWith('class=')) {
                existingClassIdx = i;
                break;
            }
        }
        
        if (classes.length > 0) {
            if (existingClassIdx !== -1) {
                const oldClass = newAttrs[existingClassIdx];
                const inner = oldClass.substring(7, oldClass.length - 1);
                const combined = inner + (inner ? ' ' : '') + classes.join(' ');
                newAttrs[existingClassIdx] = `class="${combined}"`;
            } else {
                const classStr = `class="${classes.join(' ')}"`;
                newAttrs.push(classStr);
            }
        }
        
        if (newAttrs.length > 0) {
            return `<${tagName} ${newAttrs.join(' ')}>`;
        } else {
            return `<${tagName}>`;
        }
    });
    
    fs.writeFileSync(file, content, 'utf-8');
});
