<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-block">
      <label for="github_user">Usuário do Github</label>
      <input v-model="github_user" id="github_user" type="text" name="github_user" required />
    </div>

    <div class="input-block">
      <label for="techs">Tecnologias</label>
      <input v-model="techs" id="techs" type="text" name="techs" required />
    </div>

    <div class="input-group">
      <div class="input-block">
        <label for="latitude">Latitude</label>
        <input v-model="latitude" id="latitude" name="latitude" />
      </div>

      <div class="input-block">
        <label for="longitude">Longitude</label>
        <input v-model="longitude" id="longitude" name="longitude" />
      </div>
    </div>

    <button type="submit">
      Salvar
    </button>
  </form>
</template>

<script>
export default {
  name: 'DevForm',
  props: {
    onSubmit: { type: Function, required: true },
  },
  data() {
    return {
      github_user: '',
      techs: [],
      latitude: '',
      longitude: '',
    };
  },
  mounted() {
    this.getGeoLocation();
  },
  methods: {
    async handleSubmit() {
      const formData = {
        github_user: this.github_user,
        techs: this.techs,
        latitude: this.latitude,
        longitude: this.longitude,
      };

      await this.onSubmit(formData);
      this.github_user = '';
      this.techs = [];
    },
    getGeoLocation() {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          this.latitude = latitude;
          this.longitude = longitude;
        },
        error => {
          console.log(error);
        },
        {
          timeout: 30000,
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
form {
  margin-top: 30px;

  .input-block {
    & + .input-block {
      margin-top: 20px;
    }

    label {
      color: #acacac;
      font-size: 14px;
      font-weight: bold;
      display: block;
    }

    input {
      width: 100%;
      height: 32px;
      font-size: 14px;
      color: #666;
      border: 0;
      border-bottom: 1px solid #eee;
    }
  }

  .input-group {
    margin-top: 20px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2, 1fr);

    .input-block {
      margin-top: 0;
    }
  }

  button[type='submit'] {
    width: 100%;
    border: 0;
    margin-top: 30px;
    background: #7d40e7;
    border-radius: 3px;
    padding: 15px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    transition: background 0.4s;

    &:hover {
      background: #6931ca;
    }
  }
}
</style>
