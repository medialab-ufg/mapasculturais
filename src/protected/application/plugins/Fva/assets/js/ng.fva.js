"use strict";

var fva = angular.module("ng.fva", ['ui.router', 'ui.mask']);

//Controller definido em fva-form que faz o roteamento entre um novo questionário ou exibir um questionário já respondido
fva.controller('rootController', ['$scope', '$rootScope', '$state', 'fvaQuestions', function($scope, $rootScope, $state, fvaQuestions){
    
    if(MapasCulturais.hasOwnProperty('respondido')){
        $scope.$root.respostas = angular.fromJson(MapasCulturais.respondido);
        $scope.respostas = fvaQuestions;
        
        $state.go('revisao');
    }
    else{
        $state.go('index');
    }
}]);

fva.controller('indexCtrl', ['$scope', '$state', function($scope, $state){
    $scope.beginFva = function(){
        $state.go('termo-compromisso');
    }
}]);

fva.controller('termoCompromissoCtrl', ['$scope', '$state', 'fvaQuestions', function ($scope, $state, fvaQuestions) {
    $scope.condicao = fvaQuestions.termosCompromisso;
    $scope.displayAlertaTermoCompromisso = false;
    
    $scope.validateTermos = function () {
        if ($scope.condicao.ciente) {
            $state.go('intro');
        }
        else {
            $scope.displayAlertaTermoCompromisso = true;
        }
    }
}]);

fva.controller('introCtrl', ['$scope', '$state', 'fvaQuestions', 'questionValidator', function ($scope, $state, fvaQuestions, questionValidator) {
    $scope.dadosIntro = fvaQuestions.introducao;

    //Checa se não foi deixado resposta em branco e exibe a respectiva mensagem de alerta
    $scope.validateIntro = function () {
        let isValid = false;

        //faz a validação de acordo com as informações que estão sendo exibidas na tela
        if ($scope.dadosIntro.jaParticipouFVA.answer) {
            $scope.displayFirstTimeSurveyWarning = questionValidator.multiplaEscolha($scope.dadosIntro.questionarioJaParticipou.motivos, $scope.dadosIntro.questionarioJaParticipouOutros);
            isValid = !$scope.displayFirstTimeSurveyWarning;
        }
        else {
            $scope.displayNotFirstTimeSurveyWarning = questionValidator.multiplaEscolha($scope.dadosIntro.questionarioNaoParticipou.edicoes);
            isValid = !$scope.displayNotFirstTimeSurveyWarning;
        }

        if (isValid) {
            $state.go('responsavel');
        }
    }
}]);

fva.controller('responsavelCtrl', ['$scope', '$state', 'fvaQuestions', 'questionValidator', function ($scope, $state, fvaQuestions, questionValidator) {
    $scope.dadosResponsavel = fvaQuestions.responsavel;

    $scope.validateResponsavel = function () {
        $scope.displayNameWarning = $scope.dadosResponsavel.nome.answer === '' ? true : false;
        $scope.displayEmailWarning = questionValidator.validateEmail($scope.dadosResponsavel.email.answer);
        $scope.displayTelWarning = $scope.dadosResponsavel.telefone.answer === '' ? true : false;

        if ($scope.displayNameWarning === false && $scope.displayEmailWarning === false && $scope.displayTelWarning === false) {
            $state.go('visitacao');
        }
    }
}]);

fva.controller('visitacaoCtrl', ['$scope', '$state', 'fvaQuestions', 'questionValidator', function ($scope, $state, fvaQuestions, questionValidator) {
    $scope.dadosVisitacao = fvaQuestions.visitacao;

    $scope.validateVisitacao = function () {
        let isValid = false;

        if ($scope.dadosVisitacao.realizaContagem.answer) {
            $scope.displayTecnicaContagemWarning = questionValidator.multiplaEscolha($scope.dadosVisitacao.tecnicaContagem, $scope.dadosVisitacao.tecnicaContagemOutros);
            $scope.displayTotalVisitasWarning = $scope.dadosVisitacao.quantitativo.answer === '' ? true : false;

            if ($scope.displayTecnicaContagemWarning === false && $scope.displayTotalVisitasWarning === false) {
                isValid = true;
            }
        }
        else {
            //nenhuma validação é necessária
            isValid = true;
        }
        
        if (isValid) {
            $state.go('avaliacao');
        }
    }
}]);

fva.controller('avaliacaoCtrl', ['$scope', '$state', 'fvaQuestions', 'questionValidator', 'saveFvaQuestions', function ($scope, $state, fvaQuestions, questionValidator, saveFvaQuestions) {
    $scope.dadosAvaliacao = fvaQuestions.avaliacao;
    
    $scope.validateAvaliacao = function () {
        let isValid = false;
        $scope.displayMidiaWarning = questionValidator.multiplaEscolha($scope.dadosAvaliacao.midias, $scope.dadosAvaliacao.midiasOutros);
        isValid = !$scope.displayMidiaWarning;
        
        if (isValid) {
            $scope.saveQuestionario = saveFvaQuestions.save();
            
            if($scope.saveQuestionario === true){
                $state.go('revisao');
            }
        }
    }
}]);

fva.controller('revisaoCtrl', ['$scope','$rootScope', 'fvaQuestions', function ($scope, $rootScope, fvaQuestions) {
    if($scope.$root.respostas){
        $scope.respostasFVA = $scope.$root.respostas;
    }
    else{
        $scope.respostasFVA = fvaQuestions;
    }
}]);

fva.config(['$stateProvider', function ($stateProvider) {
    const pluginTemplatePath = '/protected/application/plugins/Fva/assets/partials';

    $stateProvider
        .state('index', {
            controller: 'indexCtrl',
            templateUrl: pluginTemplatePath + '/index.html'
        })
        .state('termo-compromisso', {
            controller: 'termoCompromissoCtrl',
            templateUrl: pluginTemplatePath + '/termo-compromisso.html'
        })
        .state('intro', {
            controller: 'introCtrl',
            templateUrl: pluginTemplatePath + '/intro.html'
        })
        .state('responsavel', {
            controller: 'responsavelCtrl',
            templateUrl: pluginTemplatePath + '/responsavel.html'
        })
        .state('visitacao', {
            controller: 'visitacaoCtrl',
            templateUrl: pluginTemplatePath + '/visitacao.html'
        })
        .state('avaliacao', {
            controller: 'avaliacaoCtrl',
            templateUrl: pluginTemplatePath + '/avaliacao.html'
        })
        .state('revisao', {
            controller: 'revisaoCtrl',
            templateUrl: pluginTemplatePath + '/revisao.html'
        })
}]);

fva.service('questionValidator', function () {
    //valida se pelo menos uma opçao da multipla escolha foi selecionado
    this.multiplaEscolha = function (questionario, outros) {
        let hasErrors = true;

        Object.keys(questionario).forEach(function (k) {
            if (questionario[k].answer === true) {
                hasErrors = false;
            }
        });

        //valida o campo 'Outros' que é opcional
        if (outros !== undefined) {
            if (outros.answer && outros.text.length == 0) {
                hasErrors = true;
            }
            else if (outros.answer && outros.text.length > 0) {
                hasErrors = false;
            }
        }

        return hasErrors;
    }

    //Se o campo outros estiver marcado mas não tiver texto, retorna true
    this.validaOutros = function (outros) {
        return outros.answer && outros.text.length == 0 ? true : false;
    }

    this.validateEmail = function (email) {
        let filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return !filter.test(email);
    }
});

fva.service('saveFvaQuestions', ['$http', '$state', 'fvaQuestions', function($http, $state, fvaQuestions){
    this.save = function(){
        $http.post(MapasCulturais.createUrl('space', 'fvaSave', [MapasCulturais.entity.id]), angular.toJson(fvaQuestions)).then(function successCallback(response){
            $state.go('revisao');
        });
    }
}]);

fva.factory('fvaQuestions', function () {
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
                label: 'Indique o(s) motivo(s) para a NÃO participação nas edições anteriores',
                motivos: {
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
                    }
                }
            },
            questionarioJaParticipouOutros: {
                label: 'Outros',
                answer: false,
                text: ''
            },
            questionarioNaoParticipou: {
                label: "Quais edições do FVA o Museu já participou?",
                edicoes: {
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
                }
            },
            tecnicaContagemOutros: {
                label: 'Outros',
                answer: false,
                text: ''
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
            midias: {
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
                }
            },
            midiasOutros: {
                label: "Outros",
                answer: false,
                text: ''
            },
            opiniao: {
                label: "Gostaríamos de saber sua opinião sobre o nosso questionário. Registre neste espaço as informações faltantes que você considera" +
                "pertinentes e deixe também comentários/sugestões/críticas para aprimorarmos o Formulário de Visitação Anual em suas próximas edições",
                text: ''
            }
        }
    }
});