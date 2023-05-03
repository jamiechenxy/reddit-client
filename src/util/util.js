let res;

export const numTransform = (num) => {
    if (num >= 1000 && num <= 999999) {
        const numStr = Math.fround(num / 1000).toFixed(1).toString();
        if (numStr.endsWith(0)) {
            res = numStr.split('.')[0].concat('k')
            return res;
        } else {
            res = numStr.concat('k');
            return res
        }
    }
    else if (num >= 1000000 && num <= 999999999) {
        const numStr = Math.fround(num / 1000000).toFixed(1).toString();
        if (numStr.endsWith(0)) {
            res = numStr.split('.')[0].concat('m')
            return res;
        } else {
            res = numStr.concat('m');
            return res
        }
    }
    else {
        return num.toString();
    }    
};






