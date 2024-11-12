import { uploadToFirebase } from "./firebase.js";
import { uploadToGitHub } from "./github-api.js";

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const image = document.getElementById("imageUpload").files[0];
  const designFile = document.getElementById("fileUpload").files[0];
  const resolution = document.getElementById("resolution").value.trim();
  const contributor = document.getElementById("contributor").value.trim();
  const category = document.getElementById("category").value;
  const tags = document.getElementById("tags").value.trim();
  const description = document.getElementById("description").value.trim();
  const uploadDate = new Date().toISOString();

  if (!title || !image || !designFile || !resolution || !contributor || !category || !tags || !description) {
    document.getElementById("status").innerText = "সব ফিল্ড পূরণ করুন।";
    document.getElementById("status").classList.add("error");
    return;
  }

  try {
    // Image Upload to Firebase
    const imagePath = `images/${image.name}`;
    await uploadToFirebase(image, imagePath);

    // Design File Upload to Firebase
    const filePath = `designs/${designFile.name}`;
    await uploadToFirebase(designFile, filePath);

    // Metadata Creation
    const metadata = {
      title,
      resolution,
      contributor,
      category,
      tags: tags.split(","),
      description,
      uploadDate,
    };

    // Upload metadata to GitHub
    const metadataContent = JSON.stringify(metadata, null, 2);
    await uploadToGitHub(metadataContent, `metadata/${title.replace(/\s+/g, "_")}.json`);

    document.getElementById("status").innerText = "আপলোড সফল হয়েছে!";
  } catch (error) {
    console.error(error);
    document.getElementById("status").innerText = "আপলোড ব্যর্থ হয়েছে!";
    document.getElementById("status").classList.add("error");
  }
});
