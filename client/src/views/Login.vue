<template>
  <div class="login">
    <h1>This login page</h1>
    <form>
        <label for="username">Username:</label><br>
        <input v-model="login.username" type="text" id="username" name="username" ><br>
        <label for="password">Password:</label><br>
        <input v-model="login.password" type="password" id="password" name="password" ><br><br>
        <button @click="submitLogin" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
//let local = "http://localhost:3000"
export default {
  data(){
    return{
      error:'',
      login:{
        username: '',
        password: ''
      }
    }
  },

  created(){
    let token = localStorage.getItem('token')
    if(token){
      console.log('ok')
      window.location.replace('/main')
    }
  },

  methods: {
    submitLogin(event){
      event.preventDefault();
      console.log(this.login)
      axios.post(`http://localhost:3000/user/login`, this.login)
      .then(result=>{
        console.log("result")
        console.log(result.data.token)
        window.location.replace('/main')
        //let token = result.token
        // console.log(token)
        // localStorage.setItem('token', token)
      })
      .catch(err=>{
        console.log('eror')
        console.log(err.response)
        this.error = err
      })
    }
  }
}

</script>