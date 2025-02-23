/* 
======================================================
                    Seminari 2
======================================================
*/ 

//URL base API JSONholder
const API_URL = 'https://jsonplaceholder.typicode.com';

// Función para obtener un usuario de una API
function getUser(userId) {
    return fetch(`${API_URL}/users/${userId}`)
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener el usuario");
        return response.json();
      });
  }

  //Funcion para obtener todos los usuarios
  function getAllUser() {
    return fetch(`${API_URL}/users`)
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener el usuario");
        return response.json();
      });
  }
  // Función para obtener los posts de un usuario
  function getPosts(userId) {
    return fetch(`${API_URL}/posts?userId=${userId}`)
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener los posts");
        return response.json();
      });
  }
  
  // Función para obtener los comentarios del post
  function getComments(postId) {
    return fetch(`${API_URL}/comments?postId=${postId}`)
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener comentarios del post");
        return response.json();
      });
  }
  //Funcion para obtener los titulos de los post que comienzan por e
  function getTitlesWithe(posts){
    return posts
    .filter(post => post.title[0]=="e")
    .map(post => post.title)
    
  }

  function filterNamePopularPosts(posts, comments) {
    // Creamos un array donde cada elemento es un objeto con el post y la cantidad de comentarios asociados
    const popularPost = posts
    .map(post => {
      const count = comments.filter(comment => comment.postId === post.id).length;
      return { title: post.title, count };
    })
    .filter(post => post.title[0] === 'e')
    .reduce((max, curr) => {
     return curr.count > max.count ? curr : max;
    }, { title: null, count: -1 });
  
    return popularPost.title;
  }
  
  // Función para ordenar los usuarios por nombre alfabéticamente
  function usersSortedByName(users) {
    return users.sort((a, b) => a.name.localeCompare(b.name)).map(user => user.name);
  }

  

  async function fetchOrderDetails() {
    try {
      const user = await getUser(1);
      console.log("user id-1: ",user)
      const posts = await getPosts(user.id);
      console.log("user id-1 posts: ",posts)
      const comments = await getComments(posts[0].id);
      console.log("comments of post 0:",comments)

      const commentsPromises = posts.map(post => getComments(post.id));
      const commentsArrays = await Promise.all(commentsPromises);
      const allComments = commentsArrays.flat();

      console.log("Comentarios del primer post:", comments);
      console.log("------------------------------")
      // Aplicar funciones de alto nivel
      const postTitles = getTitlesWithe(posts);
      console.log("Títulos de los posts con 'e':", postTitles);

      const comentsByName = comments.map(comments => comments.name)
      
      const popularPostTitle = filterNamePopularPosts(posts, allComments);
      console.log("Título del post con más comentarios con 'e':", popularPostTitle);

      const users = await getAllUser();
      console.log("Usuarios por orden alfabetico: ",usersSortedByName(users))

      
      console.log("Fin");
    } catch (error) {
      console.error("Error:", error);
    }
  }

fetchOrderDetails();

