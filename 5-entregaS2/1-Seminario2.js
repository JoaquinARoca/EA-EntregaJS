// URL base de la API JSONPlaceholder
const API_URL = 'https://jsonplaceholder.typicode.com';

// Función para obtener datos de un usuario específico
async function getUser(userId) {
    const response = await fetch(`${API_URL}/users/${userId}`);
    return response.json();
}

// Función para obtener los posts de un usuario
async function getUserPosts(userId) {
    const response = await fetch(`${API_URL}/posts?userId=${userId}`);
    return response.json();
}

// Función para obtener comentarios de los posts
async function getPostComments(postId) {
    const response = await fetch(`${API_URL}/comments?postId=${postId}`);
    return response.json();
}

// Función principal para obtener y procesar los datos
async function main(userId) {
    try {
        const user = await getUser(userId);
        console.log('Usuario:', user);
        
        const posts = await getUserPosts(userId);
        console.log('Posts:', posts);
        
        // Obtener comentarios de todos los posts
        const commentsPromises = posts.map(post => getPostComments(post.id));
        const commentsArray = await Promise.all(commentsPromises);
        console.log('Comentarios:', commentsArray);

        // Usar map para extraer los títulos de los posts
        const postTitles = posts.map(post => post.title);
        console.log('Títulos de los posts:', postTitles);

        // Usar filter para encontrar posts con más de 5 comentarios
        const popularPosts = posts.filter((post, index) => commentsArray[index].length > 5);
        console.log('Posts con más de 5 comentarios:', popularPosts);

        // Usar reduce para contar el total de comentarios
        const totalComments = commentsArray.reduce((acc, comments) => acc + comments.length, 0);
        console.log('Total de comentarios:', totalComments);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Llamar a la función principal con un ID de usuario específico
main(1);
