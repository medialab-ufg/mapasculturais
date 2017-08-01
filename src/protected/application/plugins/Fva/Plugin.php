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
            $spaceEntity = $app->view->controller->requestedEntity;

            if($spaceEntity){
                $questionarioRespondido = $this->checkCurrentFva($spaceEntity);

            }
            
            if(!empty($questionarioRespondido)){
                $app->view->jsObject['respondido'] = $questionarioRespondido;
            }

            //$app->view->jsObject['respondido'] = $spaceEntity->metadata['fva2017'];
            $app->view->enqueueScript('app', 'angular-ui-mask', 'js/mask.js');
            $app->view->enqueueScript('app', 'angular-ui-router', 'js/angular-ui-router.min.js');
            $app->view->enqueueScript('app', 'ng.fva', 'js/ng.fva.js');
            $app->view->enqueueStyle('app', 'fva.css', 'css/fva.css');
            
            $app->view->jsObject['angularAppDependencies'][] = 'ng.fva';
        });

        $app->hook('POST(space.fvaSave)', function () use($app){
            $spaceEntity = $app->view->controller->requestedEntity;
            $fvaQuestions = json_encode($this->postData);
            \dump($POST);die;
            $spaceMeta = new Entities\SpaceMeta;
            $fvaCorrente = $this->getCurrentFva();
            
            $spaceMeta->key = 'fva2017'; //Gera a chave do metadado de acordo com o ano corrente
            $spaceMeta->value = $fvaQuestions;
            $spaceMeta->owner = $spaceEntity;

            $app->em->persist($spaceMeta);
            
            $spaceMeta->save(true);
            
        });
    }

    /**
     * Verifica se o questionário atual já foi respondido
     * e o retorna, senão retorna false
     *
     * @param obj $spaceEntity
     * @return bool
     */
    private function checkCurrentFva($spaceEntity){
        $ano = \date('Y');
        $fvaCorrente = $this->getCurrentFva();
        
        if(array_key_exists($fvaCorrente, $spaceEntity->metadata)){
            return $spaceEntity->metadata[$fvaCorrente];
        }
        else{
            return false;
        }
    }

    /**
     * Get do Fva do ano corrente
     *
     * @return string
     */
    private function getCurrentFva(){
        $ano = \date('Y');
        $currentFva = "fva$ano";
        
        return $currentFva;
    }

    public function register() {
        
    }
}