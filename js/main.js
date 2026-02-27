document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".re-btn-primary");

    buttons.forEach(btn => {
        btn.addEventListener("click", function () {
            console.log("Button clicked");
        });
    });

});

