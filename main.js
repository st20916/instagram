$(function() {
    var $container = $('[data-container]'),
        $modal = $('.modal');

    getComment();

    // Scroll (Sticky 효과)
    $(window).on('scroll', function(e) {
        if ($(window).scrollTop() > 200) {
            $('.side_box').css({
                'position': 'fixed',
                'top': '20px',
                'right': '190px'
            });
        } else {
            $('.side_box').css({
                'position': 'absolute',
                'top': '0',
                'right': '-20px'
            });
        }
    });
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
                    $(this).css('background', 'url(../images/background03.png) no-repeat no-repeat -41px 0');
                    $(this).removeClass('like');
                } else {
                    // 없을 경우, 좋아요 상태 X
                    $(this).css('background', 'url(../images/background03.png) no-repeat no-repeat -6px 0');
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
    // 댓글 창에 onFocus 통해 게시 Show
    $('.comment_field > input[type="text"]').on('focus', function(e) {
        $(this).siblings().show();
    });
    // 댓글 창 입력 후 게시 클릭 시, data-comment에 등록
    $('.upload_btn').on('click', function(e) {
        var $commentId = $(this).siblings().data('comment') || '',
            comments = getComment(),
            $val = $($(this).siblings()).val();
    
        // val 값으로 json 저장..
        addComment($val, $commentId);
        
        $('#' + $commentId).html("");
    
        comments.forEach(function (comment, idx) {
            $('#' + comment.id).append(
                '<div class="comment_container">'
                +   '   <input type="hidden" value="'+ Number(idx + 1) + '" />'
                +   '   <div class="comment">'
                +   '       <div class="nick_name m_text">User</div>'
                +   '       <div>' + comment.text + '</div>'
                +   '   </div>'
                +   '</div>'
            )
        });
    
        $(this).siblings().text();
        $(this).hide();
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
     * function name : generateUniqueId
     * function description : 고유 id 생성
     * 
     * @returns 
     * 
     */
    function generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }
});