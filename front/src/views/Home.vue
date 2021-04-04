<template>
  <div class="container">
    <div class="container">
      <div class="row navbardev">
        <div class="row justify-content-end align-items-start">
          <div class="col-11 align-self-start">
            <h1 >DevCrud</h1>
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
    <div class="container-fluid">
      <div v-for="dev in devList" :key="dev.id" class="card cardlist mb-3">
        <div class="row g-0 align-items-center">
          <div class="col-md-2">
            <img v-if="dev.avatar == ''" src="../assets/user-solid.svg" alt="...">
            <img v-else :src="dev.avatar" alt="...">
          </div>
          <div class="col-md-10">
            <div class="card-body">
              <div class="row">
                <div class="col-4">
                  <h5 class="card-title">
                    <strong>Nome: </strong>
                    {{dev.name}}
                  </h5>
                  <h6 class="card-git"><strong class="text-muted">GitHub: </strong>{{dev.github_name}}</h6>
                </div>
                <a class="col-5 bio" :href="dev.linkedin">
                  Linkedin
                </a>
                <div class="col">
                  <router-link :to="`/about/${dev.id}`" >
                    <button type="button" class="btn btn-primary">Editar</button>
                  </router-link>
                  <router-link to="/">
                    <button @click="deleteDev(dev.id)" type="button" class="btn btn-danger excluir">Excluir</button>
                  </router-link>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <h6 class="card-git"><strong>Tempo de experiencia: </strong>{{dev.timeExp}}</h6>
                </div>
                <div class="col-5">
                  <h6 class="card-git"><strong>Idade: </strong>{{dev.age}}</h6>
                </div>
              </div>
              <div class="row">
                <strong class="col-1 bio">Bio: </strong>
                <div class="col-10">
                  <p class="card-text">{{dev.bio}}</p>
                </div>
              </div>
              <p class="card-text"><small class="text-muted">Criado em: {{dev.createdAt.split('T')[0]}}</small></p>
            </div>
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
    }
  }
}
</script>

<style scoped>
  img {
    height: 150px;
    width: 150px;
    border-radius: 50px;
  }

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

  .cardlist:hover {
    box-shadow: 4px 4px 2px #888888;
  }
</style>
