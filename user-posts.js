document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    const postList = document.getElementById("post-list");

    if (!userId) {
        postList.innerHTML = "<p>ไม่พบข้อมูลโพสต์</p>";
        return;
    }

    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await res.json();

        postList.innerHTML = posts.map(post => `
            <div class="post-item">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <a href="post-detail.html?id=${post.id}">ดูความคิดเห็น</a>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error fetching posts:", error);
        postList.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดโพสต์</p>";
    }
});
