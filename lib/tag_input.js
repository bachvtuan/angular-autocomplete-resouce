/*
 source from  http://codepen.io/webmatze/pen/isuHh
 Edit by bvtuan
*/

app.directive('tagInput', function() {
    return {
        restrict: 'E',
        scope: {
            inputTags: '=taglist',
            autocomplete: '=autocomplete',
            tagOptions: '=tagoptions'
            
            //search: '=search'
        },
        link: function($scope, element, attrs) {
            $scope.defaultWidth = 200;
            $scope.tagText = '';
            $scope.tagItem = null;
            $scope.placeholder = attrs.placeholder;

            var id_item = $scope.tagOptions.id;
            var label_item = $scope.tagOptions.label;

            if ($scope.autocomplete) {

                $scope.autocompleteFocus = function(event, ui) {
                    $(element).find('input').val(ui.item.value);
                    return false;
                };

                $scope.autocompleteSelect = function(event, ui) {
                    console.log("ui.item",ui.item);
                    $scope.$apply( function(){
                        $scope.tagItem = ui.item;
                    });
                    //$scope.$apply('tagText=\'' + ui.item.name + '\'');
                    $scope.$apply('addTag()');
                    return false;
                };

                $(element).find('input').autocomplete({
                    //source: $scope.search,
                    minLength: $scope.tagOptions.minLength ? $scope.tagOptions.minLength :  2,
                    //minLength: 0,
                    source: function(request, response) {
                        $scope.autocomplete( request.term, response );
                    },
                    focus: function(_this) {
                        return function(event, ui) {
                            return $scope.autocompleteFocus(event, ui);
                        };
                    }(this),
                    select: function(_this) {
                        return function(event, ui) {
                            return $scope.autocompleteSelect(event, ui);
                        };
                    }(this)
                }).autocomplete( "instance" )._renderItem = function( ul, item ) {
                  return $( "<li>" )
                    .attr( "data-value", item[ $scope.tagOptions.id ])
                    .append( item[ $scope.tagOptions.label ] )
                    .appendTo( ul );
                };

            }
            
            $scope.addTag = function() {

                if ( ! $scope.tagItem ) {
                    return;
                }

                if ( $scope.tagOptions && $scope.tagOptions.max_entries && $scope.tagOptions.max_entries <= $scope.inputTags.length  ){
                    //exceed maximum entries allowed
                    return;
                }

                console.log("$scope.tagItem", $scope.tagItem);
                $scope.inputTags.push( angular.copy($scope.tagItem) );
                console.log("$scope.inputTags", $scope.inputTags);
                return $scope.tagText = '';
            };

            $scope.deleteTag = function(key) {
                
                
                if ($scope.inputTags.length > 0 && $scope.tagText.length === 0 && key === undefined) {
                    $scope.inputTags.pop();
                } else {
                    if (key !== undefined) {
                        $scope.inputTags.splice(key, 1);
                    }
                }
                return $scope.inputTags;
            };

            $scope.$watch('tagText', function(newVal, oldVal) {
                var tempEl;
                if (!(newVal === oldVal && newVal === undefined)) {
                    tempEl = $('<span>' + newVal + '</span>').appendTo('body');
                    $scope.inputWidth = tempEl.width() + 5;
                    if ($scope.inputWidth < $scope.defaultWidth) {
                        $scope.inputWidth = $scope.defaultWidth;
                    }
                    return tempEl.remove();
                }
            });
            element.bind('keydown', function(e) {
                var key;
                key = e.which;
                if (key === 9 || key === 13) {
                    e.preventDefault();
                }
                if (key === 8) {
                    return $scope.$apply('deleteTag()');
                }
            });
            return element.bind('keyup', function(e) {
                var key;
                key = e.which;
                if (key === 9 || key === 13 || key === 188) {
                    e.preventDefault();
                    return $scope.$apply('addTag()');
                }
            });
        },
        template: '<div class=\'tag-input-ctn\'><div class=\'input-tag\' data-ng-repeat="tag in inputTags">{{tag[ tagOptions.label ] }}<div class=\'delete-tag\' data-ng-click=\'deleteTag($index)\'>&times;</div></div><input type=\'text\' data-ng-style=\'{width: inputWidth}\' data-ng-model=\'tagText\' placeholder=\'{{placeholder}}\'/></div>'
    };
});
