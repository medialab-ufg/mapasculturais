<?php
namespace Fva;

use MapasCulturais\app;

/**
 * Plugin que permite um museu adicionar a 
 * URL de seu repositório no Tainacan
 */
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
            $app->view->enqueueScript('app', 'ng.fva', 'js/ng.fva.js');
            $app->view->jsObject['angularAppDependencies'][] = 'ng.fva';
        });
    }

    public function register() {
        $app = App::i();
        $app->view->registerSpaceMetadata('tainacan_url', array(
            'label' => 'Link do Repositório Tainacan',
            'type' => 'string',
            'validations' => [
                'v::url()' => 'URL inválida'
            ]
        ));
    }
}