document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    const userDetail = document.getElementById("user-detail");

    if (!userId) {
        userDetail.innerHTML = "<p>ไม่พบข้อมูลผู้ใช้</p>";
        return;
    }

    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await res.json();

        userDetail.innerHTML = `
            <p><strong>ชื่อ:</strong> ${user.name}</p>
            <p><strong>อีเมล:</strong> ${user.email}</p>
            <p><strong>ที่อยู่:</strong> ${user.address.street}, ${user.address.city}</p>
            <p><strong>บริษัท:</strong> ${user.company.name}</p>
        `;

    } catch (error) {
        console.error("Error fetching user detail:", error);
        userDetail.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
    }
});
