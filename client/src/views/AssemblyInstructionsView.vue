<template>
  <div class="assemblyContainer">
    <div class="assemblyTitle">
      <h4>ASSEMBLY INSTRUCTIONS</h4>
      <span
        >THANK YOU FOR YOUR PURCHASE AND WELCOME TO THE AKRACING FAMILY!</span
      >
      <span
        >You are only a few minutes away from enjoying comfortable, ergonomic
        gaming or work. We recommend to watch the assembly video below or you
        can scroll down for step-by-step instructions.
      </span>
    </div>
    <video
      class="video"
      autoplay
      loop
      muted
      v-lazy-load="loadComponent"
      :class="{ visible: componentLoaded }"
    >
      <source src="/videoAssembly.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="assemblyInsideBox">
      <h4>ASSEMBLY MANUAL</h4>
      <span>What's in the box?</span>
    </div>
    <div class="assemblyInstruction">
      <img
        class="schemaImg"
        src="/images/assembly/imgSchema.jpg"
        alt=""
        v-lazy-load="loadComponent"
        :class="{ visible: componentLoaded }"
      />
      <span class="spanParts">
        A – Wheelbase | B – Casters | C – Upper side covers | D – Lower side
        cover | E – Mechanism | F – Backrest | G – Seat with pre-installed
        armrests | H – Gas lift cover | J – Hydraulic gas lift | K – Small Allen
        wrench (hex key) | L – Large Allen wrench (hex key) | M – Side cover
        screws | N – Butterfly clip
      </span>
      <div class="assemblyInstructionsDescC">
        <div
          class="assemblyInstructionsDescItem"
          v-for="step in steps"
          :key="step.id"
        >
          <img :src="step.imgSrc" alt="" :class="{ visible: step.visible }" />
          <span>{{ step.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";

const steps = reactive([
  {
    id: 1,
    imgSrc: "/images/assembly/img1.jpg",
    description:
      "Begin the assembly by taking the chair backrest (F) out of the box and remove the protective plastic. Next, remove the pre-installed backrest 5mm bolts using the large hex key (L) on the right side of the backrest.",
    visible: false,
  },
  {
    id: 2,
    imgSrc: "/images/assembly/img2.jpg",
    description: "Repeat step 1 on the left side of the chair. Save the bolts.",
    visible: false,
  },
  {
    id: 3,
    imgSrc: "/images/assembly/img3.jpg",
    description:
      "Take the chair seat out of the box and remove the protective plastic. Next, remove the protective foam from the metal side brackets.",
    visible: false,
  },
  {
    id: 4,
    imgSrc: "/images/assembly/img4.jpg",
    description:
      "Align the backrest with the bracket on the left side of the chair.",
    visible: false,
  },
  {
    id: 5,
    imgSrc: "/images/assembly/img5.jpg",
    description:
      "Attach the backrest using the 5mm screws you saved in step 1 and large hex key (L), by screwing them in loosely.",
    visible: false,
  },
  {
    id: 6,
    imgSrc: "/images/assembly/img6.jpg",
    description:
      "For safety reasons, avoid pulling the recline lever on the right side until the backrest is securely installed. Align the backrest with the bracket on the right side of the chair. Attach the backrest using the 5mm screws you saved in step 2 and large hex key, and tighten the screws on the left and the right side at this point.",
    visible: false,
  },
  {
    id: 7,
    imgSrc: "/images/assembly/img7.jpg",
    description:
      "Using the small hex key (K) and side cover screws, mount the lower (D) and upper ( C ) side covers on the left side of the chair.",
    visible: false,
  },
  {
    id: 8,
    imgSrc: "/images/assembly/img8.jpg",
    description:
      "Using the small hex key (K) and side cover screws, mount the remaining upper ( C ) side cover on the right side of the chair.",
    visible: false,
  },
  {
    id: 9,
    imgSrc: "/images/assembly/img9.jpg",
    description:
      "Time to mount the mechanism (E) to the seat. Start by removing the preinstalled screws from the bottom of the seat using the large hex key (L) and save them.",
    visible: false,
  },
  {
    id: 10,
    imgSrc: "/images/assembly/img10.jpg",
    description:
      "Depending on the chair model you own, you’ll find the advanced mechanism (left) or standard mechanism (right) in the box. Make sure the mechanism is being installed facing the front of the seat: the height adjustment lever should be on the left side and the large round knob to adjust the rocking tension is always towards the front of the chair. Align the mechanism with the holes in the seat and use the screws you saved in step 9 to securely mount it.",
    visible: false,
  },
  {
    id: 11,
    imgSrc: "/images/assembly/img11.jpg",
    description:
      "Remove the red cap from the hydraulic gas lift (J) (if any) and put the gas lift cover (H) over the gas lift. Insert the gas lift into the mechanism.",
    visible: false,
  },
  {
    id: 12,
    imgSrc: "/images/assembly/img12.jpg",
    description:
      "Place the wheelbase (A) upside down and insert the casters (B).",
    visible: false,
  },
  {
    id: 13,
    imgSrc: "/images/assembly/img13.jpg",
    description:
      "Lift the wheelbase and insert the hydraulic gas lift into the hole in the wheelbase. Carefully tilt the chair upwards while holding the wheelbase and position it upright. Assembly complete!",
    visible: false,
  },
]);

const componentLoaded = ref(false);

const loadComponent = () => {
  componentLoaded.value = true;
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(entry.target.parentNode.children).indexOf(
            entry.target
          );
          steps[index].visible = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".assemblyInstructionsDescItem").forEach((item) => {
    observer.observe(item);
  });
});
</script>

<style scoped>
.assemblyContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
  padding-top: 50px;
}

span {
  color: #fff;
}

.assemblyTitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #fff;
}

.video {
  width: 100%;
  height: 700px;
  object-fit: cover;
  opacity: 0;
  transition: opacity 4s ease-in-out;
}

.video.visible {
  opacity: 1;
}

.assemblyInsideBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.assemblyInstruction {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
}

.schemaImg {
  width: 95%;
  opacity: 0;
  transition: opacity 2s ease-in-out;
}

.schemaImg.visible {
  opacity: 1;
}

.spanParts {
  width: 65%;
  text-align: center;
}

.assemblyInstructionsDescC {
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 70px;
  padding-bottom: 100px;
}

.assemblyInstructionsDescItem {
  display: flex;
  align-items: center;
  gap: 100px;
}

.assemblyInstructionsDescItem img {
  width: 500px;
  opacity: 0;
  transition: opacity 2s ease-in-out;
}

.assemblyInstructionsDescItem img.visible {
  opacity: 1;
}

.assemblyInstructionsDescItem span {
  font-size: 18px;
}

@media (max-width: 800px) {
  .assemblyContainer {
    gap: 40px;
    padding: 30px 0px;
  }

  .video {
    object-fit: contain;
    height: 200px;
  }

  .assemblyTitle{
    padding: 0 20px;;
  }

  .assemblyInstruction {
    gap: 30px;
    padding: 0 10px;
  }

  .schemaImg {
    width: 100%;
    object-fit: contain;
  }

  .spanParts {
    width: 100%;
    font-size: 14px;
  }

  .assemblyInstructionsDescC {
    width: 100%;
    gap: 40px;
    padding-bottom: 20px;;
  }

  .assemblyInstructionsDescItem {
    flex-direction: column;
    gap: 10px;
  }

  .assemblyInstructionsDescItem img {
    width: 100%;
  }

  .assemblyInstructionsDescItem span {
    font-size: 14px;
  }
}

@media (min-width: 801px) and (max-width: 1424px) {
  .assemblyTitle{
    padding: 0 20px;
    text-align: center;
  }
}
</style>
