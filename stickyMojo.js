(function($) {
  $.fn.extend({
    stickyMojo: function(options) {

      var settings = $.extend({
        'footerID': '',
        'contentID': '',
        'orientation': $(this).css('float')
      }, options);

      var sticky = {
        'el': $(this),
        'stickyLeft': $(settings.contentID).outerWidth() + $(settings.contentID).offset.left,
        'stickyTop2': $(this).offset().top,
        'stickyHeight': $(this).outerHeight(true),
        'contentHeight': $(settings.contentID).outerHeight(true),
        'win': $(window),
        'breakPoint': $(this).outerWidth(true) + $(settings.contentID).outerWidth(true),
        'marg': parseInt($(this).css('margin-top'), 10)
      };

      var errors = checkSettings();
      setIDs();

      return this.each(function() {
        if (!errors.length) {
          sticky.el.css('left', sticky.stickyLeft);

          sticky.win.bind({
            'scroll' : stick,
            'resize' : function() {
              sticky.el.css('left', sticky.stickyLeft);
              stick();
            }
          });
        } else {
          if (console && console.warn) {
            console.warn(errors);
          } else {
            alert(errors);
          }
        }
      });

      function setIDs() {
        settings.footerID = $(settings.footerID);
        settings.contentID = $(settings.contentID);
      }
      //  Calcualtes the limits for blah
      function calculateLimits() {
        return {
          limit     : settings.footerID.offset().top - sticky.stickyHeight,
          windowTop : sticky.win.scrollTop(),
          stickyTop : sticky.stickyTop2 - sticky.marg
        }
      }

      function fixSidebar() {
        sticky.el.css({
            position: 'fixed',
            top: 0
          });
      }
      function checkLeftRight() {
        if (settings.orientation === "left") {
            settings.contentID.css('margin-left', sticky.el.outerWidth(true));
          }
        else {
          sticky.el.css('margin-left', settings.contentID.outerWidth(true));
        }
      }
      function staticSidebar() {
        sticky.el.css('position', 'static');
        settings.contentID.css('margin-left', '0px');
        sticky.el.css('margin-left', '0px');
      }

      function limitedSidebar(diff) {
        sticky.el.css({
            top: diff
          });
      }

      function stick() {
        var tops = calculateLimits();
        var hitBreakPoint = tops.stickyTop < tops.windowTop && (sticky.win.width() >= sticky.breakPoint);

        if (hitBreakPoint) {
          fixSidebar();
          checkLeftRight();
        }
        else {
          staticSidebar();
        }
        if (tops.limit < tops.windowTop) {
          var diff = tops.limit - tops.windowTop;
          limitedSidebar(diff);
        }
      }

      function checkSettings() {
        var errors = [];
        for (var key in settings) {
          if (!settings[key]) {
            errors.push(settings[key]);
          }
        }
        ieVersion() && errors.push("NO IE 7");
        return errors;
      }

      function ieVersion() {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
          var ua = navigator.userAgent;
          var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
          if (re.exec(ua) != null) {
            rv = parseFloat(RegExp.$1);
          }
        }
        switch (true) {
        case (rv >= 8.0):
          return false;
          break;
        case (rv > -1):
          return true;
          break;
        default:
          return false;
          break;
        }
      }
    }
  });
})(jQuery);