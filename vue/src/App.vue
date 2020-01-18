<template>
  <div id="app">
    <div class="container">
      <aside>
        <strong>Cadastrar</strong>
        <dev-form :on-submit="handleAddDev" />
      </aside>
      <main>
        <ul>
          <dev v-for="dev in devs" :key="dev._id" :dev="dev" :handle-remove="handleRemoveDev" />
        </ul>
      </main>
    </div>
  </div>
</template>

<script>
import api from './services/api';
import DevForm from './components/DevForm.vue';
import Dev from './components/Dev.vue';

export default {
  name: 'App',
  components: {
    DevForm,
    Dev,
  },
  data() {
    return {
      devs: [],
    };
  },
  mounted() {
    this.getDevs();
  },
  methods: {
    async handleAddDev(data) {
      const response = await api.post('devs', data);

      this.devs.push(response.data);
    },
    async handleRemoveDev(id) {
      await api.delete(`devs/${id}`);

      this.devs = this.devs.filter(dev => dev._id !== id);
    },
    async getDevs() {
      const response = await api.get('devs');

      this.devs.push(...response.data);
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body,
input,
button {
  font-family: 'Roboto', sans-serif;
}

html,
body,
#app {
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #e5e6f0;
  overflow: auto;

  .container {
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 30px;
    display: flex;
    align-items: flex-start;

    aside {
      width: 320px;
      background: #fff;
      box-shadow: 0 0 14px rgba(0, 0, 0, 0.02);
      border-radius: 2px;
      padding: 30px 20px;

      strong {
        font-size: 20px;
        text-align: center;
        display: block;
        color: #333;
      }
    }

    main {
      flex: 1;
      margin-left: 30px;

      ul {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;

        @media (max-width: 650px) {
          grid-template-columns: 1fr;
        }
      }
    }

    @media (max-width: 1000px) {
      flex-direction: column;

      aside {
        width: 100%;
      }

      main {
        width: 100%;
        margin-left: 0;
        margin-top: 30px;
      }
    }
  }
}
</style>
