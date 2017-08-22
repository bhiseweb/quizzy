(function () {
  'use strict';

  angular
    .module('articles')
    .controller('quizCtrl', QuizController);

  QuizController.$inject = ['quizMetrics', 'DataService', 'ArticlesService','$state'];

  function QuizController(quizMetrics, DataService, ArticlesService, $state) {


        var vm = this;

        vm.quizMetrics = quizMetrics; // Attaching the quizMetrics object to the view model
        vm.dataService = DataService;
        vm.questionAnswered = questionAnswered; // also a named function defined below
        vm.setActiveQuestion = setActiveQuestion; // setActiveQuestion is a named function below
        vm.selectAnswer = selectAnswer; // also a named function
        vm.finaliseAnswers = finaliseAnswers; //also a named function
        vm.activeQuestion = 0; // currently active question in the quiz
        vm.error = false; // error flag. Will be set when user tries to finish quiz with 
        vm.finalise = false; // finalise flag. Will be set to show prompt to end quiz with
                             // all questions answered

        var numQuestionsAnswered = 0; // This is not needed by the view so is only declared using var

        function setActiveQuestion(index){
            // no argument passed, data = undefined.
            if(index === undefined){
                var breakOut = false;

                
                var quizLength = DataService.quizQuestions.length - 1;

                
                while(!breakOut){
                    
                    vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;

                    if(vm.activeQuestion === 0){
                        vm.error = true;
                    }

                    if(DataService.quizQuestions[vm.activeQuestion].selected === null){
                        breakOut = true;
                    }
                }
            }else{
                // Data was passed into the function therefore
                // Set activeQuestion to the index of the button pressed
                vm.activeQuestion = index;
            }

        }

        
        function questionAnswered(){
           
            var quizLength = DataService.quizQuestions.length;
            
            numQuestionsAnswered = 0;
            
            for(var x = 0; x < quizLength; x++){
                if(DataService.quizQuestions[vm.activeQuestion].selected !== null){
                    numQuestionsAnswered++;
                    if(numQuestionsAnswered >= quizLength){
                    
                        for(var i = 0; i < quizLength; i++){
                           
                            if(DataService.quizQuestions[i].selected === null){
                                setActiveQuestion(i);
                                return;
                            }
                        }
                     
                        vm.error = false;
                        vm.finalise = true;
                        return;
                    }
                }
            }

            vm.setActiveQuestion();
        }

        
        function selectAnswer(index){
            DataService.quizQuestions[vm.activeQuestion].selected = index;
        }

        
        function finaliseAnswers(){
            vm.finalise = false;
            numQuestionsAnswered = 0;
            vm.activeQuestion = 0;
            quizMetrics.markQuiz();
            quizMetrics.changeState("quiz", false);
            quizMetrics.changeState("results", true);
        }




    }
}());
