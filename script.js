import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* FIREBASE CONFIG */

const firebaseConfig = {
  apiKey: "AIzaSyBCmXxAuhuVK3V-16T_FWKsJL5LviSItOk",

  authDomain: "my-personal-website-b82dd.firebaseapp.com",

  projectId: "my-personal-website-b82dd",

  storageBucket: "my-personal-website-b82dd.firebasestorage.app",

  messagingSenderId: "828115468055",

  appId: "1:828115468055:web:aa3de01cabc1ae9cd30152",
};

/* INITIALIZE FIREBASE */

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/* PASSWORD */

const PASSWORD = "mypassword";

/* DATE */

function getCurrentDateTime() {
  return new Date().toLocaleString();
}

/* PASSWORD CHECK */

function checkPassword() {
  const enteredPassword = prompt("Enter password");

  if (enteredPassword !== PASSWORD) {
    alert("Wrong password");

    return false;
  }

  return true;
}

/* DELETE */

async function deleteItem(collectionName, id) {
  if (!checkPassword()) return;

  await deleteDoc(doc(db, collectionName, id));
}

/* ADD THOUGHT */

window.addPost = async function () {
  if (!checkPassword()) return;

  const title = document.getElementById("postTitle").value;

  const content = document.getElementById("postContent").value;

  if (title === "" || content === "") {
    alert("Please fill all fields");

    return;
  }

  await addDoc(collection(db, "thoughts"), {
    title,
    content,
    dateTime: getCurrentDateTime(),
  });

  document.getElementById("postTitle").value = "";

  document.getElementById("postContent").value = "";
};

/* ADD VOCABULARY */

window.addVocabulary = async function () {
  if (!checkPassword()) return;

  const word = document.getElementById("word").value;

  const meaning = document.getElementById("meaning").value;

  if (word === "" || meaning === "") {
    alert("Please fill all fields");

    return;
  }

  await addDoc(collection(db, "vocabulary"), {
    word,
    meaning,
    dateTime: getCurrentDateTime(),
  });

  document.getElementById("word").value = "";

  document.getElementById("meaning").value = "";
};

/* ADD BLOG */

window.addBlog = async function () {
  if (!checkPassword()) return;

  const title = document.getElementById("blogTitle").value;

  const content = document.getElementById("blogContent").value;

  if (title === "" || content === "") {
    alert("Please fill all fields");

    return;
  }

  await addDoc(collection(db, "blogs"), {
    title,
    content,
    dateTime: getCurrentDateTime(),
  });

  document.getElementById("blogTitle").value = "";

  document.getElementById("blogContent").value = "";
};

/* LOAD THOUGHTS */

onSnapshot(collection(db, "thoughts"), (snapshot) => {
  const postsDiv = document.getElementById("posts");

  postsDiv.innerHTML = "";

  snapshot.forEach((docItem) => {
    const data = docItem.data();

    postsDiv.innerHTML += `
      <div class="post">
        <h3>${data.title}</h3>

        <p>${data.content}</p>

        <small>${data.dateTime}</small>
      </div>
    `;
  });
});

/* LOAD VOCABULARY */

onSnapshot(collection(db, "vocabulary"), (snapshot) => {
  const vocabDiv = document.getElementById("vocabulary");

  vocabDiv.innerHTML = "";

  snapshot.forEach((docItem) => {
    const data = docItem.data();

    vocabDiv.innerHTML += `
      <div class="vocab-item">
        <h3>${data.word}</h3>

        <p>${data.meaning}</p>

        <small>${data.dateTime}</small>
      </div>
    `;
  });
});

/* LOAD BLOGS */

onSnapshot(collection(db, "blogs"), (snapshot) => {
  const blogsDiv = document.getElementById("blogs");

  blogsDiv.innerHTML = "";

  snapshot.forEach((docItem) => {
    const data = docItem.data();

    blogsDiv.innerHTML += `
      <div class="blog-post">
        <h3>${data.title}</h3>

        <p>${data.content}</p>

        <small>${data.dateTime}</small>
      </div>
    `;
  });
});

/* HAMBURGER */

window.toggleMenu = function () {
  const menu = document.getElementById("mobileMenu");

  menu.classList.toggle("show");
};

window.deleteItem = deleteItem;
