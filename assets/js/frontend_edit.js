var frontend_edit = frontend_edit || {};

frontend_edit = {
    init: function() {
        this.checkForJquery(jqueryPath, function() {
            console.info('Frontend Editor is ready');
            frontend_edit.ready();
        });
    },

    ready: function() {
        this.createElements();
        this.setupFrontend();
        this.setupListener();
    },

    checkForJquery: function(url, callback) {
        if (typeof jQuery != 'undefined') {
            console.info('jQuery already available, skip loading!');
            callback();
        } else {

            console.info('WILL TRY TO LOAD LOAD JQUERY');

            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onreadystatechange = callback;
            script.onload = callback;

            // Fire the loading
            head.appendChild(script);

        }
    },

    createElements: function() {
        document.createElement('rex-frontend-edit');
        document.createElement('rex-frontend-edit-toolbar');
        document.createElement('rex-frontend-edit-inner');
        document.createElement('rex-frontend-edit-elements');
    },

    debounce: function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    setupFrontend: function() {
        $('rex-frontend-edit').each(function(index) {

            if(!$(this).hasClass('initialized')) {
                $(this).addClass('initialized');
            }
            var editableElement = $(this).nextAll(':not(rex-frontend-edit):visible:first').children(':first');
            var editableElementCenter = editableElement.height() / 2;

            /* TODO: need to discuss
            //var buttonPositionCentered = editableElement.offset().top + editableElementCenter - $(this).height();

            // element could be too high. If it's more then 300 px, we position it to the top
            if (buttonPositionCentered >= 300) {
                buttonPositionCentered = editableElement.offset().top > 50 ? editableElement.offset().top : 50;
            }
            */

            var buttonPositionCentered = editableElement.offset().top > 50 ? editableElement.offset().top : 50;

            if(editableElement == lastElement) {
                buttonPositionCentered = buttonPositionCentered + 50;
            }

            $(this).css({
                left: editableElement.offset().left,
                top: buttonPositionCentered
            });

            var lastElement = editableElement;

        });

        $('rex-frontend-edit + rex-frontend-edit').remove();

        if(!$('rex-frontend-edit-toolbar').length) {
            $('body').append('<rex-frontend-edit-toolbar />');

            $('rex-frontend-edit-toolbar').html(
                '<div class="rex-frontend-edit-toolbar-inner"> ' +
                '   <div class="rfe-title"><span>Frontend</span><span>Editor</span></div>' +
                '   <ul>' +
                '       <li class="rfe-toggle">Edit Buttons anzeigen</li>' +
                '       <li class="rfe-cache">Aktuelle Seite: Cache leeren</li>' +
                '       <li class="">Whatever</li>' +
                '   </ul>' +
                '</div>'
            );
        }
    },

    setupListener: function() {
        $(window).on('resize', function() {
            frontend_edit.setupFrontend();
        });

        var resizeFunctions = frontend_edit.debounce(function() {
            frontend_edit.setupFrontend();
        }, 250);

        $(window).on('resize', resizeFunctions);
        setTimeout(function() {
            $(window).trigger('resize');
        }, 1000);

        $(document).on('click', '.rfe-toggle', function() {
            $('rex-frontend-edit.initialized').toggleClass('rfe-buttons-visible');
        });
    }
};

document.addEventListener("DOMContentLoaded", function(event) {
    frontend_edit.init();
});
