function injectCommentSection() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          const commentsDisabledMessage = document.querySelector('yt-formatted-string#message');
            const message=document.getElementById('message');
          if (commentsDisabledMessage && commentsDisabledMessage.textContent.includes('Comments are turned off')) {
            const commentSection = document.createElement('div');
            commentSection.id = 'custom-comment-section';
            message.style.display='none';
            commentSection.innerHTML = `
              <h3>Comments</h3>
              <input style="background-color:rgb(1,1,1,0);border:none;width:10rem" id="comment-input" placeholder="Write a comment..."></input>
              <button id="post-comment">Post Comment</button>
              <div id="comments-container"></div>
            `;
            commentsDisabledMessage.parentElement.appendChild(commentSection);
  
            document.getElementById('post-comment').addEventListener('click', () => {
              const comment = document.getElementById('comment-input').value;
              if (comment) {
                const commentContainer = document.getElementById('comments-container');
                const commentElement = document.createElement('p');
                commentElement.textContent = comment;
                commentContainer.appendChild(commentElement);
                document.getElementById('comment-input').value = '';
              }
            });
  
            observer.disconnect();  // Stop observing once the comment section is added
          }
        }
      });
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  injectCommentSection();