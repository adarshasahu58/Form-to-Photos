// REPLACE THIS WITH YOUR ACTUAL FOLDER ID
const FOLDER_ID = '1H8PvuSmujx6TSFh3ELzMb77LS0i_cxJ6wCXFNiOpvxbGUvMUjou18xN0J_YZDhIKIf2GnvrU';

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Live Waterfall')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getRecentImages(t) {
  try {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const files = folder.getFiles();
    const images = [];
    let count = 0;
    
    // Scan last 150 files
    while (files.hasNext() && count < 150) {
      const file = files.next();
      if (file.getMimeType().includes('image')) {
        images.push({
          id: file.getId(),
          url: `https://drive.google.com/thumbnail?sz=w800&id=${file.getId()}`, 
          created: file.getDateCreated().getTime()
        });
      }
      count++;
    }
    return images.sort((a, b) => b.created - a.created);
  } catch (e) {
    return [];
  }
}
