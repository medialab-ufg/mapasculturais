<?php
namespace Fva;

use MapasCulturais\app;
use MapasCulturais\Entities;

class Plugin extends \MapasCulturais\Plugin {

    public function _init() {
        $app = App::i();
        
        $app->hook('template(space.single.tabs):end', function(){
            $this->part('fva-tab');
        });

        $app->hook('template(space.single.tabs-content):end', function() use($app){
            $this->part('fva-form');
        });
        
        $app->hook('mapasculturais.head', function() use($app){
            $app->view->enqueueScript('app', 'angular-ui-mask', 'js/mask.js');
            $app->view->enqueueScript('app', 'angular-ui-router', 'js/angular-ui-router.min.js');
            $app->view->enqueueScript('app', 'ng.fva', 'js/ng.fva.js');
            $app->view->enqueueStyle('app', 'fva.css', 'css/fva.css');
            $app->view->jsObject['angularAppDependencies'][] = 'ng.fva';
        });

        $app->hook('POST(space.fvaSave)', function () use($app){
            $spaceEntity = $app->view->controller->requestedEntity;
            $fvaQuestions = json_encode($this->postData, true);
            
            $spaceMeta = new Entities\SpaceMeta;
            $spaceMeta->key = 'fva' + \date('Y'); //Gera a chave do metadado de acordo com o ano corrente
            $spaceMeta->value = $fvaQuestions;
            $spaceMeta->owner = $spaceEntity;

            $app->em->persist($spaceMeta);
            
            $spaceMeta->save(true);
            
        });
    }

    public function register() {
        
    }
}