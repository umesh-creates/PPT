async function downloadPDF() {

    const loader = document.getElementById("pdfLoader");
    const progressFill = document.querySelector(".progress-fill");
    const progressText = document.querySelector(".progress-percent");
    const loaderText = document.querySelector(".loader-text");

    const slides = document.querySelectorAll(".page"); // 👈 direct .page use
    const pages = document.querySelectorAll(".page");

    for (let i = 0; i < pages.length; i++) {
        pages[i].style.width = "5120px";
    }
    loader.classList.add("active");

    const { jsPDF } = window.jspdf;

    // 🔥 A4 FIXED (NO SCROLL ISSUE)
    const pdf = new jsPDF("landscape", "mm", "a4");

    for (let i = 0; i < slides.length; i++) {

        loaderText.innerText = `Processing page ${i + 1} of ${slides.length}`;

        const progress = Math.round((i / slides.length) * 100);
        progressFill.style.width = progress + "%";
        progressText.innerText = progress + "%";

        const canvas = await html2canvas(slides[i], {
            scale: 3,              // 🔥 HIGH QUALITY (balanced)
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff"
        });

        // 🔥 BEST QUALITY OUTPUT
        const imgData = canvas.toDataURL("image/jpeg", 0.92);

        if (i > 0) pdf.addPage();

        // 🔥 FIT EXACT A4 (no zoom/scroll issue)
        pdf.addImage(imgData, "JPEG", 0, 0, 297, 210);
    }

    setTimeout(() => {

        pdf.save("slides.pdf");

        loader.classList.remove("active");

    }, 500);
}
// ----------------------------------------------------
// async function downloadPDF() {

//     const loader = document.getElementById("pdfLoader");
//     const progressFill = document.querySelector(".progress-fill");
//     const progressText = document.querySelector(".progress-percent");
//     const loaderText = document.querySelector(".loader-text");

//     loader.classList.add("active");

//     const { jsPDF } = window.jspdf;
//     const slides = document.querySelectorAll(".slide");

//     const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",
//         format: [1920, 1080]
//     });

//     for (let i = 0; i < slides.length; i++) {

//         loaderText.innerText = `Processing slide ${i + 1} of ${slides.length}`;

//         const progress = Math.round((i / slides.length) * 100);
//         progressFill.style.width = progress + "%";
//         progressText.innerText = progress + "%";

//         const slide = slides[i];

//         const canvas = await html2canvas(slide, {
//             scale: 2, // 🔥 best balance
//             useCORS: true,
//             backgroundColor: "#ffffff"
//         });

//         const imgData = canvas.toDataURL("image/jpeg", 1.0);

//         if (i !== 0) {
//             pdf.addPage([1920, 1080], "landscape");
//         }

//         pdf.addImage(imgData, "JPEG", 0, 0, 1920, 1080);
//     }

//     // 🔥 Final step
//     progressFill.style.width = "100%";
//     progressText.innerText = "100%";
//     loaderText.innerText = "Finalizing PDF...";

//     setTimeout(() => {
//         pdf.save("slides.pdf"); // 👉 DOWNLOAD TRIGGER
//         loader.classList.remove("active");
//     }, 500);
// }
// --------------------------------------------
// async function downloadPDF() {

//     const slides = document.querySelectorAll(".slide");

//     for (let i = 0; i < slides.length; i++) {

//         const original = slides[i];

//         // 🔥 clone (layout safe)
//         const clone = original.cloneNode(true);
//         document.body.appendChild(clone);

//         // 🔥 offscreen rakho
//         clone.style.position = "fixed";
//         clone.style.left = "-9999px";
//         clone.style.top = "0";

//         // 🔥 force HD size (important)
//         clone.style.width = "1920px";
//         clone.style.height = "1080px";

//         const canvas = await html2canvas(clone, {
//             scale: 2, // 🔥 stable + sharp
//             useCORS: true,
//             backgroundColor: "#ffffff"
//         });

//         const imgData = canvas.toDataURL("image/png");

//         // 🔥 download
//         const link = document.createElement("a");
//         link.href = imgData;
//         link.download = `slide-${i + 1}.png`;
//         link.click();

//         // 🔥 cleanup
//         document.body.removeChild(clone);

//         await new Promise(r => setTimeout(r, 300));
//     }
// }