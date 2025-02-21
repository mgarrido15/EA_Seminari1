console.log("Inicio");


function getUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    });
}


function getPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener los posts");
      return response.json();
    });
}


function getComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener comentarios del post");
      return response.json();
    });
}

async function fetchOrderDetails() {
  try {
    const user = await getUser(2);
    console.log(user);
    const posts = await getPosts(user.id);
    const commentsPromise = posts.map(post => getComments(post.id));
    const comments = await Promise.all(commentsPromise);
    // comments.forEach((comments, index) => {
    //   console.log(`Comentarios del post ${posts[index].id}:`, comments);
    // });

    const orderedComments = comments.flat().map((comment) => ({
      ...comment,
      type: "Comment"
    })).filter((comment) => comment.id >= 50).sort((a,b) => b.id - a.id);

    orderedComments.forEach((comments) => {
      console.log(`Comentario ${comments.id}:`, comments);
    });
  }
   catch (error) {
    console.error("Error:", error);
  }
}


fetchOrderDetails();