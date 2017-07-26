"use strict";

var fva = angular.module("ng.fva", ['ui.router', 'ngAnimate']);

fva.controller('termoCompromissoCtrl', ['$scope', '$state', 'surveyQuestions', function($scope, $state, surveyQuestions){
    $scope.condicao = surveyQuestions.termosCompromisso;
    $scope.displayAlertaTermoCompromisso = false;

    $scope.validateTermos = function(){
        if($scope.condicao.ciente){
            $state.go('intro');
        }
        else{
            $scope.displayAlertaTermoCompromisso = true;
        }
    }
}]);

fva.controller('introCtrl', ['$scope', '$state', 'surveyQuestions', 'questionValidator', function($scope, $state, surveyQuestions, questionValidator){
    $scope.firstTime = surveyQuestions.introducao.jaParticipouFVA;
    $scope.questionFirstTime = surveyQuestions.introducao.jaParticipouFVA.label;
    $scope.questionarioJaParticipou = surveyQuestions.introducao.questionarioJaParticipou;
    $scope.questionarioNaoParticipou = surveyQuestions.introducao.questionarioNaoParticipou;
    $scope.displayFirstTimeSurveyWarning = false;
    $scope.displayNotFirstTimeSurveyWarning = false;

    //Checa se não foi deixado resposta em branco e exibe a respectiva mensagem de alerta
    $scope.validateIntro = function(){
        $scope.displayFirstTimeSurveyWarning = questionValidator.multiplaEscolha($scope.questionarioJaParticipou) === true ? false : true;
        $scope.displayNotFirstTimeSurveyWarning = questionValidator.multiplaEscolha($scope.questionarioNaoParticipou) === true ? false : true;

        if($scope.firstTime && $scope.displayFirstTimeSurveyWarning === false || $scope.firstTime === false && $scope.displayNotFirstTimeSurveyWarning === false){
            $state.go('responsavel');
        }
    }
}]);

fva.controller('responsavelCtrl', ['$scope', 'surveyQuestions, questionValidator', function($scope, surveyQuestions, questionValidator){
    $scope.dadosResponsavel = surveyQuestions.responsavel;

    $scope.validateResponsavel = function(){

    }
}]);

fva.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    let pluginTemplatePath = '/protected/application/plugins/Fva/assets/partials';
    $urlRouterProvider.otherwise("/")

    $stateProvider
    .state('/', {
        url: "/",
        templateUrl : pluginTemplatePath + '/index.html'
    })
    .state('termo-compromisso', {
        templateUrl : pluginTemplatePath + '/termo-compromisso.html'
    })
    .state('intro', {
        templateUrl : pluginTemplatePath + '/intro.html'
    })
    .state('responsavel', {
        templateUrl : pluginTemplatePath + '/responsavel.html'
    })
}]);

fva.service('questionValidator', function(){
    this.multiplaEscolha = function(questionario){
        let hasCheckedAnswer = false;
        
        Object.keys(questionario).forEach(function(k){
            if(questionario[k].answer === true){
                hasCheckedAnswer = true;
            }
        });
        
        return hasCheckedAnswer;
    }

    this.email = function(email){
        let filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return filter.test(email);
    }
});

fva.factory('surveyQuestions', function(){
    return {
        termosCompromisso: {
            ciente: false
        },
        introducao: {
            jaParticipouFVA: {
                label: 'É a primeira vez que o Museu participa do levantamento do Formulário de Visitação Anual?',
                answer: null
            },
            questionarioJaParticipou: {
                primeira: {
                    label: 'Não sabíamos da iniciativa',
                    answer: false
                },
                segunda: {
                    label: 'Perdemos o prazo de participação',
                    answer: false
                },
                terceira: {
                    label: 'Não tínhamos as informações solicitadas',
                    answer: false
                },
                quarta: {
                    label: 'Não realizávamos a contagem',
                    answer: false
                },
                quinta: {
                    label: 'Dificuldade de acesso à internet',
                    answer: false
                },
                sexta: {
                    label: 'Outros',
                    answer: false
                }
            },
            questionarioNaoParticipou: {
                primeira: {
                    label: 'FVA 2014 - aplicação ocorrida em 2015 referente à visitação anual ao Museu em 2014',
                    answer: false
                },
                segunda: {
                    label: 'FVA 2015 - aplicação ocorrida em 2016 referente à visitação anual ao Museu em 2015',
                    answer: false
                },
                terceira: {
                    label: 'FVA 2016 - aplicação ocorrida em 2017 referente à visitação anual ao Museu em 2016',
                    answer: false
                }
            }
        },
        responsavel: {
            nome: {
                label: 'Nome do RESPONSÁVEL pelo preenchimento do FVA 2017',
                answer: ''
            },
            telefone: {
                label: 'Telefone para contato com o RESPONSÁVEL pelo preenchimento do FVA 2017',
                answer: ''
            },
            email: {
                label: 'E-mail do RESPONSÁVEL pelo preenchimento do FVA 2017',
                answer: ''
            }
        },
        dadosVisitacao: {
            primeira: {
                label: 'A Instituição realiza contagem de público (visitação/visita)?'
            }
        }
    }
});