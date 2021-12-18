// *-------HTML
<template>
  <p
    class="
      absolute
      left-1/2
      -top-[50rem]
      -translate-x-40
      z-10
      w-80
      px-5
      py-2
      rounded-lg
      shadow-md
      transition-all
      duration-700
      text-center
      bg-red-200/80
      text-red-700
      opacity-75
      font-medium
      text-xl
      selection:bg-red-50 selection:text-red-400
      hover:scale-105 hover:opacity-90
      cursor-pointer
    "
    :class="{ 'top-24': errorText, 'opacity-0': !errorText }"
    @click="errorText = null"
  >
    {{ errorText }}
  </p>
  <div class="relative flex justify-center mx-auto mt-16 dark">
    <div
      class="
        backdrop
        absolute
        bg-blue-500
        blur-lg
        rounded-xl
        w-[22rem]
        h-full
        opacity-30
        animate-tilt
      "
    ></div>
    <div class="card relative w-[22rem] rounded-xl shadow-2xl">
      <div
        class="
          card-head
          h-[14rem]
          rounded-t-xl
          shadow-b-lg
          bg-blue-500/40
          flex
          justify-center
          items-center
        "
      >
        <img
          class="rounded-t-xl w-full"
          :src="imgLink"
          ref="iconImgTag"
          alt="Skateboarding at sunset"
        />
      </div>
      <div class="card-body rounded-b-xl px-5 py-2 space-y-3 dark:bg-gray-900">
        <div class="card-title mt-5">
          <div class="input-group w-full flex">
            <input
              class="
                rounded-l-lg
                w-9/12
                px-3
                focus:outline-none
                transition
                duration-500
                focus:border-r-4 focus:border-blue-400/60
              "
              v-model="cityName"
              type="text"
              placeholder="Enter city name here ..."
              @keyup.enter="getData"
            />
            <button class="btn btn-blue w-3/12 rounded-l-none" @click="getData">
              Search
            </button>
          </div>
          <!-- <h2 class="font-black text-2xl text-gray-900 dark:text-white">
            Why does skateboarding at sunset feels so good?
          </h2> -->
        </div>
        <div class="card-main bg-blue-200/5 p-2" v-show="infos.name">
          <div
            class="
              text-gray-700
              dark:text-gray-300
              grid grid-rows-2 grid-cols-2
            "
          >
            <div
              class="
                mb-5
                w-full
                flex
                justify-center
                col-span-full
                justify-self-center
              "
            >
              <b class="mr-5">Description</b>:
              <p class="ml-5 capitalize">{{ infos.description }}</p>
            </div>
            <div
              class="
                mb-5
                w-full
                flex
                justify-around
                border-r-2 border-gray-100/40
              "
            >
              <b>City name</b>:
              <p>{{ infos.name }}</p>
            </div>
            <div class="mb-5 w-full flex justify-around">
              <b>Wind speed</b>:
              <p>{{ infos.windSpeed }}</p>
            </div>
            <div
              class="
                mb-5
                w-full
                flex
                justify-center
                col-span-full
                justify-self-center
              "
            >
              <b class="mr-5">Temprature</b>:
              <p class="ml-5">{{ infos.temp }}c</p>
            </div>
            <div
              class="
                mb-5
                w-full
                flex
                justify-around
                border-r-2 border-gray-100/40
              "
            >
              <b>Min temp</b>:
              <p>{{ infos.minTemp }}c</p>
            </div>
            <div class="w-full flex justify-around">
              <b>Max temp</b>:
              <p>{{ infos.maxTemp }}c</p>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <!-- <button class="read-more-btn btn btn-blue">Read more</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

// *-------JS
<script>
import { reactive, ref } from "@vue/reactivity";
import axios, { API_KEY } from "./plugins/axios.js";
export default {
  name: "App",

  // !---------------Setup---------------------
  setup() {
    // //Variables:
    const errorText = ref(null);
    const cityName = ref(null);
    const infos = reactive({
      name: "",
      windSpeed: "",
      temp: "",
      minTemp: "",
      maxTemp: "",
      description: "",
    });
    const iconImgTag = ref(null);
    const imgLink = ref("/imgs/city.jpg");

    // //Functions:
    const getData = async (e) => {
      try {
        if (!cityName.value) {
          throw new Error("Please enter a city name");
        }

        const { data } = await axios.get(
          `weather?q=${cityName.value}&appid=${API_KEY}&units=metric`
        );

        imgLink.value = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        infos.name = data.name;
        infos.windSpeed = data.wind.speed;
        infos.temp = data.main.temp;
        infos.minTemp = data.main["temp_min"];
        infos.maxTemp = data.main["temp_max"];
        infos.description = data.weather[0].description;
        iconImgTag.value.classList.replace("w-full", "w-36");
      } catch (error) {
        errorText.value = error.message;
        setTimeout(() => {
          errorText.value = null;
        }, 5000);
      }
    };
    // //Lifecicle hooks:

    // //Return:
    return {
      errorText,
      cityName,
      iconImgTag,
      imgLink,
      infos,
      getData,
    };
  },
};
</script>

// *-------CSS
<style></style>
