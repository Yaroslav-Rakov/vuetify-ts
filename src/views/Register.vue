<template>

    <v-container>
            <!-- <v-dialog v-model="dialog" max-width="600px" min-width="360px"> -->
            <v-row class="ma-auto" align="center"
                 justify="center">
        <v-col cols="6">
                <div>
                    <v-tabs v-model="tab"
                            show-arrows
                            background-color="deep-purple accent-4"
                            icons-and-text
                            dark
                            grow>
                        <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                        <v-tab v-for="(i, index) in tabs" :key="index">
                            <v-icon large>{{ i.icon }}</v-icon>
                            <div class="caption py-1">{{ i.name }}</div>
                        </v-tab>

                        <v-tab-item>
                            <v-card class="px-4">
                                <v-card-text>
                                    <v-form ref="registerForm" v-model="valid" lazy-validation>
                                        <v-row>
                                            <v-col cols="12" sm="12" md="12">
                                                <v-text-field v-model="userRegister.name"
                                                              :rules="[rules.required]"
                                                              label="Name"
                                                              maxlength="20"
                                                              required></v-text-field>
                                                <!-- <v-text-field
                                                                  v-model="firstName"
                                                                  :rules="[rules.required]"
                                                                  label="First Name"
                                                                  maxlength="20"
                                                                  required
                                                                ></v-text-field> -->
                                            </v-col>
                                            <!-- <v-col cols="12" sm="6" md="6">
                                                            <v-text-field
                                                              v-model="lastName"
                                                              :rules="[rules.required]"
                                                              label="Last Name"
                                                              maxlength="20"
                                                              required
                                                            ></v-text-field>
                                                          </v-col> -->
                                            <v-col cols="12">
                                                <v-text-field v-model="userRegister.email"
                                                              :rules="emailRules"
                                                              label="E-mail"
                                                              required></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field v-model="userRegister.password"
                                                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                              :rules="[rules.required, rules.min]"
                                                              :type="show1 ? 'text' : 'password'"
                                                              name="input-10-1"
                                                              label="Password"
                                                              hint="At least 6 characters"
                                                              counter
                                                              @click:append="show1 = !show1"></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field block
                                                              v-model="verify"
                                                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                              :rules="[rules.required, passwordMatch]"
                                                              :type="show1 ? 'text' : 'password'"
                                                              name="input-10-1"
                                                              label="Confirm Password"
                                                              counter
                                                              @click:append="show1 = !show1"></v-text-field>
                                            </v-col>
                                            <v-spacer></v-spacer>
                                            <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                                <v-btn x-large
                                                       block
                                                       :disabled="!valid"
                                                       color="success"
                                                       @click="register()">Register</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </div>
        </v-col>
        </v-row>
    </v-container>
    <!-- </v-dialog> -->

</template>



<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "RegisterComponent",
  computed: {
    passwordMatch() {
      return () =>
        this.userRegister.password === this.verify || "Password must match";
    },
    ...mapGetters(["GET_AUTH_DATA"]),
  },
  created() {
    // this.ACTION_AUTH_DATA();
  },
  methods: {
    ...mapActions(["ACTION_AUTH_DATA", "ACTION_LOGIN", "ACTION_REGISTER_DATA"]),

    register() {
        if ((this.$refs.registerForm as Vue & { validate: () => boolean }).validate() === true) {
        // submit form to server/API here...
        console.log("register clicked");
        this.$store.dispatch("ACTION_REGISTER_DATA", this.userRegister).then(path => {
            this.$router.push(path);
      });
      }
    },

 //   reset() {
 //     this.$refs.form.reset();
 //   },
 //   resetValidation() {
 //     this.$refs.form.resetValidation();
 //   },
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [{ name: "Register", icon: "mdi-account-outline" }],
    valid: true,

    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
    userData: {
      email: "",
      password: "",
    },
    userRegister: {
      name: "",
      email: "",
      password: "",
    },
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      (v: string) => !!v || "Required",
      (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
      (v: string) => !!v || "Required",
      (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    show1: false,
    rules: {
      required: (value: string) => !!value || "Required.",
      min: (v: string) => (v && v.length >= 6) || "Min 6 characters",
    },
  }),
});
</script>