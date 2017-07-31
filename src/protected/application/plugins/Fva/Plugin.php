<?php
namespace Fva;

use MapasCulturais\app;

class Plugin extends \MapasCulturais\Plugin {

    public function _init() {
        $app = App::i();
        
        $app->hook('template(space.single.tabs):end', function(){
            $this->part('fva-tab');
        });

        $app->hook('template(space.single.tabs-content):end', function() use($app){
            $spaceEntity = $app->view->controller->requestedEntity;
            $this->part('fva-form', ['entity' => $spaceEntity]);
        });
        
        $app->hook('mapasculturais.head', function() use($app){
            $app->view->enqueueScript('app', 'angular-ui-mask', 'js/mask.js');
            $app->view->enqueueScript('app', 'angular-ui-router', 'js/angular-ui-router.min.js');
            $app->view->enqueueScript('app', 'ng.fva', 'js/ng.fva.js');
            $app->view->enqueueStyle('app', 'fva.css', 'css/fva.css');
            $app->view->jsObject['angularAppDependencies'][] = 'ng.fva';
        });
    }

    public function register() {
        
    }
}