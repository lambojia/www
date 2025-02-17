klaro.getManager(kConfig).watch({
  update: function(obj, name, data) {
    if (name === 'saveConsents') {
      console.log(data);
    }
  }
});

function showManager() {
    klaro.show(kConfig, true);
}