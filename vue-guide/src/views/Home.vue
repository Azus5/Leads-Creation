<template>
  <div class="container">
    <h1>Leads</h1>

    <div class="leads">
      <div v-for="lead in leads" :key="lead.id" class="lead">
        <h2>{{ lead.nome }}</h2>
        <div class="lead-contact">
          <span id="first">{{ lead.email }}</span>
          <b>-</b>
          <span>{{ lead.telefone }}</span>
        </div>
        <br />
        <div class="lead-info">
          <span>Cargo: {{ lead.cargo }}</span>
          <span>Empresa: {{ lead.empresa }}</span>
        </div>
        <trash-2-icon size="1.5x" @click="handleDelete(lead.id)" class="delete-button"></trash-2-icon>
      </div>
    </div>
    <div v-if="!leads.hasContent" class="noContent">
      <h3>Não nenhuma lead para mostrar</h3>
    </div>

    <iframe src="http://localhost:8080/leads/create" frameborder="0"></iframe>
  </div>
</template>

<script>
import axios from "axios";
import { Trash2Icon } from "vue-feather-icons";

export default {
  name: "Home",
  components: {
    Trash2Icon
  },
  data: function() {
    return {
      leads: []
    };
  },
  mounted: function() {
    axios({
      url: "http://localhost:3000/leads",
      method: "get"
    })
      .then(response => {
        if (response.data && response.data.length !== 0) {
          this.leads = response.data;
          this.hasContent();
          this.notRequired();
        }
      })
      .catch(err => {
        console.log(`Fail to get Leads, Error: ${err.message}`);
      });
  },
  methods: {
    handleDelete(leadID) {
      for (let lead in this.leads) {
        if (this.leads[lead].id === leadID) {
          axios
            .delete(`http://localhost:3000/leads/${leadID}`)
            .then(response => {
              if (response.status === 204) {
                this.leads.splice(lead, 1);
              }
            });
        }
      }
    },
    notRequired() {
      this.leads.forEach((element, index) => {
        if (element.telefone.length < 1)
          this.leads[index].telefone = "Não preenchido";
        if (element.empresa.length < 1)
          this.leads[index].empresa = "Não preenchido";
      });
    },
    hasContent() {
      if (this.leads.length === 0) this.leads.hasContent = false;
      else this.leads.hasContent = true;
    }
  }
};
</script>

<style scoped>
.container h1 {
  margin-top: 17px;
  text-align: center;
  font-size: 26pt;
}

.leads {
  display: flex;
  flex-direction: column;

  margin-top: 70px;
  align-items: center;
}

.lead {
  width: 90%;
  max-width: 700px;

  position: relative;
  display: block;
  margin: 10px 0;

  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.lead h2 {
  text-align: center;
  letter-spacing: 1px;
  color: #9e00ff;
}

.lead div.lead-contact {
  display: flex;
}

.lead div.lead-contact span {
  flex: 1;
}

.lead div.lead-contact b {
  margin: 0 10px;
}

.lead div.lead-contact #first {
  text-align: right;
}

.lead-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.lead-info span {
  margin: 10px;
}

.lead svg {
  position: absolute;
  top: 10%;
  right: 3%;

  transition: all 0.4s;
}

.lead svg:hover {
  transform: scale(1.3);
  color: red;
}

.noContent {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.noContent h3 {
  color: red;
  margin-bottom: 40px;
}

.container iframe {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;

  width: auto;
  height: 100%;
}
</style>
