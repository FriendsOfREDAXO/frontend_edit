<?php

/**
 * frontend_edit class.
 */
class frontend_edit extends frontend_edit_abstract
{
    /**
     * Initializes the addon.
     *
     * @param rex_extension_point $ep
     */
    public static function init(rex_extension_point $ep)
    {
        if (!rex::isBackend()) {
            // things to do in frontend
            rex_extension::register('SLICE_SHOW', array('frontend_edit', 'showSlice'), rex_extension::EARLY);
        }
    }

    /**
     * @param rex_extension_point $ep
     *
     * @return string slice content
     */
    public static function showSlice(rex_extension_point $ep)
    {
        $subject = $ep->getSubject();
        $params = $ep->getParams();

        $module = rex_sql::factory();
        $module->setQuery('SELECT name FROM ' . rex::getTable('module') . ' WHERE id = ' . $params['module_id']);
        $slice_content = '<rex-frontend-edit><rex-frontend-edit-content><a href="#edit">Slice: <strong>' . $module->getValue('name') . '</strong> bearbeiten</a></rex-frontend-edit-content></rex-frontend-edit>'.$subject;

        $ep->setSubject(trim($slice_content));
    }

    public static function outputFilter(rex_extension_point $ep)
    {
        $content = $ep->getSubject();

        // CSS-First in den head einbinden
        $before_head = '<style type="text/css">' . rex_file::getOutput(__DIR__.'/../assets/css/frontend_edit.css') . '</style>';
        $content = str_replace('</head>', $before_head . '</head>', $content);

        $before_body= '<script type="text/javascript">
            var jqueryPath = "https://code.jquery.com/jquery-3.1.1.min.js";
            ' . rex_file::getOutput(__DIR__.'/../assets/js/frontend_edit.js') . '
        </script>';
        $content = str_replace('</body>', $before_body . '</body>', $content);

        return $content;
    }
}
