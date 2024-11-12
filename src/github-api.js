export const uploadToGitHub = async (fileContent, filename) => {
    const token = "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";
    const repo = "merazalveego/dashboard";
    const path = `uploads/${filename}`;
    
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        "Authorization": `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload new design: ${filename}`,
        content: btoa(fileContent),
      }),
    });
  
    return await response.json();
  };
  