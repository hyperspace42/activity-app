<template>
  <div class="container mx-auto">
    <div class="text-center mt-12">
      <p class="text-4xl text-gray-100">Have nothing to do?</p>
      <button
        @click="getActivity"
        class="text-2xl text-gray-200 bg-gray-900 hover:text-gray-100 hover:bg-gray-800 border-2 border-gray-800 mt-8 py-2 px-4 rounded-2xl transition"
      >
        Click on me
      </button>
    </div>
    <div class="mt-16 text-center">
      <transition name="item">
        <div v-if="type" class="w-auto inline-block mb-4">
          <p :class="randomGradient" class="text-2xl text-gray-200">{{ type }}</p>
        </div>
      </transition>
      <transition name="item">
        <p v-if="activity" class="text-2xl text-gray-200 mb-2">{{ activity }}</p>
      </transition>
      <transition name="item">
        <div v-if="price" class="w-auto inline-block">
          <p class="text-2xl text-gray-200 mb-2">
            Price: {{ price }}<span :class="randomGradient">$</span>
          </p>
        </div>
      </transition>
      <transition name="item">
        <p v-if="participants" class="text-2xl text-gray-200">Participants: {{ participants }}</p>
      </transition>
    </div>
  </div>
</template>

<script>
import getActivityApi from './api.js';
import Chance from 'chance';

const chance = Chance();

export default {
  name: 'App',

  gradients: ['blue_gradient', 'purple_gradient', 'yellow_gradient', 'green_gradient'],

  data() {
    return {
      randomGradientNumber: 0,
      activity: '',
      type: '',
      price: 0,
      participants: 0,
    };
  },

  computed: {
    randomGradient() {
      return this.$options.gradients[this.randomGradientNumber];
    },
  },

  methods: {
    async getActivity() {
      const activityJson = await getActivityApi();

      this.randomGradientNumber = chance.integer({ min: 0, max: 3 });

      this.activity = activityJson.activity;
      this.type = activityJson.type;
      this.price = activityJson.price;
      this.participants = activityJson.participants;
    },
  },
};
</script>

<style lang="scss">
.item-enter-active,
.item-leave-active {
  transition: opacity 0.35s ease;
}

.item-enter-to,
.item-leave-from {
  opacity: 1;
}

.item-enter-from,
.item-leave-to {
  opacity: 0;
}

.blue_gradient {
  background: linear-gradient(to right, #3d8bfd, #8c68cd);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.purple_gradient {
  background: linear-gradient(to right, #8c68cd, #de5c9d);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.yellow_gradient {
  background: linear-gradient(to right, #e35d6a, #fd9843);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.green_gradient {
  background: linear-gradient(to right, #83db3b, #1bd143);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>
