
// API I chose and the purpose
// TheMealDB API: https://www.themealdb.com/api.php
// Purpose: Fetch recipes that include the user’s searched ingredient.

document.getElementById("searchContainer").addEventListener("submit", (event) => { event.preventDefault();

  const input = document.querySelector("input[type='search']");
  const ingredient = input.value.trim().toLowerCase();

  if(!ingredient){
    alert("Please enter an ingredient.");
    return;
  }

  //Save ingredient to direct to next page
  localStorage.setItem("ingredient", ingredient);

  //Take to next page with results
  window.location.href = "results/results.html";
});



// Section for slideshow to function
document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("food_slideshow");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        if (slides.length > 0) {
            slides[slideIndex - 1].style.display = "block";
        }

        if (dots.length > 0) {
            dots[slideIndex - 1].className += " active";
        }
    }

    // Making the buttons function
    const prevBtn = document.getElementById("prevButton");
    const nextBtn = document.getElementById("nextButton");

    if (prevBtn) prevBtn.addEventListener("click", () => plusSlides(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => plusSlides(1));

    //Making dots function 
    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot => {
        dot.addEventListener("click", function () {
            const slideNum = parseInt(this.getAttribute("data-slide"), 10);
            currentSlide(slideNum);
        });
    });
});


//Section for popular dishes
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".recipe-card");

  cards.forEach(card => {
    card.addEventListener("click", async () => {
      const mealName = card.getAttribute("data-meal");

      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        const data = await res.json();
        const meal = data.meals[0];

        if (!meal) {
          alert("Recipe not found.");
          return;
        }

        //Save meal id for details page
        localStorage.setItem("mealID", meal.idMeal);

        //Take to next page for details
        window.location.href = "results/details/details.html";

      } catch(error) {
        console.error("Error loading recipe:", error);
      }
    });
  });
});

