<template>
  <div id="home">
    <h2>Home</h2>

    <div id="login">
        <div class="loginsection">
          <p class="user">User Login: </p>
          <input type="textbox" placeholder="Username"/>
            <div class="password">
              <input type="textbox" placeholder="Password"/>
            </div>
         <a href="placeholder"><button>Submit</button></a>
        </div>

    <div id='guest-section'>
      <p class="guest">Guest Chat: </p>
        <div class="guestbutton">
          <a href="chat"> <button>Get To Chat</button> </a>
        </div>
    </div>
    </div>
  </div>

   
</template>

<script>
export default {
  name: 'home',
};
</script>

<style>

#login {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: "login . guest";

}

.loginsection {
  grid-area: login;
  padding-top: 20px;
  padding-right: 620px;
}

#guest-section {
  grid-area: guest;
}

.guest {
  color: lightgreen;
}
.user {
  color: lightgreen;
}
.guestbutton {
  padding-bottom: 10px
}

#username {
  display: flex;
}
.password {
  padding-top: 10px;
  padding-bottom: 10px;  
}
#button {
  display: flex;
}

h2{
  text-align: center;
  color: lightgreen;
}

#login {
  display: relative; 
  background-image: url("../assets/funky.jpg");
  text-align: center;  
  margin-left: 500px;
  margin-right: 500px;
  padding-top: 15px;
  height: 500px;
}
#guest {
  background-color: lightgrey;
  text-align: center;  
  margin-left: 500px;
  margin-right: 500px;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
