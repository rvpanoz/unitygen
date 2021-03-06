const Backbone = require('backbone');
const Marionette = require('backbone.marionette');
const LayoutView = require('views/layout');
const Router = require('./router');
const config = require('./config');
const Bootstrap = require('bootstrap/dist/js/bootstrap.min');
const themeJS = require('./assets/js/theme');

var app = Marionette.Application.extend({
  region: '#app-content',

  onBeforeStart() {
    /**
     * Instatiate router
     * @type {Router}
     */
    this.router = new Router();
  },
  onStart() {
    /**
     * setup config
     */
    this.config = _.extend({}, config);

    /**
     * Show layout view
     */
    this.showView(new LayoutView());

    /**
     * Backbone history start
     */
    if (Backbone.history) {
      Backbone.history.start();
    }

    /**
     * Global app events
     */
  },
  navigate(cls, params) {
    var url = {};
    _.extend(url, {
      cls: cls,
      params: params
    });

    this.router.navigate(JSON.stringify(url), {
      trigger: true
    });

    return false;
  },

  onAppEvent(event, opts) {
    this.trigger(event, opts);
  },

  wait(active) {
    var spinner = $('.loading');
    if (active == true) {
      spinner.show();
    } else if (active == false) {
      setTimeout(function() {
        spinner.hide();
      }, 1000);
    }
  },

  showMessage(message, type) {
    alert(message);
  }
});

module.exports = new app();
