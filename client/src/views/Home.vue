<template>
  <div id="dashboard">
    <div>
      <a-radio-group defaultValue="all">
        <a-radio value="all" checked @click="filterView">
          Show All
        </a-radio>
        <a-radio value="videos" @click="filterView">
          Videos Only
        </a-radio>
        <a-radio value="texts" @click="filterView">
          Texts Only
        </a-radio>
      </a-radio-group>
    </div>
    <section class="Dashboard">
      <!-- <div v-if="courses.length"> -->
      <LearnCard
        v-for="{ title, id, url, category } in courses"
        :key="id"
        :id="id"
        :url="url"
        :title="title"
        :category="category"
        :view="view"
      ></LearnCard>
      <!-- </div>
      <div v-else>
        <p class="no-results">There are currently no courses</p>
      </div> -->
      <div>
        <form id="newCourseForm" @submit="handleSubmit">
          <h3>Add a course</h3>
          <div>
            <a-input
              v-model.trim="addCourseForm.title"
              type="text"
              placeholder="Name your course"
              id="title"
            />
            <a-input
              v-model.trim="addCourseForm.url"
              type="text"
              placeholder="Paste URL"
              id="add"
            />
            <a-select
              :key="selectForm"
              placeholder="Choose category"
              @change="handleChange"
            >
              <a-select-option value="videos">
                Video
              </a-select-option>
              <a-select-option value="texts">
                Text
              </a-select-option>
            </a-select>
            <button
              @click="addCourse"
              :disabled="
                !addCourseForm.title ||
                  !addCourseForm.url ||
                  !addCourseForm.category
              "
              class="button"
            >
              Add course
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LearnCard from "@/components/LearnCard.vue";

export default {
  name: "Home",
  components: {
    LearnCard
  },
  data() {
    return {
      addCourseForm: {
        title: "",
        url: "",
        category: ""
      },
      selectForm: false,
      view: "all" //https://michaelnthiessen.com/force-re-render/ -> Explanation of why/how re-render Select
    };
  },
  computed: {
    ...mapState(["userProfile", "courses"])
  },
  methods: {
    handleChange(value) {
      this.addCourseForm.category = value;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.addCourseForm.title = "";
      this.addCourseForm.url = "";
      this.addCourseForm.category = "";
      this.selectForm = true; // Re-render after submit
    },
    filterView(e) {
      if (e.target.value == "videos") {
        this.view = "videos";
      } else if (e.target.value == "texts") {
        this.view = "texts";
      } else this.view = "all";
    },
    addCourse() {
      this.$store.dispatch("addCourse", {
        title: this.addCourseForm.title,
        url: this.addCourseForm.url,
        category: this.addCourseForm.category
      });
      // document.getElementById("newCourseForm").reset();
    }
  }
};
</script>

<style>
.Dashboard {
  display: grid;
  padding-top: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  justify-items: center;
  align-items: start;
  grid-auto-flow: row;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
