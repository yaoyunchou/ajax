
class Volidata {
    constructor() {

    }
    checkRow(dom, rule, input) {
        dom.find('em').remove();
        let self = this;
        let msg
        if (input[0].required && self.isRequire(input.val())) {
            msg = input.attr('placeholder') + '不能为空';
            dom.append($('<em>' + msg + '</em>'));
            return false;

        }else if(!input.val()){
            return true;
        }
        return  rule.every((v, k) => {
            msg = input.attr('placeholder') + v.message || '不能为空';
            if (v.special && self.isSpecial(input.val())) {
                dom.append($('<em>' + msg + '</em>'));
                return false;
            }else if (v.email && self.isEmail(input.val())) {
                dom.append($('<em>' + msg + '</em>'));
                return false;
            } else if (v.num && self.isNum(input.val())) {
                dom.append($('<em>' + msg + '</em>'));
                return false;
            } else if ((v.max || v.min) && self.isLimt(input.val(), v.max || null, v.min || null)) {
                dom.append($('<em>' + msg + '</em>'));
                return false;
            }else{
                return true;
            }
        });
    }
    isRequire(value) {
        return !value.length;
    }
    isSpecial(value) {
        let reg = /[`~!@#$^&*()=|{}':;',\[\].<>\/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/gi;
        return reg.test(value);
    }
    isLimt(value, max, min) {
        if (max&&value.length > max) {
            return true;
        } else if (min&&value.length < min) {
            return true;
        } else {
            return false;
        }
    }
    isEmail(value){
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ig;
        return !reg.test(value);
    }
    isNum(value){
        let reg =/^[\+|0-9][0-9]*$/ig;
        return !reg.test(value);
    }
}

module.exports = new Volidata();