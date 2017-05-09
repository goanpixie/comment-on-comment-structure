var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, commentFactory) {

    var vm = this;

    vm.comment

    vm.getAllComment = function getAllComment() {
        $scope.comments = commentFactory.getAllComment();
    }

    vm.postComment = function postComment() {
        commentFactory.addParentComment({
            message: vm.comment
        });
    }

    vm.getAllComment();

});

app.component('commentComponent', {
    template: `
    <div>
    	<h2>
			
    		{{commentCtrl.comment.message}} 
    		<button ng-click = "commentCtrl.toggleReplyView()">
    			Reply
    		</button>
    	</h2>
        <form ng-if = "commentCtrl.isReplyVisible" ng-submit="commentCtrl.addReply()">
            <input ng-model="commentCtrl.subComment" /required>
            <input type="submit" value="Post Reply">
        </form>
        <ul>
        	<li ng-repeat = "subComment in commentCtrl.comment.subComments" | orderBy:'-' >
        		<comment-component index = "commentCtrl.index" comment="subComment"></comment-component>
        	</li>
        </ul>

    </div>
    `,
    bindings: {
        comment: '=',
        index: '='
    },
    controller: function MyComponentCtrl(commentFactory) {

        Object.assign(this, {
            isReplyVisible: false,
            subComment: '',
            addReply() {
                this.index = this.index + '1';
                var commentLevel = this.index.length;
                if (!this.comment.subComments) this.comment.subComments = [];
                // Check if we have reached at 4th level nesting. if so, do not do anything.
                if (commentLevel <= 4) {
                    this.comment.subComments = [...this.comment.subComments, { message: this.subComment }];
                }
                

            },
            //toggles Reply input box visibility
            toggleReplyView() {
                this.isReplyVisible = !this.isReplyVisible;
            },


        });
    },
    controllerAs: 'commentCtrl'
});

app.factory('commentFactory', function() {
    var allComments = [{
            "message": "Fake news is a modern online problem ",
            "subComments": [{
                "message": "Fiskkit to rescue!"
            }, {
                "message": "Unmonitered reader consumption"

            }]
        }, {
            "message": "Love the new Oculus Rift",
            "subComments": [{
                "message": "Virtual Reality is here"
            }, {
                "message": "Gaming is going to get real"
            }]
        },

        { 
        		"message": "1", 
        		"subComments": [{ 
        			"message": "2",
        			"subComments": [{
        			  "message": "3", 
        			  "subComments": [{ 
        			  	"message": "4" 
        			  }]        			  
        			}] 
        		}] 
        	}

        	

    ];


    return {
        addParentComment: function(comment) {
            allComments.push(comment);
        },

        getAllComment: function() {
            return allComments;
        }
    };
});


