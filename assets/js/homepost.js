{
   
    let createpost = function(){
        let newpost = $('#newpostform');
        newpost.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/createpost',
                data: newpost.serialize(),
                success: function(data){
                    
                    let latestpost = createindom(data.data.post);
                    $('#post-list>ul').prepend(latestpost);
                    deletepost($(' .delete-button',latestpost));
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let createindom = function(post){
        return $(`<li id="post-${ post._id }">
                <div style="border: 2px solid green;">  
                    
                            
                    
                    <h2><a class="delete-button" href="/post/destroy/${post._id}">X</a> ${ post.content} -<small  style="color:grey; font-size: 15px;">${ post.user.name}</small></h2>
                    
                    <br>
                </div>
                <div>
                        <ul>
                           
                        </ul>
                </div>
               
                    <div>
                            <form action="/comment/createcomment" method="post">
                                    <input type="text" name="content" placeholder="write Comment..." required>
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit" value="Add Comment">
                            </form>
                    </div>
            
            </li>`)
    }


    let deletepost = function(deletelink){
        $(deletelink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deletelink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        });
    }



    createpost();
  
  
}