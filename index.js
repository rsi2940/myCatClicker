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

    //loop over cats
    for (const cat of cats) {
      //new loop
      const option = document.createElement("option");
      option.value = cat.name;
      option.innerText = cat.name;
      this.catListEl.appendChild(option);
    }
    //add listener on select element
    this.catListEl.addEventListener("change", e => {
      const cat = cats.find(cat => cat.name === e.target.value);
      octopus.currentCat = cat;
      catView.render();
      //this.render();
    });

    //render this
    // this.render();
  },

  render() {}
};

//initialize
octopus.init();
