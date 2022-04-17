window.addEventListener('DOMContentLoaded', () => {
    bindTweet();
})

bindTweet = () => {
    const tweetContainer = document.getElementById('tweet-list-containe');
    const deleteButtons = tweetContainer.querySelectorAll('.fa-minus-circle');

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', async ($event) => {
            try {
                const tweetId = $event.target.getAttribute('tweetId');
                const tweetList = await axios.delete('/tweets/' + tweetId);
                tweetContainer.innerHTML = tweetList.data;
                bindTweet();
            } catch(e) {
                console.log('err');
            }

        })
    })
}