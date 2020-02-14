<template>
<div>
  <h1>Chuck Norris Jokes</h1>
<img src="https://s3.amazonaws.com/mf-cnorris/assets/uploads/2016/10/19123509/timeline-05.jpg" width="500px" height="500px">
<p>{{searchResultsCount}} search results found </p>
<div style="width:1000px;height:500px;line-height:3em;overflow:scroll;padding:5px;">
<p v-for="result in searchResults" v-bind:value="result.value" :key="result.value" >{{result["value"]}}</p>
</div>
<input type="text" v-model="searchString">
<button @click="searchForJoke()">Search for Joke</button>
<br>
<br>


<select v-model="selectedCategory">
<option disabled value="">Select a Joke Category</option>
<option v-for="category in categories"  v-bind:key="category">{{category}}</option>
</select>

<p>{{categoryJoke}}</p>
<button @click="getCategoryJoke()">Get Joke based on category</button>


<p id="randomJoke">{{randomJoke}}</p>
<span>Toggle Random Jokes  </span>
<toggle-button @change="toggleRandomJoke()" v-model="randomJokeDisplay"/>

</div>
</template>

<script>


export default {
  name: 'App',
  data: function() {

      return {
      categoryJoke: "",
      randomJoke: "",
      randomJokeDisplay: true,
      interval: null,
      selectedCategory: "",
      categories: [],
      searchString: "",
      searchResults: [],
      searchResultsCount: 0
      }
      
      
    
  },
  methods: {
      getRandomJoke: function(){
          this.$http.get("https://api.chucknorris.io/jokes/random")
          .then(value => { return value.json();})
          .then(jsonValue => {
              this.randomJoke = jsonValue["value"];
              
          }
          );
      },

     randomJokeTimer: function(){
        this.interval = setInterval(function () { this.getRandomJoke() }.bind(this), 5000);
     },

     toggleRandomJoke: function(){
         
         if(this.randomJokeDisplay == false)
        {
            
            clearInterval(this.interval);
            this.randomJoke = "Random jokes stopped.";
            
        }
        else
        {
            
            this.getRandomJoke();
            this.randomJokeTimer();
            
        }
     },

     getCategories: function(){
        
        this.$http.get("https://api.chucknorris.io/jokes/categories")
          .then(value => { return value.json();})
          .then(jsonValue => {
              var categoryResults = [];

              for(let key in jsonValue)
                {   
                    categoryResults.push(jsonValue[key]);
                }
              
            this.categories = categoryResults;
              

          }
          );
        },

        getCategoryJoke: function(){

            if(this.selectedCategory != "")
            {
                var url = "https://api.chucknorris.io/jokes/random?category=" + this.selectedCategory;

                this.$http.get(url)
                .then(value => { return value.json();})
                .then(jsonValue => {
                this.categoryJoke = jsonValue["value"];
                
                
                });
            }
            else
            {
                alert("Select a category first");
            }
          

        },

        searchForJoke: function(){

            if(this.searchString != "")
            {
                var url = "https://api.chucknorris.io/jokes/search?query=" + this.searchString;

                this.$http.get(url)
                .then(value => { return value.json();})
                .then(jsonValue => {
                    var jsonResults = [];
                    for(let key in jsonValue)
                    {   
                        jsonResults.push(jsonValue[key]);
                    }
                    this.searchResultsCount = jsonResults[0];

                    var finalSearchResults = [];
                    var results = jsonResults[1]
                    for(let key in results)
                    {   
                        finalSearchResults.push(results[key]);
                    }
                    this.searchResults = finalSearchResults;
                    
                });
            }
            else
            {
                alert("Enter a search term first.");
            }

}


      

  },

  mounted () {
      this.getRandomJoke();
      this.randomJokeTimer();
      this.getCategories();
          
      
    }
  

  
}
</script>


