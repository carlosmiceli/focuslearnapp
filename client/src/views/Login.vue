<template>
  <div class="nav">
    <div id="login">
      <!-- <PasswordReset
        v-if="showPasswordReset"
        @close="togglePasswordReset()"
      ></PasswordReset> -->
      <section>
        <div class="col1">
          <h1>Carlos Learns</h1>
          <p>
            His personal learning platform :)
          </p>
        </div>
        <div :class="{ 'signup-form': !showLoginForm }" class="col2">
          <form v-if="showLoginForm" @submit.prevent>
            <h1>Welcome Back</h1>
            <div>
              <label for="email1">Email</label>
              <input
                v-model.trim="loginForm.email"
                type="text"
                placeholder="you@email.com"
                id="email1"
              />
            </div>
            <div>
              <label for="password1">Password</label>
              <input
                v-model.trim="loginForm.password"
                type="password"
                placeholder="******"
                id="password1"
              />
            </div>
            <button @click="login()" class="button">Log In</button>
            <div class="extras">
              <!-- <a @click="togglePasswordReset()">Forgot Password</a> -->
              <a @click="toggleForm()">Create an Account</a>
            </div>
          </form>
          <form v-else @submit.prevent>
            <h1>Get Started</h1>
            <div>
              <label for="email2">Email</label>
              <input
                v-model.trim="signupForm.email"
                type="text"
                placeholder="you@email.com"
                id="email2"
              />
            </div>
            <div>
              <label for="password2">Password</label>
              <input
                v-model.trim="signupForm.password"
                type="password"
                placeholder="min 6 characters"
                id="password2"
              />
            </div>
            <button @click="signup()" class="button">Sign Up</button>
            <div class="extras">
              <a @click="toggleForm()">Back to Log In</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

// ADD PASSWORD RESET LATER
// import PasswordReset from "@/components/PasswordReset";

export default {
  // components: {
  //   PasswordReset
  // },
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/profile");
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      signupForm: {
        name: "",
        title: "",
        email: "",
        password: ""
      },
      showLoginForm: true,
      showPasswordReset: false
    };
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password
      });
    },
    signup() {
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      });
    }
  }
};
</script>
