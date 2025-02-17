document.addEventListener('DOMContentLoaded', function() {

  let klaroLoaded = false;
  let configLoaded = false;
  let kConfig; // Define kConfig here

  // Initialize kConfig (replace with your actual configuration)
  kConfig = {
    // ... your Klaro configuration
  };

  const klaroScript = document.querySelector('script[src*="klaro.js"]');
  const configScript = document.querySelector('script[src*="config.js"]');

  if (!klaroScript) {
    console.error("Klaro script tag not found!");
    return; // Stop execution if script not found
  }

  if (!configScript) {
    console.error("Config script tag not found!");
    return; // Stop execution if script not found
  }

  klaroScript.addEventListener('load', function() {
    klaroLoaded = true;
    checkAndShowKlaro();
  });

  configScript.addEventListener('load', function() {
    configLoaded = true;
    checkAndShowKlaro();
  });

  klaroScript.addEventListener('error', function() {
    console.error("Failed to load klaro.js");
  });

  configScript.addEventListener('error', function() {
    console.error("Failed to load config.js");
  });

  function checkAndShowKlaro() {
    console.log("trigger me");
    if (!klaroLoaded || !configLoaded) {
      return;
    }

    //show preferences button
    document.getElementById('preferences-button').style.display = 'block';

    klaro.getManager(kConfig).watch({
      update: function(obj, name, data) {
        if (name === 'saveConsents') {
          console.log(data);
        }
      }
    });
  }

  function showManager() {
    klaro.show(kConfig, true);
  }

});