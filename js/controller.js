angular.module('app').controller('Index_Ctrl', 
  ['$scope','$log', function($scope, $log){
     $scope.template_url = 'templates/index_ctrl.html';
     $scope.dump_list =  [
      {id:1,name:"One"},
      {id:2,name:"Two"},
      {id:3,name:"Three"},
      {id:4,name:"Four"},
      {id:5,name:"Five"},
      {id:6,name:"Six"},
      {id:7,name:"Seven"},
      {id:8,name:"Eight"},
      {id:9,name:"Nine"}
    ];

    /** BEGIN SELECT TAG 1 **/
    $scope.select_tags_1 = [];

    $scope.tags_1_options = {
      id:"id",
      label:"name"
    };

    $scope.tags_1_resouce = function( term, response ){
      //No filter
      return response( $scope.dump_list );
    }
    /** END SELECT TAG 1 **/

    /** BEGIN SELECT TAG 2 **/
    //with init data
    $scope.select_tags_2 = [{id:3, name:"Three"}];

    $scope.tags_2_resouce = function( term, response ){
      //No filter
      term = term.toLowerCase();
      var return_list = [];
      for(var i=0; i < $scope.dump_list.length; i++ ){
        if ($scope.dump_list[i].name.toLowerCase().indexOf( term ) != -1 ){
          return_list.push( $scope.dump_list[i] );
        }
      }
      return response( return_list );
    }
    /** END SELECT TAG 2 **/
  }
]);
