document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");
    const postDetail = document.getElementById("post-detail");
    const commentList = document.getElementById("comment-list");

    if (!postId) {
        postDetail.innerHTML = "<p>ไม่พบโพสต์</p>";
        return;
    }

    try {
        // ดึงรายละเอียดโพสต์
        const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const post = await resPost.json();

        postDetail.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;

        // ดึงความคิดเห็นของโพสต์
        const resComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments = await resComments.json();

        commentList.innerHTML = comments.map(comment => `
            <div class="comment-item">
                <p><strong>${comment.name}</strong> (${comment.email})</p>
                <p>${comment.body}</p>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error fetching post detail:", error);
        postDetail.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดโพสต์</p>";
    }
});
