// Fungsi untuk memuat file HTML ke dalam elemen tertentu
function loadComponent(component, target) {
    fetch(component)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${component}`);
        }
        return response.text();
      })
      .then(data => {
        document.querySelector(target).innerHTML = data;
      })
      .catch(error => console.error(error));
  }
  
  // Memuat komponen
  document.addEventListener("DOMContentLoaded", () => {
      loadComponent("template/navbar.html", "nav");
        loadComponent("template/footer.html", "footer");
  });