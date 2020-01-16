<template>
  <li class="dev-item">
    <header>
      <img :src="dev.avatar_url" :alt="dev.name" />

      <div class="user-info">
        <strong>{{ dev.name }}</strong>
        <span>{{ techs }}</span>
      </div>
    </header>

    <p>{{ dev.bio }}</p>
    <a :href="`https://github.com/${dev.name}`">Acessar perfil no Github</a>
    <button @click="handleRemove(dev._id)">Remover</button>
  </li>
</template>

<script>
export default {
  name: 'Dev',
  props: {
    dev: { type: Object, required: true },
    handleRemove: { type: Function, required: true },
  },
  computed: {
    techs() {
      return this.dev?.techs?.join(', ');
    },
  },
};
</script>

<style lang="scss" scoped>
li.dev-item {
  background: #fff;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 20px;

  header {
    display: flex;
    align-items: center;

    div.user-info {
      margin-left: 10px;

      strong {
        display: block;
        font-size: 16px;
        color: #333;
      }

      span {
        font-size: 13px;
        color: #999;
        margin-top: 2px;
      }
    }

    img {
      width: 54px;
      height: 54px;
      border-radius: 50%;
    }
  }

  p {
    color: #666;
    font-size: 14px;
    line-height: 20px;
    margin: 10px 0px;
  }

  a {
    color: #8e4dff;
    font-size: 14px;
    text-decoration: none;

    &:hover {
      color: #5a2ea6;
    }
  }

  button {
    display: block;
    outline: none;
    background: none;
    border: none;
    margin-top: 3px;
    color: #f53c3c;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: #a71d1d;
    }
  }
}
</style>
