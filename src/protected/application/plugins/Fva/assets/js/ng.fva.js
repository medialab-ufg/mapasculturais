"use strict";

var fva = angular.module("ng.fva", ['ui.router', 'ngAnimate', 'ui.mask']);

fva.controller('termoCompromissoCtrl', ['$scope', '$state', 'fvaQuestions', function($scope, $state, fvaQuestions){
    $scope.condicao = fvaQuestions.termosCompromisso;
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

fva.controller('introCtrl', ['$scope', '$state', 'fvaQuestions', 'questionValidator', function($scope, $state, fvaQuestions, questionValidator){
    $scope.firstTime = fvaQuestions.introducao.jaParticipouFVA;
    $scope.questionFirstTime = fvaQuestions.introducao.jaParticipouFVA.label;
    $scope.questionarioJaParticipou = fvaQuestions.introducao.questionarioJaParticipou;
    $scope.questionarioNaoParticipou = fvaQuestions.introducao.questionarioNaoParticipou;
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

fva.controller('responsavelCtrl', ['$scope', '$state', 'fvaQuestions', 'questionValidator', function($scope, $state, fvaQuestions, questionValidator){
    $scope.dadosResponsavel = fvaQuestions.responsavel;

    $scope.validateResponsavel = function(){
        $scope.displayNameWarning = $scope.dadosResponsavel.nome.answer === '' ? true : false;
        $scope.displayEmailWarning = questionValidator.validateEmail($scope.dadosResponsavel.email.answer);
        $scope.displayTelWarning = $scope.dadosResponsavel.telefone.answer === '' ? true : false;

        if($scope.displayNameWarning === false && $scope.displayEmailWarning === false && $scope.displayTelWarning === false){
            $state.go('visitacao');
        }
    }
}]);

fva.controller('visitacaoCtrl', ['$scope', '$state', 'fvaQuestions', 'questionValidator', function($scope, $state, fvaQuestions, questionValidator){
    $scope.dadosVisitacao = fvaQuestions.visitacao;

    $scope.validateVisitacao = function(){
        $scope.displayTecnicaContagemWarning = questionValidator.multiplaEscolha($scope.dadosVisitacao.tecnicaContagem) === true ? false : true;
        $scope.displayTotalVisitasWarning = $scope.dadosVisitacao.quantitativo.answer === '' ? true : false;

        if($scope.displayTecnicaContagemWarning === false && $scope.displayTotalVisitasWarning === false){
            $state.go('avaliacao');
        }
    }
}]);

fva.controller('avaliacaoCtrl', ['$scope', '$state', 'fvaQuestions', 'questionValidator', function($scope, $state, fvaQuestions, questionValidator){
    $scope.dadosAvaliacao = fvaQuestions.avaliacao;

    $scope.validateVisitacao = function(){
        $scope.displayMidiaWarning = questionValidator.multiplaEscolha($scope.dadosAvaliacao.midias) === true ? false : true;

        console.log(fvaQuestions);
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
    .state('visitacao', {
        templateUrl : pluginTemplatePath + '/visitacao.html'
    })
    .state('avaliacao', {
        templateUrl : pluginTemplatePath + '/avaliacao.html'
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

    this.validateEmail = function(email){
        let filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return !filter.test(email);
    }
});

fva.factory('fvaQuestions', function(){
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
                naosabia: {
                    label: 'Não sabíamos da iniciativa',
                    answer: false
                },
                prazo: {
                    label: 'Perdemos o prazo de participação',
                    answer: false
                },
                informacao: {
                    label: 'Não tínhamos as informações solicitadas',
                    answer: false
                },
                naorealizava: {
                    label: 'Não realizávamos a contagem',
                    answer: false
                },
                seminternet: {
                    label: 'Dificuldade de acesso à internet',
                    answer: false
                },
                outros: {
                    label: 'Outros',
                    answer: false,
                    text: ''
                }
            },
            questionarioNaoParticipou: {
                ed2014: {
                    label: 'FVA 2014 - aplicação ocorrida em 2015 referente à visitação anual ao Museu em 2014',
                    answer: false
                },
                ed2015: {
                    label: 'FVA 2015 - aplicação ocorrida em 2016 referente à visitação anual ao Museu em 2015',
                    answer: false
                },
                ed2016: {
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
        visitacao: {
            realizaContagem: {
                label: 'A Instituição realiza contagem de público (visitação/visita)?',
                answer: null
            },
            tecnicaContagem: {
                assinatura: {
                    label: 'Livro de assinatura',
                    answer: false
                },
                catraca: {
                    label: 'Roleta/Catraca',
                    answer: false
                },
                ingresso: {
                    label: 'Ingresso contabilizado',
                    answer: false
                },
                contador: {
                    label: 'Contador manual',
                    answer: false
                },
                sensor: {
                    label: 'Sensor eletrônico',
                    answer: false
                },
                formulario: {
                    label: 'Formulário',
                    answer: false
                },
                lista: {
                    label: 'Lista de presença em atividades do museu',
                    answer: false
                },
                outros: {
                    label: 'Outros',
                    answer: false,
                    text: ''
                }
            },
            quantitativo: {
                label: 'Quantitativo total de visitações/visitas no ano referência (2016)',
                answer: ''
            },
            observacoes: {
                label: 'Observações sobre a visitação no ano de referência (2016)',
                answer: ''
            }
        },
        avaliacao: {
            midias:{
                correspondencia: {
                    label: "Correspondência enviada pelo IBRAM",
                    answer: false
                },
                portal: {
                    label: "Portal do IBRAM",
                    answer: false
                },
                socialmedia: {
                    label: "Redes sociais do IBRAM",
                    answer: false
                },
                telefone: {
                    label: "Contato telefônico com o IBRAM",
                    answer: false
                },
                revista: {
                    label: "Revista",
                    answer: false
                },
                jornal: {
                    label: "Jornal",
                    answer: false
                },
                radio: {
                    label: "Rádio",
                    answer: false
                },
                televisao: {
                    label: "Televisão",
                    answer: false
                },
                cartaz: {
                    label: "Cartaz",
                    answer: false
                },
                folder: {
                    label: "Folder/Panfleto(flyer)",
                    answer: false
                },
                internet: {
                    label: "Internet",
                    answer: false
                },
                terceiros: {
                    label: "Terceiros(colegas de trabalho, amigos, etc)",
                    answer: false
                },
                redes: {
                    label: "Redes sociais(Instagram, Facebook, Twitter, Google+, Youtube, etc.)",
                    answer: false
                },
                outros: {
                    label: "Outros",
                    answer: false,
                    text: ''
                }
            },
            opiniao: {
                label: "Gostaríamos de saber sua opinião sobre o nosso questionário. Registre neste espaço as informações faltantes que você considera" +
                       "pertinentes e deixe também comentários/sugestões/críticas para aprimorarmos o Formulário de Visitação Anual em suas próximas edições",
                answer: ''
            }
        }
    }
});