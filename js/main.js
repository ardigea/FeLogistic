const baseURL = 'https://be-semarang-23-production.up.railway.app/api/users';

document.addEventListener("DOMContentLoaded", function () {
  const ekspedisiForm = document.getElementById("ekspedisiForm");
  const daftarEkspedisi = document.getElementById("daftarEkspedisi");
  const addEkspedisi = document.getElementById("addEkspedisi");
  const clearEkspedisiButton = document.getElementById("clearEkspedisi");
  const output = document.getElementById("output"); // Tambahkan elemen HTML output

  addEkspedisi.addEventListener("click", async () => {
    const ReceiversName = document.getElementById("ReceiversName").value;
    const TrackingNumber = document.getElementById("TrackingNumber").value;
    const PhoneNumber = document.getElementById("PhoneNumber").value;
    const PackageWeight = document.getElementById("PackageWeight").value;
    const ServiceOption = document.getElementById("ServiceOption").value;

    if (ReceiversName && TrackingNumber && PhoneNumber && PackageWeight && ServiceOption) {
      try {
        // Buat objek JSON dengan kunci 
        const requestData = {
          ReceiversName: ReceiversName,
          TrackingNumber: TrackingNumber,
          PhoneNumber: PhoneNumber,
          PackageWeight: PackageWeight,
          ServiceOption: ServiceOption
        };

        // Kirim data sebagai objek JSON
        const response = await fetch(baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          console.log("Added ekspedisi item successfully");

          // Tampilkan informasi ekspedisi yang berhasil ditambahkan ke daftar
          const ekspedisiItem = document.createElement("div");
          ekspedisiItem.innerHTML = `<p>Receivers Name: ${ReceiversName} <br /> 
            Tracking Number: ${TrackingNumber} <br />
            Phone Number: ${PhoneNumber} <br />
            Package Weight: ${PackageWeight} <br />
            Service Option: ${ServiceOption} <br />
          </p>
          <h1>Success</h1>`;
          daftarEkspedisi.appendChild(ekspedisiItem);

          // Reset input fields
          ekspedisiForm.reset();
        } else {
          console.error("Failed to add ekspedisi item");
        }
      } catch (error) {
        console.error("Error adding ekspedisi item:", error);
      }
    }
  });

  clearEkspedisiButton.addEventListener("click", async () => {
    // Hapus semua elemen anak di dalam daftarEkspedisi
    while (daftarEkspedisi.firstChild) {
      daftarEkspedisi.removeChild(daftarEkspedisi.firstChild);
    }

    try {
      // Kirim permintaan DELETE untuk menghapus semua ekspedisi
      const response = await fetch(baseURL, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Deleted all ekspedisi items successfully");
      } else {
        console.error("Failed to delete all ekspedisi items");
      }
    } catch (error) {
      console.error("Error deleting all ekspedisi items:", error);
    }
  });

  // Tambahkan event listener untuk mengambil data ekspedisi saat dokumen dimuat
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      // Kirim permintaan GET untuk mengambil data ekspedisi
      const response = await fetch(baseURL, {
        method: "GET",
      });

      if (response.ok) {
        const ekspedisiData = await response.json();
        console.log("GET Request Result:", ekspedisiData);

      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
});
