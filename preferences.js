document.addEventListener('DOMContentLoaded', function() {

//show preferences button
document.getElementById('preferences-button').style.display = 'block';

klaro.getManager(kConfig).watch({
  update: function(obj, name, data) {
    if (name === 'saveConsents') {
      console.log(data);
    }
  }
  
});
});

function showManager() {
    klaro.show(kConfig, true);
}