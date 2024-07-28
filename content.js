function injectCommentSection() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                const commentsDisabledMessage = document.querySelector('yt-formatted-string#message');
                const message = document.getElementById('message');
                const videoContainer = document.querySelector('ytd-watch-flexy #player');
                const videoContainerWidth = videoContainer ? videoContainer.offsetWidth : '100%';

                if (commentsDisabledMessage && commentsDisabledMessage.textContent.includes('Comments are turned off')) {
                    if (!document.getElementById('custom-comment-section')) {
                        const commentSection = document.createElement('div');
                        commentSection.id = 'custom-comment-section';
                        commentSection.style.width = `${videoContainerWidth}px`;
                        commentSection.style.margin = '0 auto';
                        commentsDisabledMessage.style.display = 'none'; // Hide the "Comments are turned off" message

                        commentSection.innerHTML = `
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <h3 style="color: white; margin-bottom: 16px;">${Math.floor(Math.random() * 1000) + 1} Comments</h3>
                                <div style="display: flex; align-items: center;">
                                    <span style="color: white; margin-right: 8px;">Sort by</span>
                                    <select id="sort-comments" style="background-color: #303030; color: white; border: none; padding: 8px 16px; border-radius: 2px;">
                                        <option value="newest">Newest</option>
                                        <option value="oldest">Oldest</option>
                                    </select>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; margin-bottom: 16px;">
                                <div style="width: 40px; height: 40px; background-color: gray; border-radius: 50%; margin-right: 12px;">
                                    <img src="https://toppng.com/uploads/preview/male-user-filled-icon-man-icon-115533970576b3erfsss1.png" alt="User Icon" style="width: 100%; height: 100%; border-radius: 50%;">
                                </div>
                                <input style="background-color: #181818; color: white; border: none; border-bottom: 1px solid #303030; padding: 10px; flex-grow: 1; margin-right: 8px; height: 20px;" id="comment-input" placeholder="Add a comment...">
                            </div>
                            <div id="comments-container" style="margin-top: 16px;"></div>
                        `;
                        commentsDisabledMessage.parentElement.appendChild(commentSection);

                        document.getElementById('comment-input').addEventListener('keypress', (event) => {
                            if (event.key === 'Enter') {
                                postComment();
                            }
                        });

                        function postComment() {
                            const comment = document.getElementById('comment-input').value;
                            if (comment) {
                                const commentContainer = document.getElementById('comments-container');
                                const randomName = `User${Math.floor(Math.random() * 1000)}`;
                                const commentElement = document.createElement('div');
                                commentElement.style.marginBottom = '16px';
                                commentElement.innerHTML = `
                                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                        <div style="width: 40px; height: 40px; background-color: gray; border-radius: 50%; margin-right: 12px;">
                                            <img src="https://toppng.com/uploads/preview/male-user-filled-icon-man-icon-115533970576b3erfsss1.png" alt="User Icon" style="width: 100%; height: 100%; border-radius: 50%;">
                                        </div>
                                        <div style="background-color: #181818; color: white; border: 1px solid #303030; border-radius: 2px; padding: 10px; flex-grow: 1;">
                                            <strong style="color: white;">${randomName}</strong>
                                            <p style="margin: 0;">${comment}</p>
                                            <div style="display: flex; align-items: center; margin-top: 8px;">
                                                <button style="background-color: #303030; color: white; border: none; padding: 5px 10px; border-radius: 2px;" class="reply-button">Reply</button>
                                            </div>
                                            <div class="replies-container" style="margin-top: 8px; margin-left: 52px;"></div>
                                        </div>
                                    </div>
                                `;
                                commentContainer.appendChild(commentElement);
                                document.getElementById('comment-input').value = '';

                                const replyButton = commentElement.querySelector('.reply-button');
                                replyButton.addEventListener('click', () => {
                                    if (!commentElement.querySelector('.reply-input-container')) {
                                        const replyInputContainer = document.createElement('div');
                                        replyInputContainer.className = 'reply-input-container';
                                        replyInputContainer.style.display = 'flex';
                                        replyInputContainer.style.alignItems = 'center';
                                        replyInputContainer.style.marginTop = '8px';
                                        replyInputContainer.innerHTML = `
                                            <div style="width: 32px; height: 32px; background-color: gray; border-radius: 50%; margin-right: 12px;">
                                                <img src="https://toppng.com/uploads/preview/male-user-filled-icon-man-icon-115533970576b3erfsss1.png" alt="User Icon" style="width: 100%; height: 100%; border-radius: 50%;">
                                            </div>
                                            <input style="background-color: #181818; color: white; border: none; border-bottom: 1px solid #303030; padding: 10px; flex-grow: 1; margin-right: 8px; height: 20px;" placeholder="Add a reply...">
                                            <button style="background-color: #065fd4; color: white; border: none; padding: 5px 10px; border-radius: 2px;" class="post-reply">Reply</button>
                                            <button style="background-color: transparent; color: white; border: none; padding: 5px 10px; border-radius: 2px;" class="cancel-reply">Cancel</button>
                                        `;
                                        const repliesContainer = commentElement.querySelector('.replies-container');
                                        repliesContainer.appendChild(replyInputContainer);

                                        const postReplyButton = replyInputContainer.querySelector('.post-reply');
                                        const cancelReplyButton = replyInputContainer.querySelector('.cancel-reply');
                                        const replyInput = replyInputContainer.querySelector('input');

                                        postReplyButton.addEventListener('click', () => {
                                            const replyText = replyInput.value;
                                            if (replyText) {
                                                const replyElement = document.createElement('div');
                                                replyElement.style.display = 'flex';
                                                replyElement.style.alignItems = 'center';
                                                replyElement.style.marginTop = '8px';
                                                replyElement.innerHTML = `
                                                    <div style="width: 32px; height: 32px; background-color: gray; border-radius: 50%; margin-right: 12px;">
                                                        <img src="https://toppng.com/uploads/preview/male-user-filled-icon-man-icon-115533970576b3erfsss1.png" alt="User Icon" style="width: 100%; height: 100%; border-radius: 50%;">
                                                    </div>
                                                    <div style="background-color: #181818; color: white; border: 1px solid #303030; border-radius: 2px; padding: 10px; flex-grow: 1;">
                                                        <strong style="color: white;">${randomName}</strong>
                                                        <p style="margin: 0;">${replyText}</p>
                                                    </div>
                                                `;
                                                repliesContainer.insertBefore(replyElement, replyInputContainer);
                                                replyInput.value = '';
                                            }
                                        });

                                        cancelReplyButton.addEventListener('click', () => {
                                            replyInputContainer.remove();
                                        });
                                    }
                                });
                            }
                        }

                        observer.disconnect();  // Stop observing once the comment section is added
                    }
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

injectCommentSection();
