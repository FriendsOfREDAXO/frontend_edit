<?php

/**
 * frontend_edit Addon.
 *
 * @author Friends Of REDAXO
 *
 * @var rex_addon
 */
if (!rex::isBackend() && ($user = rex_backend_login::createUser()) && $user->isAdmin()) {

    rex_extension::register('PACKAGES_INCLUDED', array('frontend_edit', 'init'), rex_extension::LATE);

    rex_extension::register('ART_INIT', function (rex_extension_point $ep) {
        $article = $ep->getParam('article');
        //$article->setSliceRevision($version);
        if ($article instanceof rex_article_content) {
            $article->getContentAsQuery();
        }
        $article->setEval(true);
    });

    rex_extension::register('OUTPUT_FILTER', ['frontend_edit', 'outputFilter'], rex_extension::LATE);
}
