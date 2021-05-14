export default {
    validateTitle: function (title) {
        let validateMessage = "";

        if(title.length > 32 || !(title.replace(/\s/g, '').length)) {
            validateMessage = "Nieprawidłowy tytuł!"
        }
        
        return validateMessage;
    },

    validateDesc: function(desc) {
        let validateMessage = "";

        if(!(desc.replace(/\s/g, '').length)) {
            validateMessage = "Nieprawidłowy opis!"
        }

        return validateMessage;
    }
}