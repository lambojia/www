function initKlaro() {

    klaro.show(kConfig, true);
    
    klaro.getManager(kConfig).watch({
    update: function(obj, name, data) {
        if (name === 'saveConsents')
            console.log(data);
    }
});

}
