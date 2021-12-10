let content_variability = document.querySelector(".proxy_content");

!(async function () {
  let data = await fetch("/wordpress_all_posts")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        let postOutline = document.createElement("div");
        postOutline.classList.add("borders_wordpress_post");
        let postTitle = document.createElement("h2");
        postTitle.innerHTML = post.title.rendered;
        postOutline.appendChild(postTitle);
        let postContent = document.createElement("p");
        postContent.innerHTML = post.content.rendered;
        postOutline.appendChild(postContent);
        content_variability.appendChild(postOutline);
      });
    })
    .catch((error) => {
      console.error(error);
    });
})();
