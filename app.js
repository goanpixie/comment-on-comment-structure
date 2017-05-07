var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, commentFactory ) {
    $scope.comments = commentFactory.getAllComment();

});

app.component('commentComponent', {
    template: 
    `
    <h1>
    	{{commentCtrl.comment.comment}} 
    	<button ng-click = "commentCtrl.addReply()">Reply</button>
    </h1>
	<ul>
		<li ng-repeat = "subComment in commentCtrl.comment.subComments">
			<comment-component comment= "subComment"></comment-component>
    	</li>
	</ul>
    `,
    bindings: {
        comment: '='
    },
    controller: function MyComponentCtrl() {
        console.log(this.comment.subComments);

        this.addReply = function () {
        	console.log('Let add some reply to this comment', this.comment.comment);
        }
    },
    controllerAs: 'commentCtrl'
});

app.factory('commentFactory', function() {
    var ParentComments = [{
            "comment": "Suhas is idiot",
            "subComments": [{
                "comment": "Couldn't agree more"
            }, {
                "comment": "Fuck off"

            }]
        }, {
            "comment": "Priyanka is even bigger one",
            "subComments": [{
                "comment": "She is indeed"
            }, {
                "comment": "No, she isn't"
            }]
        }

    ];


    return {
        addParentComment: function(comment) {
            ParentComments.push(comment);
        },

        getAllComment: function(callback) {
            // callback(ParentComments);
            console.log('I was returning');
            return ParentComments;
        },

        addChildComment: function(data) {
            console.log(data);
            var parentComment = data.parentComment;
            var childComment = data.childComment;

            ParentComments = ParentComments.map(function(commentObj) {
                if (commentObj.comment == parentComment.comment) {
                    if (commentObj.subComments === undefined) {
                        commentObj.subComments = [];
                    }
                    commentObj.subComments.push({
                        comment: childComment
                    });
                }
                return commentObj;
            });
            console.log(ParentComments);
            return ParentComments;
        },


    };
});
