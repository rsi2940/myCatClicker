//Model

const model = {
  currentCat: null,
  cats: [
    { name: "cat1", imgSrc: "img/cat1.jpg", clickCount: 0 },
    { name: "cat2", imgSrc: "img/cat2.jpg", clickCount: 0 },
    { name: "cat3", imgSrc: "img/cat3.jpg", clickCount: 0 },
    { name: "cat4", imgSrc: "img/cat4.jpg", clickCount: 0 },
    { name: "cat5", imgSrc: "img/cat5.jpg", clickCount: 0 }
  ]
};

//Octopus
const octopus = {
  init() {
    //Set current cat to first one in the list
    model.currentCat = model.cats[0];

    //initialize views
    catView.init();
    catListView.init();
    adminView.init();
  },

  //getter for model.cats
  get cats() {
    return model.cats;
  },
  //getter for model.currentCat
  get currentCat() {
    return model.currentCat;
  },
  //setter for currentCat
  set currentCat(cat) {
    model.currentCat = cat;
  },
  //increment counter then render
  incrementCounter() {
    model.currentCat.clickCount++;
    catView.render();
    adminView.render();
  }
};

//View(s)
const catView = {
  init() {
    //store pointers to DOM elements for later access
    this.catEl = document.querySelector(".cat");
    this.catNameEl = document.querySelector(".cat-name");
    this.catImgEl = document.querySelector(".cat-img");
    this.catCountEl = document.querySelector(".cat-count");
    //on click, increment cat's counter
    this.catImgEl.addEventListener("click", () => octopus.incrementCounter());
    //render this view
    this.render();
  },

  render() {
    //Update DOM
    const currentCat = octopus.currentCat;
    this.catNameEl.innerText = currentCat.name;
    this.catImgEl.src = currentCat.imgSrc;
    this.catCountEl.innerText = currentCat.clickCount;
  }
};

const catListView = {
  init() {
    //store Dom Element for later access
    this.catListEl = document.getElementById("cat-list");
    //get cats from octopus
    const cats = octopus.cats;

    //add listener on select element
    this.catListEl.addEventListener("change", e => {
      const cat = cats.find(cat => cat.name === e.target.value);
      octopus.currentCat = cat;
      catView.render();
      adminView.render();
    });

    //render this
    this.render();
  },

  render() {
    const cats = octopus.cats;
    // empty the cat list
    this.catListEl.innerHTML = "";

    //loop over cats
    for (const cat of cats) {
      //new loop
      const option = document.createElement("option");
      option.value = cat.name;
      option.innerText = cat.name;
      this.catListEl.add(option);
    }
    this.catListEl.value = octopus.currentCat.name;
  }
};

//premium pro version !!
const adminView = {
  init() {
    // store DOM element for later access
    this.adminBtn = document.querySelector(".admin-button");
    this.adminArea = document.querySelector(".admin");
    this.saveBtn = document.querySelector(".save");
    this.cancelBtn = document.querySelector(".cancel");
    this.adminName = document.querySelector("#name");
    this.adminImg = document.querySelector("#imgUrl");
    this.adminCount = document.querySelector("#clicks");

    // admin click listener to toggle visibility
    this.adminBtn.addEventListener("click", () => {
      this.adminArea.classList.toggle("hidden");
    });

    // cancel button hides admin area
    this.cancelBtn.addEventListener("click", () =>
      this.adminArea.classList.add("hidden")
    );

    // save button grabs values, sets current cat with new data
    this.saveBtn.addEventListener("click", () => {
      // grab values of new data
      const newCat = {
        name: this.adminName.value,
        imgSrc: this.adminImg.value,
        clickCount: this.adminCount.value
      };

      // get current index of cat
      const currentCatIndex = octopus.cats.findIndex(
        cat => octopus.currentCat === cat
      );

      // set cat with new data, set new currentCat
      octopus.cats[currentCatIndex] = newCat;
      octopus.currentCat = octopus.cats[currentCatIndex];

      // update catView and catListView
      catView.render();
      catListView.render();
    });
    this.render();
  },
  render() {
    const currentCat = octopus.currentCat;
    this.adminName.value = currentCat.name;
    this.adminImg.value = currentCat.imgSrc;
    this.adminCount.value = currentCat.clickCount;
  }
};

//initialize
octopus.init();
