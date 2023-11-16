$(document).ready(function() {
    var $container = $('[data-container]'),
        $modal = $('.modal');
    // Container 내 event 호출
    $container.on('click', '[data-event]', function(e) {
        var $this = $(this),
            $event = $this.data('event') || '';

        switch($event) {
            // 좋아요 클릭
            case 'like':
                // 최초 hasClass로 like 클래스 판별
                if ($(this).hasClass('like')) {
                    // 있을 경우, 좋아요 상태
                    $(this).css('background', "url(../images/background03.png) no-repeat -41px 0");
                    $(this).removeClass('like');
                } else {
                    // 없을 경우, 좋아요 상태 X
                    $(this).css('background', "url(../images/background03.png) no-repeat -6px 0");
                    $(this).addClass('like');
                }
                break;
            // 북마크
            case 'bookmark':
                // 최초 hasClass로 mark 클래스 판별
                if ($(this).hasClass('mark')) {
                    // 있을 경우, 북마크 상태
                    $(this).css('background', 'url(../images/background02.png) no-repeat -44px -43px');
                    $(this).removeClass('mark');
                } else {
                    // 없을 경우, 북마크 상태 X
                    $(this).css('background', 'url(../images/background04.png) no-repeat -7px -6px');
                    $(this).addClass('mark');
                }

                break;
            default:
                break;
        }
    });
    // localstorage 로드
    var firstComments = getComment();
    
    firstComments.forEach(function (comment, idx) {
        $('#' + comment.id).append(
            '<div class="comment_container">'
            +   '   <input type="hidden" name="comment" value="' + Number(idx + 1) + '">'
            +   '   <div class="comment">'
            +   '       <img src="/images/thumb02.jpg" alt="profile" />'
            +   '       <div class="nick_name m_text">User</div>'
            +   '       <div>' + comment.text + '</div>'
            +   '       <a href="javascript:void(0);" id="cmt' + Number(idx + 1) + '" class="comment__modal" data-id="' + comment.id + '"></a>'
            +   '   </div>'
            +   '</div>'
        )
    });
    // 댓글 창에 onFocus 통해 게시 Show
    $('.comment_field > input[type="text"]').on('focus', function(e) {
        $(this).siblings().show();
    });
    // 댓글 창 입력 후 게시 클릭 시, data-comment에 등록
    $('.upload_btn').on('click', function(e) {
        var $commentId = $(this).siblings().data('comment') || '',
        $val = $($(this).siblings()).val();
        
        // val 값으로 json 저장..
        if ($val.length > 0) {
            addComment($val, $commentId);
        } else {
            alert('댓글을 입력해 주세요.');
        }
        comments = getComment();
        
        $('#' + $commentId).html("");

        comments.forEach(function (comment, idx) {
            if (comment.id == $commentId) {
                $('#' + comment.id).append(
                    '<div class="comment_container">'
                    +   '   <input type="hidden" name="comment" value="' + Number(idx + 1) + '">'
                    +   '   <div class="comment">'
                    +   '       <img src="/images/thumb02.jpg" alt="profile" />'
                    +   '       <div class="nick_name m_text">User</div>'
                    +   '       <div>' + comment.text + '</div>'
                    +   '       <a href="javascript:void(0);" id="cmt' + Number(idx + 1) + '" class="comment__modal" data-id="' + comment.id + '"></a>'
                    +   '   </div>'
                    +   '</div>'
                )
            }
        });
        $(this).siblings("input").val('');
        $(this).hide();
    });
    // 댓글 옆 아이콘 클릭 시, 모달 팝업 표출
    // 동적으로 생성 이후, 최초 한 번만 이벤트가 바인딩 되기 때문에 body에다가 이벤트 위임
    $('body').on('click', '.comment__modal' ,function(e) {        
        var $this = $(this);
       
        $modal.addClass('show');
        $modal.attr('data-id', $(this).data('id'));
        $modal.find('#cmmtDelete').attr('data-num', $this.closest('div').siblings('input').val());
    });
    // 취소 버튼 클릭 시, modal show 클래스 제거
    $('#modalClose').on('click', function() {
        $(this).closest('.modal').removeClass('show');
        $(this).closest('.modal').removeAttr('data-id');
    });
    // 삭제 버튼 클릭 시,
    $('#cmmtDelete').on('click', function() {
        var closestModal = $(this).closest('.modal'),
            id = closestModal.data('id') || '';

        deleteComment($(this).data('num'));
        location.reload();
    });

    /**
     * function name : getComment
     * function Description : Comment Value 호출
     * 
     * @param {*} 
     * @returns 
     */
    function getComment() {
        return JSON.parse(localStorage.getItem("comments")) || [];
    }
    /**
     * function name : addComment
     * function Description : Comment Value 추가 
     * 
     * @param {*} text
     * @param {*} id
     */
    function addComment(text, id) {
        var comments = getComment();

        comments.push({text, id});
        localStorage.setItem('comments', JSON.stringify(comments));
    }
    /**
     * function name : deleteComment
     * function Description : Comment Value 제거
     * 
     * @param {*} num 
     */
    function deleteComment(index) {
        var comments = getComment();

        comments.splice(index - 1, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
    }
});

