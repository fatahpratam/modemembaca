/**
 * Menyaring semua element di dalam document menggunakan library Readability.
 */
function readingMode() {
  const article = new Readability(document, { charThreshold: 50 }).parse();
  document.body.innerHTML = `<h1>${article.title}</h1>`;
  document.body.innerHTML += article.content;
  filterImage();
}
readingMode();

/**
 * Menyaring gambar yang tidak memiliki figure element sebagai parentnya.
 */
function filterImage() {
  const filteredImages = document.querySelectorAll('img:not(figure img)');
  filteredImages.forEach(img => img.remove());
}