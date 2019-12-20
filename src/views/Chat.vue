<template>

  <div id="chat-future" class="chat">
    <h1 id="futureHead" class="head">Welcome To {{this.chatType}} Robo Helper</h1>
    <div id="type" >
      <form @submit.prevent="sendMessage('out')">
        <input type="text" id="input" v-model="outMessage.message" autocomplete="off">
      </form>
    </div>

    <section class="chat-area">

      <div v-if="this.isFuture" id="future">
        <p
          v-for="message in messages"
          class = "message"
          :class="{ 'botmessage-future' : message.author !== 'user', 'usermessage' : message.author === 'user'}"
          :key="message.message"
        ><span v-html="message.message">{{message.message}}</span></p>
      </div>

      <div v-if="this.isChristmas" id="christmas"> 
        <p
          v-for="message in messages"
          class = "message"
          :class="{ 'botmessage-christmas' : message.author !== 'user', 'usermessage' : message.author === 'user'}"
          :key="message.message"
        ><span v-html="message.message">{{message.message}}</span></p>
      </div>

        <div v-if="this.isOffice" id="office"> 
        <p
          v-for="message in messages"
          class = "message"
          :class="{ 'botmessage-office' : message.author !== 'user', 'usermessage' : message.author === 'user'}"
          :key="message.message"
        ><span v-html="message.message">{{message.message}}</span></p>
      </div>
            
    <div v-if="this.isClassroom" id="classroom">  
        <p
          v-for="message in messages"
          class = "message"
          :class="{ 'botmessage-classroom' : message.author !== 'user', 'usermessage' : message.author === 'user'}"
          :key="message.message"
        ><span v-html="message.message">{{message.message}}</span></p>
      </div>

    </section>
    <section class="bottom-button">
        <div id=button>
            <button v-on:click="randomizeBackground()">Try A New Theme!</button>
        </div>
    </section>

  </div>
</template>

<script>

export default {
  name: "chat",
  currentTheme: '',
  currPathway: "",
  currCurric: "",
  allPathways: [],
  pathwayTopics: "",
  allQuotes: [],
  allCurriculums: [],
  curriculumTopics: "",
  data() {
    return {
      outMessage: {
          username: '',
          message: ""
      },
      inMessage: {
          username: '',
          message: ""
      },
      messages: [{message: 'Greetings User, what is your name?', author: 'user', isFuture: true}],
      chatType: 'Futuristic',
      isOffice: false,
      isClassroom: false,
      isFuture: true,
      isChristmas: false,
    };
  },
  methods: {

    randomizeBackground: function() {
        let currentId = document.querySelector('.chat');
        let currentHead = document.querySelector('.head')
        let allIds = [{background: 'chat-office', font: 'botmessage-office', head1: 'officeHead', descriptor: 'Professional Office', currentTheme: 'office'}, 
                        {background: 'chat-classroom', font: 'botmessage-classroom', head1: 'classroomHead', descriptor: 'Educational Classroom', currentTheme: 'classroom'}, 
                        {background: 'chat-future', font: 'botmessage-future', head1: 'futureHead', descriptor: 'Futuristic', currentTheme: 'future'}, 
                        {background: 'chat-christmas', font: 'botmessage-christmas', head1: 'christmasHead', descriptor: 'Festive Christmastime', currentTheme: 'christmas'}];
        let newId = allIds[Math.floor(Math.random() * Math.floor(4))];
        currentId.setAttribute('id', newId.background);
        currentHead.setAttribute('id', newId.head1);
        this.chatType = newId.descriptor;
        if(this.chatType === 'Office'){
            this.isOffice = true;
            this.isClassroom = false;
            this.isFuture = false;
            this.isChristmas = false;
        } else if (this.chatType === 'Futuristic') {
            this.isOffice = false;
            this.isClassroom = false;
            this.isFuture = true;
            this.isChristmas = false;
        } else if (this.chatType === 'Christmastime') {
            this.isOffice = false;
            this.isClassroom = false;
            this.isFuture = false;
            this.isChristmas = true;
        } else {
            this.isOffice = false;
            this.isClassroom = true;
            this.isFuture = false;
            this.isChristmas = false;
        }
    },  

    ScrollToEnd: function() {
    let container = this.$el.querySelector(".chat-area");
    container.scrollTop = container.scrollHeight;
    },
    
    sendMessage(direction) {
        
        if(this.outMessage.username == ''){
            this.outMessage.username = this.outMessage.message
            
            let message = `Welcome ${this.outMessage.username}! `;
            this.messages.push({ message });

            this.createPathwayArray();
            this.createCurriculumArray();

        } else {
            
            if (direction === 'out') {
            let message = `${this.outMessage.username}: ${this.outMessage.message} `;
            this.messages.push({ message, author: 'user' });

            if (this.outMessage.message.toLowerCase().includes("help") || this.outMessage.message.toLowerCase().includes("ask") || this.outMessage.message.toLowerCase().includes("question")) {
                //&nbsp adds a bit of spacing
                let message = "I Can Help You With Information About Pathway Program, Academic Curriculum, Open Positions, or Would You Like Me To Deliver To You A Motivational Quote?";
                this.messages.push({ message });
             } 
              else if (this.outMessage.message.includes("quote")) {
                fetch(`https://api.quotable.io/random`, {

                })
                .then((response) => {
                   console.log('Fail', response);
                   return response.json();
                    
                })
                .then((data) => {
                    console.log("pass?");
                    this.allQuotes = data
                       let currQuote = this.allQuotes.content
                       this.messages.push({message: currQuote});
                    
                })
                    .catch((err) => {
                        console.error(err);
                     });
                     
                }
                 else if (this.outMessage.message.toLowerCase().includes("pathway")) {
                    this.pathwayMethod();
                    this.outMessage.message = "";  
                    this.ScrollToEnd(); 
                } 
                else if (this.pathwayTopics.toLowerCase().includes(this.outMessage.message.toLowerCase())){
                    this.createPathwayDescArray(this.outMessage.message);
                    this.ScrollToEnd(); 
                }
                else if (this.outMessage.message.toLowerCase().includes("curriculum")) {
                    this.curriculumMethod();
                    this.outMessage.message = "";  
                    this.ScrollToEnd(); 
                }
                else if (this.curriculumTopics.toLowerCase().includes(this.outMessage.message.toLowerCase())){
                    this.createCurriculumDescArray(this.outMessage.message);
                    this.ScrollToEnd();
                } 
                else if (this.outMessage.message.toLowerCase().includes("job")) {
                    this.messages.push({message: "What job title would you like to search for?"});
                    this.outMessage.message = "";  

                }  
                else if (this.outMessage.message.includes("music")) {
                    this.messages.push({message: `Check these guys out: <a href="https://www.youtube.com/watch?v=JTp4zD93fxo">CHILDREN OF REGAN</a>`})
                }

                else {
                        let jobTitle = this.outMessage.message; 
                        this.messages.push({message: `Here you go: <a href="https://www.indeed.com/jobs?q=${jobTitle}&l=Columbus%2C+OH"> ${jobTitle}</a> Job Search`});
                        this.outMessage.message = ""; 
                }

      } else if (direction === 'in'){
          this.messages.push({ message: "test", author: 'bot' });
      } else {
        alert("something went wrong");
      }
    }
    this.ScrollToEnd();
    this.outMessage.message = "";  
    },
    createPathwayArray: function(){
    //api call to get array of topics, save in data
     fetch(`${process.env.VUE_APP_REMOTE_API}/chat/pathway`, {
                     
                        })
                        .then((response) => {
                            console.log( response);
                            return response.json();
                        })
                        .then((data) => {
                            this.allPathways = data
                            this.allPathways.forEach(pathway => {
                                this.currPathway =  pathway.topic; 
                               this.pathwayTopics = this.pathwayTopics + this.currPathway;
                            }) 
                        })                   

                    .catch((err) => {
                        console.error(err);
                     });
                     
    },
    createCurriculumArray: function(){
     fetch(`${process.env.VUE_APP_REMOTE_API}/chat/curriculum`, {
                     
                        })
                        .then((response) => {
                            console.log(response);
                            return response.json();
                        })
                        .then((data) => {
                            this.allCurriculums = data
                            this.allCurriculums.forEach(curriculum => {
                               let currCurric =  curriculum.topic; 
                               this.curriculumTopics = this.curriculumTopics + currCurric;
                            })
                        })
                    .catch((err) => {
                        console.error(err);
                     });
    },
    pathwayMethod: function() {
        fetch(`${process.env.VUE_APP_REMOTE_API}/chat/pathway`, {
                     
                        })
                        .then((response) => {
                            console.log( response);
                            return response.json();
                        })
                        .then(() => {
                            this.allPathways.forEach(pathway => {
                                let currPathway =  pathway.topic; 
                                this.messages.push({message: `-${currPathway}` });
                            })
                            
                        })                   

                    .catch((err) => {
                        console.error(err);
                     });
                     
    },
    curriculumMethod: function() {
        fetch(`${process.env.VUE_APP_REMOTE_API}/chat/pathway`, {
                     
                        })
                        .then((response) => {
                            console.log( response);
                            return response.json();
                        })
                        .then(() => {
                            this.allCurriculums.forEach(curriculum => {
                                let currCurric =  curriculum.topic; 
                                this.messages.push({message: `-${currCurric}` });
                            })
                            
                        })                   

                    .catch((err) => {
                        console.error(err);
                     });
                     
    },

    createPathwayDescArray: function(word){
        
            fetch(`${process.env.VUE_APP_REMOTE_API}/chat/pathway`, {
                     
                        })
                        .then((response) => {
                            console.log('Fail', response);
                            return response.json();
                        })
                        .then((data) => {
                            
                            this.allPathways = data

                            this.allPathways.forEach(element => { //this
                                if (word === element.topic) {
                                    this.messages.push({message: `${element.description}`});
                                    this.messages.push({message: `${element.link}`});
                                } 
                             })
                                
                            })

                    .catch((err) => {
                        console.error(err);
                     });
                     
    },

    createCurriculumDescArray: function(word){
        
            fetch(`${process.env.VUE_APP_REMOTE_API}/chat/curriculum`, {
                     
                        })
                        .then((response) => {
                            console.log('Fail', response);
                            return response.json();
                        })
                        .then((data) => {
                            
                            this.allCurriculums = data

                            this.allCurriculums.forEach(element => { //this
                                if (word === element.topic) {
                                    this.messages.push({message: `${element.description}`});
                                    this.messages.push({message: `${element.link}`});
                                } 
                             })
                                
                            })

                    .catch((err) => {
                        console.error(err);
                     });
                     
    }


  }

};

</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap');
@import url('https://fonts.googleapis.com/css?family=Mountains+of+Christmas&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
@import url('https://fonts.googleapis.com/css?family=Schoolbell&display=swap');


html {
    background-color: black;
    height: 1420px;
}

#button {
    display: block;
    text-align: center;
}

.message {
    width: 45%;
  border-radius: 10px;
  padding: 0.5em;
  /*   margin-bottom: .5em; */
  font-size: 0.8em;
  background-color: lightgreen;
}

.message:nth-child(1) {
    margin-left: 175px;
    background-color: lightblue;
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
}

#futureHead {
    color: lightgreen;
    font-family: 'Press Start 2P', cursive;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

#officeHead {
    color: #e80101;
    font-family: 'Roboto Slab', serif;
    text-shadow: -1px 0 black, 0 2px black, 2px 0 black, 0 -1px black;
    font-size: 150%;
}

#classroomHead {
    color: #19d3ff;
    font-family: 'Schoolbell', cursive;
    text-shadow: -1px 0 black, 0 3px black, 3px 0 black, 0 -1px black;
}

#christmasHead {
    color: #07bf07;
    font-family: 'Mountains of Christmas', cursive;
    text-shadow: -1px 0 black, 0 3px black, 3px 0 black, 0 -1px black;
}

.usermessage {
    display: flex;
    background-color: lightgreen;
}

.botmessage-future {
    display: flex;
    margin-left: 175px;
    background-color: lightblue;
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
}

.botmessage-christmas {
    display: flex;
    margin-left: 175px;
    background-color: lightblue;
    font-family: 'Mountains of Christmas', cursive;
    font-size: 17px;
}

.botmessage-office {
    display: flex;
    margin-left: 175px;
    background-color: lightblue;
    font-family: 'Roboto Slab', serif;
    font-size: 15px;
}

.botmessage-classroom {
    display: flex;
    margin-left: 175px;
    background-color: lightblue;
    font-family: 'Schoolbell', cursive;
    font-size: 15px;
    
}

#input {
  width: 300px;
  border-radius: 5rem;
  font-size: 15px;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
  background: rgba(211,211,211, .7);
}

#type {
  padding-bottom: 10px;
}

.userInput {
  padding-bottom: 10px;
}

#chat-future {
  text-align: center;
  background-image: url("../assets/funky.jpg");
  background-size: cover;
  margin-left: 500px;
  margin-right: 500px;
  padding-top: 15px;
  padding-bottom: 15px;
}

#chat-christmas {
  text-align: center;
  background-image: url("../assets/christmas.jpg");
  background-size: cover;
  margin-left: 500px;
  margin-right: 500px;
  padding-top: 15px;
  padding-bottom: 15px;
}

#chat-office {
  text-align: center;
  background-image: url("../assets/office.jpg");
  background-size: cover;
  margin-left: 500px;
  margin-right: 500px;
  padding-top: 15px;
  padding-bottom: 15px;
}

#chat-classroom {
  text-align: center;
  background-image: url("../assets/classroom.jpg");
  background-size: cover;
  margin-left: 500px;
  margin-right: 500px;
  padding-top: 15px;
  padding-bottom: 15px;
}

/* #chat-future {
  text-align: center;
  background-color: green;
  background-size: cover;
  margin-left: 500px;
  margin-right: 500px;
  padding-top: 15px;
  padding-bottom: 15px;
} */

.chat-area {
  /*   border: 1px solid #ccc; */
  background: rgba(211,211,211, .7);
  height: 50vh;
  padding: 1em;
  overflow: auto;
  max-width: 350px;
  margin: 0 auto 2em auto;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
}

@media only screen and (min-width: 320px) {
    #app {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    }

     #chat-future.chat {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    }

    #chat-office.chat {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    }

    #chat-classroom.chat {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    }

    #chat-christmas.chat {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    }
}

@media only screen and (min-width: 1024px) {
    #app {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    }

    #chat-future.chat {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    }

    #chat-office.chat {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    }

    #chat-classroom.chat {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    }

    #chat-christmas.chat {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    }
}

</style>
