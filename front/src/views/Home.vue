<template>
  <div class="container">
    <div class="container">
      <div class="row navbardev">
        <div class="row justify-content-end align-items-start">
          <div class="col-11 align-self-start">
            <a href="/" style="text-decoration: none; color: black;">
              <h1 >DevCrud</h1>
            </a>
          </div>
          <div class="col-1 align-self-center">
            <router-link to="/about">
              <button type="button" class="btn btn-success">Novo</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.devList.length === 0" class="alert alert-secondary" role="alert">
      Nenhum dado foi encontrado, clique em criar para cadastrar um novo dev!
    </div>
    <div class="row justify-content-center"> 
      <div class="col" v-for="dev in devList" :key="dev.id">  
        <div class="card" style="width: 18rem;">
          <div class="row justify-content-center">
            <img v-if="dev.avatar == ''" class="cardImage" src="../assets/user-solid.svg" alt="...">
            <img v-else :src="dev.avatar" class="cardImage" alt="...">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{dev.name}}</h5>
            <div class="row">
              <p class="card-text col">{{dev.age}} Anos</p>
              <p class="card-text col">Exp: {{dev.timeExp}}</p>
            </div>
            <ul class="social-icons">
              <li>
                  <a :href="`https://github.com/${dev.github_name}`">
                    <i class="fab fa-github"></i>
                  </a>
              </li>
              <li>
                <a :href="dev.linkedin">
                  <i class="fa fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a @click="editDev(dev.id)">
                  <i class="far fa-edit"></i>
                </a>
              </li>
              <li>
                <a @click="deleteDev(dev.id)">
                  <i class="far fa-trash-alt"></i>
                </a>
              </li>
            </ul>
            <p class="card-text">{{dev.bio}}</p>
            <p class="card-text"><small class="text-muted">Criado em: {{dev.createdAt.split('T')[0]}}</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      devList: 'getDevsList'
    })
  },
  mounted () {
    this.getDevList();
  },
  methods: {
    ...mapActions(['getDevList']),

    async deleteDev(id){
      this.$devsApi.delete(`/devs/${id}`)
      .then(() => {
        this.getDevList(true)
      })
    },

    editDev(id){
      this.$router.push({ path: `/about/${id}`})
    }
  }
}
</script>

<style scoped>
  /* img {
    height: 287px;
    width: 287px;
  } */

  .card-title {
    text-align: start;
    margin: 0px;
  }

  .card-git {
    text-align: start;
    font-size: 13px;
  }
  
  .bio {
    text-align: start;
  }

  .excluir {
    margin-left: 4px;
  }

  .card {
    height: 90vh;
    border-radius: 5px;
    background-color: #222831;
    color: white;
    margin-bottom: 10px;
  }

  .cardImage {
    height: 170px;
    width: 170px;
    border-radius: 50%;
    padding: 0;
    /* border: 5px solid #272133; */
    margin-top: 20px;
    box-shadow: 0 10px 40px rgba(235, 25, 110, 1); 
  }

  .card-title {
    margin-top: 20px;
    text-align: center;
  }

  .cardlist:hover {
    box-shadow: 4px 4px 2px #888888;
  }

  .social-icons {
  padding: 0;
  list-style: none;
  margin: 1em;
}

.social-icons li {
  display: inline-block;
  margin: 0.15em;
  position: relative;
  font-size: 1em;
}

.social-icons i {
  color: #fff;
  position: absolute;
  top: 0.95em;
  left: 0.96em;
  transition: all 265ms ease-out;
}

.social-icons a {
  display: inline-block;
}

.social-icons a:before {
  transform: scale(1);
  -ms-transform: scale(1);
  -webkit-transform: scale(1);
  content: " ";
  width: 45px;
  height: 45px;
  border-radius: 100%;
  display: block;
  background: linear-gradient(45deg, #ff003c, #c648c8);
  transition: all 265ms ease-out;
}

.social-icons a:hover:before {
  transform: scale(0);
  transition: all 265ms ease-in;
}

.social-icons a:hover i {
  transform: scale(2.2);
  -ms-transform: scale(2.2);
  -webkit-transform: scale(2.2);
  color: #ff003c;
  background: -webkit-linear-gradient(45deg, #ff003c, #c648c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 265ms ease-in;
}
</style>
