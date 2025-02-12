// By default, Klaro will load the config from  a global "klaroConfig" variable.
// You can change this by specifying the "data-config" attribute on your
// script take, e.g. like this:
// <script src="klaro.js" data-config="myConfigVariableName" />
var klaroConfig = {
    // With the 0.7.0 release we introduce a 'version' paramter that will make
    // it easier for us to keep configuration files backwards-compatible in the future.
    version: 1,

    // You can customize the ID of the DIV element that Klaro will create
    // when starting up. If undefined, Klaro will use 'klaro'.
    elementID: 'klaro',

    // You can override CSS style variables here. For IE11, Klaro will
    // dynamically inject the variables into the CSS. If you still consider
    // supporting IE9-10 (which you probably shouldn't) you need to use Klaro
    // with an external stylesheet as the dynamic replacement won't work there.
    styling: {
        "theme": ["left", "bottom", "dark"],
    },

    // You can show a description in contextual consent overlays for store 
    // being empty. In that case the accept always button is omitted. 
    // The description contains a link for opening the consent manager. 
    showDescriptionEmptyStore: true,

    // Setting this to true will keep Klaro from automatically loading itself
    // when the page is being loaded.
    noAutoLoad: false,

    // Setting this to true will render the descriptions of the consent
    // modal and consent notice are HTML. Use with care.
    htmlTexts: true,

    // Setting 'embedded' to true will render the Klaro modal and notice without
    // the modal background, allowing you to e.g. embed them into a specific element
    // of your website, such as your privacy notice.
    embedded: false,

    // You can group services by their purpose in the modal. This is advisable
    // if you have a large number of services. Users can then enable or disable
    // entire groups of services instead of having to enable or disable every service.
    groupByPurpose: true,

    // You can make the consent notice autofocused by enabling the following option
    autoFocus: false,

    // You can show a title in the consent notice by enabling the following option
    showNoticeTitle: false,

    // How Klaro should store the user's preferences. It can be either 'cookie'
    // (the default) or 'localStorage'.
    storageMethod: 'cookie',

    // You can customize the name of the cookie that Klaro uses for storing
    // user consent decisions. If undefined, Klaro will use 'klaro'.
    cookieName: 'klaro',

    // You can also set a custom expiration time for the Klaro cookie.
    // By default, it will expire after 120 days.
    cookieExpiresAfterDays: 365,

    // You can change to cookie domain for the consent manager itself.
    // Use this if you want to get consent once for multiple matching domains.
    // If undefined, Klaro will use the current domain.
    //cookieDomain: '.github.com',

    // You can change to cookie path for the consent manager itself.
    // Use this to restrict the cookie visibility to a specific path.
    // If undefined, Klaro will use '/' as cookie path.
    //cookiePath: '/',

    // Defines the default state for services (true=enabled by default).
    default: false,

    // If "mustConsent" is set to true, Klaro will directly display the consent
    // manager modal and not allow the user to close it before having actively
    // consented or declines the use of third-party services.
    mustConsent: false,

    // Show "accept all" to accept all services instead of "ok" that only accepts
    // required and "default: true" services
    acceptAll: true,

    // replace "decline" with cookie manager modal
    hideDeclineAll: false,

    // hide "learnMore" link
    hideLearnMore: false,

    // show cookie notice as modal
    noticeAsModal: false,

    // You can also remove the 'Realized with Klaro!' text in the consent modal.
    // Please don't do this! We provide Klaro as a free open source tool.
    // Placing a link to our website helps us spread the word about it,
    // which ultimately enables us to make Klaro! better for everyone.
    // So please be fair and keep the link enabled. Thanks :)
    //disablePoweredBy: true,

    // you can specify an additional class (or classes) that will be added to the Klaro `div`
    //additionalClass: 'my-klaro',

    // You can define the UI language directly here. If undefined, Klaro will
    // use the value given in the global "lang" variable. If that does
    // not exist, it will use the value given in the "lang" attribute of your
    // HTML tag. If that also doesn't exist, it will use 'en'.
    //lang: 'en',

    // You can overwrite existing translations and add translations for your
    // service descriptions and purposes. See `src/translations/` for a full
    // list of translations that can be overwritten:
    // https://github.com/KIProtect/klaro/tree/master/src/translations

    // Example config that shows how to overwrite translations:
    // https://github.com/KIProtect/klaro/blob/master/src/configs/i18n.js
    translations: {
        // translationsed defined under the 'zz' language code act as default
        // translations.
        zz: {
            privacyPolicyUrl: '/#privacy',
        },
        // If you erase the "consentModal" translations, Klaro will use the
        // bundled translations.
        en: {
            consentModal: {
                title: '<u>test</u>',
                description:
                    'Here you can see and customize the information that we collect about you. Entries marked as "Example" are just for demonstration purposes and are not really used on this website.',
            },
            inlineTracker: {
                description: 'Example of an inline tracking script',
            },
            externalTracker: {
                description: 'Example of an external tracking script',
            },
            adsense: {
                description: 'Displaying of advertisements (just an example)',
                title: 'Google Adsense Advertisement',
            },
            matomo: {
                description: 'Collecting of visitor statistics',
            },
            camera: {
                description:
                    'A surveillance camera (just an example for an IMG tag)',
            },
            cloudflare: {
                description: 'Protection against DDoS attacks',
            },
            intercom: {
                description:
                    'Chat widget & collecting of visitor statistics (just an example)',
            },
            mouseflow: {
                description: 'Real-Time user analytics (just an example)',
            },
            googleFonts: {
                description: 'Web fonts hosted by Google',
            },
            purposes: {
                analytics: 'Analytics',
                security: 'Security',
                livechat: 'Livechat',
                advertising: 'Advertising',
                styling: 'Styling',
            },
        },
    },

    // This is a list of third-party services that Klaro will manage for you.
    services: [

    {
      name: 'google-analytics', // Unique name for your service
      title: 'Google Analytics', // User-friendly title
      description: 'We use Google Analytics to understand how our website is used and to improve your experience.', // Description for the user
      type: 'tracking', // Important: Set type to 'tracking'
      purposes: ['analytics'], // Define the purpose (you might have a custom purpose)
      default: true, // Optional: Set to true if Google Analytics is enabled by default (GDPR considerations!)
      // GDPR: Set to true if consent is required for analytics.  Important!
      // If "required" is set to true, Klaro will not allow this service to
      // be disabled by the user.
      required: false,
      // If "optOut" is set to true, Klaro will load this service even before
      // the user gave explicit consent.
      // We recommend always leaving this "false".
      optOut: false,
      // If "onlyOnce" is set to true, the service will only be executed
      // once regardless how often the user toggles it on and off.
      onlyOnce: true,
      cookies: [ // List the cookies used by Google Analytics. This helps users understand what they're consenting to.
        '_ga',
        '_gali',
        '_gid',
        '_gat',
        /^_ga_.*$/,
        /^_gat_gtag_.*$/
      ],
      callback: function(consent, service) {

        console.log('User consent for service ' + service.name + ': consent=' + consent);

        if(consent==true){
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)};i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          // Initialize Google Analytics. Replace 'G-YOUR_GA_MEASUREMENT_ID' with your actual ID.
          ga('create', 'G-22P3XV6H72', 'auto'); // Or your legacy UA ID
          ga('send', 'pageview');
        }

      },
    },
    {
      name: 'matomo',
      title: 'Matomo Analytics',
      description: 'We use Matomo to analyze website traffic and improve user experience.',
      type: 'tracking',
      purposes: ['analytics'], // Or your custom purposes
      default: true,
      required: false,
      optOut: false,
      onlyOnce: true,
      cookies: [ // List Matomo cookies.  Consult Matomo documentation for the latest.
        {
          name: '_pk_id.*', // Use a regex to catch all variations
          description: 'Used to recognize visitors uniquely.',
          expiry: '13 months'
        },
        {
          name: '_pk_ses.*', // Use a regex to catch all variations
          description: 'Used to store the visit information.',
          expiry: '30 minutes'
        },
        // ... other Matomo cookies
      ],
      callback: function(consent, service) {

        console.log('User consent for service ' + service.name + ': consent=' + consent);

        if(consent==true){
          var _paq = window._paq = window._paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="//matomo.alipyo.com/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '1']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        }

      },
    },
    {
      name: 'linkedin-insight-tag',
      title: 'LinkedIn Insight Tag',
      description: 'We use the LinkedIn Insight Tag to measure and optimize our LinkedIn advertising campaigns.', // User-friendly description
      type: 'marketing', // Or 'advertising', choose the appropriate type
      purposes: ['advertising'], // Define the purpose (you might have a custom purpose)
      default: true,
      required: false,
      optOut: false,
      onlyOnce: true,
      cookies: [ // List the cookies used by LinkedIn Insight Tag. This is crucial for transparency.
        {
          name: 'li_gc', // Example.  LinkedIn may use others. Consult their docs.
          description: 'Used for ad targeting and measurement.',
          expiry: '2 years' // Or specify the actual expiry
        },
        // ... other LinkedIn cookies.  Be sure to check LinkedIn's documentation.
      ],
      callback: function(consent, service) {

        console.log('User consent for service ' + service.name + ': consent=' + consent);

        if(consent==true){
          // Load the LinkedIn Insight Tag script. Do this ONLY when consent is given!
          _linkedin_partner_id = "6945636"; // Replace with your Partner ID
          window._linkedin_data_partner = window._linkedin_data_partner || [];
          window._linkedin_data_partner.push({
            'id': _linkedin_partner_id
          });

          (function(l) {
            if (!l){window.lintracker = function(a,b){window._linkedin_data_partner.push(arguments);}}
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
            var h = document.getElementsByTagName('script')[0];
            h.parentNode.insertBefore(s, h);
          })(window._linkedin_data_partner);
        }

      },
    },

  ],
};
