export default {
    validateText: function (text, length, message) {
        if(text.length >= length || !(text.replace(/\s/g, '').length)) return message;
        else return "";
    }
}