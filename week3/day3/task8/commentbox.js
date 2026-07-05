let commentData=JSON.parse(localStorage.getItem('Comment'))||[];
let upVotedComments=JSON.parse(localStorage.getItem('upvote'))||[];
const rootForm=document.getElementById('userForm');
const wrapper=document.getElementById('commentWrapper');
rootForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=document.getElementById('textName');
    const comment=document.getElementById('textArea');
    const newData={
        name:name.value.trim(),
        comment:comment.value.trim(),
        id:new Date()+Math.random().toString(36).substr(2, 4),
        parentId:null,
        upvotes:0,
        replies:[],
        timestamp:new Date().toLocaleString()
    };
    commentData.unshift(newData);
    saveData();
    renderData();
    rootForm.reset();
})

function saveData()
{
    localStorage.setItem('Comment',JSON.stringify(commentData));
    localStorage.setItem('Upvote',JSON.stringify(upVotedComments));
}

function findCommentById(id,comment){
for(let item of comment){
    if(item.id===id) return item;
    if(item.replies.length>0)
    {
        let found=findCommentById(id,item.replies);
        if (found) return found;
    }
}
return null;
}
function createCommentNode(comment){
    const node=document.createElement('div');
    node.id=comment.id;
    node.className='comment-node';
    const contentDiv=document.createElement('div');
    contentDiv.className='comment-div';
    const header=document.createElement('div');
    header.className='comment-heder';
    header.textContent=`${comment.name} ${comment.timestamp}`;
    const para=document.createElement('p');
    para.className='comment-body'
    para.textContent=comment.comment;
    const action=document.createElement('div');
    action.className='comment-action';
    const upvotes=document.createElement('button')
    const hasUpvoted=upVotedComments.includes(comment.id);
    upvotes.disabled=hasUpvoted;
    upvotes.className=`action-btn  ${hasUpvoted?'upvote':''}`;
    upvotes.textContent=`upvote${comment.upvotes}`;
    upvotes.addEventListener('click',()=>handleUpvote(comment.id));
    const replyBtn=document.createElement('button');
    replyBtn.className='action-btn';
    replyBtn.textContent='Reply';
    replyBtn.addEventListener('click',()=>toggleReplyForm(comment.id,node));
    action.appendChild(upvotes);
    action.appendChild(replyBtn);

    contentDiv.appendChild(header);
    contentDiv.appendChild(para);
    contentDiv.appendChild(action);
    node.appendChild(contentDiv);

    const repliesContainer = document.createElement('div');
    repliesContainer.className = 'replies-container';
    
     
    const sortedReplies = [...comment.replies].sort((a, b) => b.id.localeCompare(a.id));
    sortedReplies.forEach(reply => {
        repliesContainer.appendChild(createCommentNode(reply));
    });

    node.appendChild(repliesContainer);
    return node;
}
function toggleReplyForm(id,parent){
    const exist=parent.querySelector(`.reply-form[data-parent='${id}']`);
        if(exist){
        exist.remove();
        return;
        }
        const form=document.createElement('form');
        form.className='form reply-form';
        form.setAttribute('data-parent',id);
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Your Name';
        nameInput.required = true;

        const textInput = document.createElement('textarea');
        textInput.placeholder = 'Reply to this comment...';
        textInput.rows = 8;
        textInput.required = true;

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Post Reply';

        form.appendChild(nameInput);
        form.appendChild(textInput);
        form.appendChild(submitBtn);
        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            const target=findCommentById(id,commentData);
            if(target){
                const replyObj={
                    name:nameInput.value.trim(),
                    comment:textInput.value.trim(),
                    id:new Date()+Math.random().toString(36).substr(2, 4),
                    parentId:id,
                    upvotes:0,
                    replies:[],
                    timestamp:new Date().toLocaleString()
                };
            target.replies.unshift(replyObj);
            saveData();
            renderData();
            }
        });
          const contentBlock = parent.querySelector('.comment-div');
        contentBlock.after(form);
}
function handleUpvote(id){
    if(upVotedComments.includes(id)) return;
    const target=findCommentById(id,commentData);
    if(target)
    {
        target.upvotes+=1;
        upVotedComments.push(id);
        saveData();
        renderData();
    }
}
function renderData()
{
    wrapper.innerHTML='';
   commentData.forEach(comment=>
     {
        wrapper.appendChild(createCommentNode(comment))
    //  const element=document.createElement('div');
    // element.textContent=`${comment.name}  :${comment.comment}`;
    // wrapper.appendChild(element);
     });
}
renderData();