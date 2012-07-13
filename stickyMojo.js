(function($) {
  $.fn.extend({
    stickyMojo: function(options) {

      var settings = $.extend({
        'footerID': '',
        'contentID': '',
        'orientation': $(this).css('float')
      }, options);

      var sticky = {
         'el' : $(this),
         'stickyLeft' : $(settings.contentID).outerWidth() + $(settings.contentID).offset.left,
         'stickyTop2' : $(this).offset().top,
         'stickyHeight' : $(this).outerHeight(true),
         'contentHeight' : $(settings.contentID).outerHeight(true),
         'win' : $(window),
         'breakPoint' : $(this).outerWidth(true) + $(settings.contentID).outerWidth(true),
         'marg' : parseInt($(this).css('margin-top'), 10)
      };

      checkSettings();
      if(ieVersion()) {
          return;
        }
      return this.each(function() {
        sticky.el.css('left', sticky.stickyLeft);

        sticky.win.scroll(function() {
          stick();
        });

        sticky.win.resize(function() {
          sticky.el.css('left', sticky.stickyLeft);
          stick();
        });
      });

      function stick() {
            var limit = $(settings.footerID).offset().top - sticky.stickyHeight;
            var windowTop = sticky.win.scrollTop();
            var stickyTop = sticky.stickyTop2 - sticky.marg;
            if (stickyTop < windowTop && (sticky.win.width() >= sticky.breakPoint)) {
              sticky.el.css({
                position: 'fixed',
                top: 0
              });
              if (settings.orientation === "left") {
                $(settings.contentID).css('margin-left', sticky.el.outerWidth(true));
              } else {
                sticky.el.css('margin-left', $(settings.contentID).outerWidth(true));
              }
            } else {
              sticky.el.css('position', 'static');
              $(settings.contentID).css('margin-left', '0px');
              sticky.el.css('margin-left', '0px');
            }
            if (limit < windowTop) {
              var diff = limit - windowTop;
              sticky.el.css({
                top: diff
              });
            }
          }
        function checkSettings() {
          var errors = [];
          for (var key in settings) {
            if (!settings[key]) {
              console.warn(key + ": cannot be null. Please consult http://mojotech.com/mojosticky for instructions. Terminating.");
              errors.push(settings[key]);
              return;
            }
          }
        }
        function ieVersion()
        {
          var rv = -1;
          if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null){
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