let posts = [];

function toggleForm() {
  const form = document.getElementById('postForm');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function addPost(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const imageInput = document.getElementById('imageInput');
  let imageURL = '';

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageURL = e.target.result;
      createPost(title, content, imageURL);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    createPost(title, content, imageURL);
  }
}

function createPost(title, content, imageURL) {
  const post = {
    id: Date.now(),
    title,
    content,
    imageURL,
    date: new Date().toLocaleString()
  };

  posts.push(post);
  displayPosts();
  document.getElementById('blogForm').reset();
  toggleForm();
}

function deletePost(postId) {
  posts = posts.filter(post => post.id !== postId);
  displayPosts();
}

function displayPosts() {
  const blogPosts = document.getElementById('blogPosts');
  blogPosts.innerHTML = '';

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      ${post.imageURL ? `<img src="${post.imageURL}" alt="Post Image">` : ''}
      <p>${post.content}</p>
      <p><em>Posted on ${post.date}</em></p>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;
    blogPosts.appendChild(postElement);
  });
}

// Sample initial posts (you can remove this for a clean start)
posts.push({
  id: Date.now(),
  title: 'Sample Post Title',
  content: 'This is a sample blog post content.',
  imageURL: 'https://via.placeholder.com/150',
  date: new Date().toLocaleString()
});

displayPosts();
