<?php
namespace Fvm;

use MapasCulturais\app;

/**
 * Plugin que permite um museu adicionar a 
 * URL de seu repositório no Tainacan
 */
class Plugin extends \MapasCulturais\Plugin {

    public function _init() {
        $app = App::i();
        
        $app->hook('template(space.<<create|edit|single>>.tabs):end', function(){
            $this->part('fvm-tab');
        });

        $app->hook('template(<<agent|space|project>>.single.tabs-content):end', function() use($app){
            $spaceEntity = $app->view->controller->requestedEntity;
            $this->part('fvm-form', ['entity' => $spaceEntity]);
        });

        $app->hook('view.render(<<agent|space|project>>/single):before', function() use ($app) {
            $app->view->enqueueScript('app', 'ng.fvm', 'js/ng.fvm.js', array('mapasculturais'));
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