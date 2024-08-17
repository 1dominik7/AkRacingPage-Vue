<template>
  <div class="dpLeftDetailsContainer">
    <div v-for="(section, index) in sections" :key="index" class="dpLeftDetail">
      <div class="dpLeftDetailDisactive">
        <div class="dpLeftDetailDisactiveTop" @click="toggleDiv(index)">
          <span>{{ section.title }}</span>
          <i
            :class="isOpen(index) ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"
          ></i>
        </div>
        <transition name="fade">
          <div
            v-show="isOpen(index) || !section.isFirstLoad"
            :class="['dpLeftDetailActive', { 'margin-top': isOpen(index) }]"
            :style="contentStyle(index)"
          >
            <div :class="['dpLeftDetailContent', { open: isOpen(index) }]">
              <component :is="section.content" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const sections = ref([
  {
    title: "Specifications",
    content: {
      template: `<div>
                  <span v-for="(sentence, index) in specifications" :key="index">{{ sentence }}</span>
                </div>`,
      data() {
        return {
          specifications: [
            "Specification 1",
            "Specification 2",
            "Specification 3",
          ],
        };
      },
    },
    isFirstLoad: true,
    isOpen: ref(false),
  },
  {
    title: "Measurements",
    content: {
      template: `<div>
                  <img src="/images/chairStats.jpg" alt="" />
                  <div class="dpLeftDetailStats">
                    <h5>Size Recommendation</h5>
                    <span>For maximum comfort:</span>
                    <div class="dpLeftDetailStats1">
                      <span>Height: 170-200 cm</span>
                      <span>Weight: 75-175 kg</span>
                      <span>BMI: Not to exceed 45 </span>
                    </div>
                    <div class="dpLeftDetailStats2">
                      <span>Caster Size: 6 cm</span>
                      <span>Weight Capacity: 180 kg</span>
                      <span>Net Weight: 26 kg</span>
                      <span>Gross Weight: 31 kg</span>
                    </div>
                  </div>
                </div>`,
    },
    isFirstLoad: true,
    isOpen: ref(false),
  },
  {
    title: "Reviews",
    content: {
      template: `<div>
                  <div class="dpLeftDetailReviewStats">
                    <div class="dpLeftDetailReviewStatsStars">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star"></i>
                    </div>
                    <div class="dpLeftDetailReviewStatsButton">Write a Review</div>
                    <div class="dpLeftDetailReviewDesc">
                      <div class="dpLeftDetailReviewDescC">
                        <div class="dpLeftDetailReviewDescCName">
                          <span>Robert G</span>
                          <div class="dpLeftDetailReviewDescCNameStars">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star"></i>
                          </div>
                        </div>
                        <div class="dpLeftDetailReviewDescCtext">
                          Review was 4/5 originally pending a couple issues being
                          resolved. Support response was quick and the issues taken
                          care, though have to wait on shipping a bit (not a
                          problem). Overall, I find the chair very comfortable. Im a
                          taller guy (6’5”) and about 265, most chairs I’ve sat in
                          don’t seem to stay comfortable for long or accommodate for
                          a bigger size. So far this has done both. The material
                          feels good. The foam is loamy and slightly firm but not
                          too firm. My guess is it will develop a give in time, but
                          even now it feels comfortable to sit in. The head and
                          lumber pillows feel good as well. Material seem sturdy,
                          and the tilt spring lock holds well. The chair goes back a
                          lot further than I’m used too which is nice. The materials
                          all feel sturdy and the castors seem to roll pretty
                          nicely. Installation of everything was pretty quick and
                          painless as well. The only issues were the left armrest
                          was broke(the height print lever), and there was a small
                          puncture in the lumbar pillow. Support response was quick
                          and I’ll get replacements in time. This isn’t enough to
                          take away from the enjoyment of the chair though.
                        </div>
                        <div class="dpLeftDetailReviewDescCTime">20 months ago</div>
                      </div>
                    </div>
                  </div>
                </div>`,
    },
    isFirstLoad: true,
    isOpen: ref(false),
  },
]);

const toggleDiv = (index) => {
  sections.value[index].isOpen.value = !sections.value[index].isOpen.value;
  sections.value[index].isFirstLoad = false;
};

const isOpen = (index) => sections.value[index].isOpen.value;

const contentStyle = (index) => ({
  maxHeight: sections.value[index].isOpen.value ? "1000px" : "0px",
});

onMounted(() => {
  sections.value.forEach((section) => (section.isFirstLoad = false));
});
</script>

<style scoped>
.dpLeftDetail {
  align-items: center;
  padding-bottom: 10px;
  border-bottom: solid 1px rgb(80, 75, 75);
  cursor: pointer;
}

.dpLeftDetailDisactive {
  display: flex;
  flex-direction: column;
}

.dpLeftDetailDisactiveTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dpLeftDetailDisactive .bi {
  color: var(--primary);
}

.dpLeftDetailDisactive span {
  font-size: 13px;
}

.dpLeftDetailActive {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: max-height 0.3s ease, margin-top 0.3s ease;
}

.dpLeftDetailActive.margin-top {
  margin-top: 10px;
}

.dpLeftDetailContent {
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(20px);
  opacity: 0;
}

.dpLeftDetailContent.open {
  transform: translateY(0);
  opacity: 1;
}
</style>
