<template>
  <div class="container">
    <div class="row">
      <div class="row justify-content-end align-items-start">
        <div class="col-9 align-self-start">
          <h1 >DevCrud</h1>
        </div>
        <div class="col-2 align-self-center">
          <button 
            @click="handleActionButton()" 
            class="btn btn-success">{{ buttonLabel }}
          </button>
        </div>
        <div class="col-1 align-self-center">
          <router-link to="/">
            <button type="button" class="btn btn-primary">Voltar</button>
          </router-link>
        </div>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-8">
          <div for="name" class="form-label">Nome</div>
          <input type="email" v-model="dev.name" class="form-control" id="name" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">Não erre o seu próprio nome rsrs.</div>
        </div>
        <div class="col-4">
          <div class="mb-3">
            <div for="timeExp" class="form-label">Tempo de experiencia</div>
            <input type="text" v-model="dev.timeExp" class="form-control" id="timeExp">
          </div>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-2">
          <div class="mb-3">
            <div for="age" class="form-label">Idade</div>
            <input type="number" v-model="dev.age" class="form-control" id="age">
          </div>
        </div>
        <div class="col-7">    
          <div class="mb-3">
            <div for="gitname" class="form-label">Nome no GitHub:</div>
            <input type="text" v-model="dev.github_name" class="form-control" id="gitname">
          </div>
        </div>
        <div class="col-1 ">
          <button @click="getGithubAccount()" class="btn btn-primary">Carregar</button>
        </div>
        <div class="col-2">
          <img v-if="dev.avatar == ''" src='../assets/user-solid.svg'>
          <img v-if="dev.avatar.length != 0" :src="dev.avatar">
        </div>
      </div>
      <div class="mb-3">
        <div for="linkedin" class="form-label">Linkedin</div>
        <input type="text" v-model="dev.linkedin" class="form-control" id="linkedin">
      </div>
    </div>

    <div v-if="!isValid && hasError" class="alert alert-danger" role="alert">
      Preencha todos os campos.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    hasError: false,
    dev: {
      name: '',
      timeExp: '',
      age: '',
      github_name: '',
      linkedin: '',
      avatar: '',
      bio: ''
    }
  }),
  computed: {
    buttonLabel() {
      return this.$route.params.id  != undefined ? "Concluir" : "Criar";
    },
    routeId() {
      return this.$route.params?.id
    },
    isUpdate() {
      return Boolean(this.$route.params?.id)
    },
    isValid () {
      const values = Object.values(this.dev)
      return values.filter(field => Boolean(field)).length == values.length
    }
  },
  mounted () {
    if(this.isUpdate){
      this.getDev()
    }
  },
  methods: {
    handleActionButton(){
      this.validateFields().then(() => {
        this.handleSaveData()        
        this.hasError = false
      }).catch(() => {
          this.hasError = true
      })
    },

    handleSaveData() {
      const action = this.isUpdate ? this.update : this.create
      action().then(() => {
        this.$router.push({ name: 'Home' })
      })
    },

    validateFields() {
      return new Promise((resolve, reject) => {
        if (this.isValid) {
          resolve()
        } else {
          reject()
        }
      })
    },

    async create(){
      return this.$devsApi.post('/devs', this.dev)
    },
    async update(){
      return this.$devsApi.put(`/devs/${this.dev.id}`, this.dev)
    },
    async getGithubAccount(){
      this.$githubApi.get(`/users/${this.dev.github_name}`)
        .then(res => {
          const data = res.data;
          this.dev = {
            ...this.dev,
            avatar: data.avatar_url,
            bio: data.bio,
          }
        }).catch(error => {
          console.error(error)
        })
    },

    async getDev(){
      this.$devsApi.get(`/devs/${this.routeId}`)
        .then(({ data }) => {
          this.dev = data
        }).catch(error => {
          console.error(error)
        })
    },
  }
}
</script>

<style>
  .form-label {
    text-align: start;
    margin: 0;
  }
  img {
    height: 80px;
    width: 80px;
  }

</style>
