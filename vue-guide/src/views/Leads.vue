<template>
  <form class="leads-form" @submit="handleSubmit">
    <div class="input">
      <span>
        Nome
        <span style="color: red;">*</span>
      </span>
      <input
        v-model="nome"
        type="text"
        name="nome"
        placeholder="Nome"
        title="Insera seu nome aqui"
        oninvalid="this.setCustomValidity('Por favor, preencha este campo.')"
        oninput="setCustomValidity('')"
        required
      />
    </div>

    <div class="input">
      <span>
        E-mail
        <span style="color: red;">*</span>
      </span>
      <input
        v-model="email"
        type="email"
        name="email"
        placeholder="Email"
        title="Insera seu email aqui"
        oninvalid="this.setCustomValidity('Por favor, preencha este campo.')"
        oninput="setCustomValidity('')"
        required
      />
    </div>

    <div class="input">
      <span>
        Cargo
        <span style="color: red;">*</span>
      </span>
      <input
        v-model="cargo"
        type="text"
        name="cargo"
        placeholder="Cargo"
        title="Insera seu cargo aqui"
        oninvalid="this.setCustomValidity('Por favor, preencha este campo.')"
        oninput="setCustomValidity('')"
        required
      />
    </div>

    <div class="input">
      <span>Telefone</span>
      <input
        v-model="telefone"
        @input="formatNumber"
        type="tel"
        name="telefone"
        placeholder="Telefone"
        title="Insera seu telefone aqui"
      />
    </div>

    <div class="input">
      <span>Empresa</span>
      <input
        v-model="empresa"
        type="text"
        name="empresa"
        placeholder="Empresa"
        title="Insera seu o nome da sua empresa aqui"
      />
    </div>

    <button type="submit" class="submit-button">Baixar Pesquisa</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Leads",
  data: function() {
    return {
      nome: null,
      email: null,
      cargo: null,
      telefone: "",
      empresa: "",
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      if (
        this.telefone.search(/\+(\d{2})/) === -1 &&
        this.telefone.length !== 0
      ) {
        this.telefone = "55" + this.telefone;
        this.telefone = this.telefone.replace(
          /(\d{2})(\d{2})(\d{5})(\d{4})/,
          "+$1 ($2) $3-$4"
        );
      }

      let user = {
        nome: this.nome,
        email: this.email,
        cargo: this.cargo,
        telefone: this.telefone,
        empresa: this.empresa,
      };

      axios
        .post("http://localhost:3000/leads", user)
        .then((response) => {
          if (response.data) {
            this.downloadPDF();
          }
          // this.$router.push("/");
        })
        .catch((err) => {
          console.log(`Post error: ${err.message}`);
        });
    },
    formatNumber() {
      var x = this.telefone.replace(/\D/g, "");
      this.telefone = x.replace(
        /(\d{2})(\d{2})(\d{5})(\d{4})/,
        "+$1 ($2) $3-$4"
      );
    },
    downloadPDF() {
      axios({
        url: "http://localhost:3000/files",
        method: "get",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Example.pdf");
        link.click();
      });
    },
  },
};
</script>

<style scoped>
form.leads-form {
  display: flex;
  flex-direction: column;

  width: 90%;
  height: 100%;
  max-width: 1120px;

  margin: 32px auto;
}

form .input {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}

form .input span {
  margin-bottom: 9px;
}

form .input input {
  padding: 14px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

form button {
  width: 100%;
  padding: 15px;

  border: none;
  border-radius: 7px;

  color: white;
  font-weight: 700;

  background-color: #00c9a7;

  transition: all 0.7s;
}

form button:hover {
  background-color: #00856f;
}
</style>
