/**
 * Created by vijay on 16-01-2016.
 */
var Todo = angular.module('todo',[]);

Todo.controller('mainController',function($scope,$http){
    $scope.formData = {};

    $http.get('/api/todos').success(function(data){
        $scope.todos = data;
        console.log(data);
    }).error(function(error){
        console.log('Error:' + error);
    });

    $scope.createTodo = function(){
        $http.post('api/todos',$scope.formData)
            .success(function(data){
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            }).error(function(error){
            console.log('Error:' + error);
        });
    };

    $scope.deleteTodo = function(id){
        console.log('id:'+id);
        $http.post('api/todos/' + id)
            .success(function(data){
                $scope.todos = data;
                console.log(data);
            }).error(function(error){
            console.log('Error:'+error);
        });
    };
});