<template>
  <div class="whereToBuy" ref="majorRetailers">
    <div
      class="whereToBuyItems"
      v-for="(country, countryIndex) in countries"
      :key="country.name"
      :ref="(el) => (countryRefs[countryIndex] = el)"
      :class="{ visible: country.loaded }"
    >
      <span>{{ country.name }}</span>
      <div class="imageContainer">
        <a
          v-for="(retailer, retailerIndex) in country.retailers"
          :key="retailerIndex"
          :style="{ animationDelay: retailerIndex * 0.4 + 's' }"
          :class="{ visible: retailer.loaded }"
          href=""
          :to="retailer.link"
        >
          <img :src="retailer.imgSrc" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const countryRefs = ref([]);
const majorRetailers = ref(null);

const countries = ref([
  {
    name: "Austria",
    retailers: [
      {
        imgSrc: "/images/whereToBuy/proshop.jpg",
        link: "https://www.proshop.at/",
      },
    ],
  },
  {
    name: "Belgium",
    retailers: [
      {
        imgSrc: "/images/whereToBuy/alternate.jpg",
        link: "https://www.alternate.be/listing.xhtml?q=akracing",
      },
      {
        imgSrc: "/images/whereToBuy/tones.jpg",
        link: "https://www.tones.be/nl",
      },
      {
        imgSrc: "/images/whereToBuy/fbcomputers.jpg",
        link: "https://www.fbcomputers.exellent-it.be/fr",
      },
    ],
  },
  {
    name: "Denmark",
    retailers: [
      {
        imgSrc: "/images/whereToBuy/dustin.jpg",
        link: "https://www.dustin.dk/",
      },
      {
        imgSrc: "/images/whereToBuy/proshop.jpg",
        link: "https://www.proshop.at/",
      },
      {
        imgSrc: "/images/whereToBuy/foniks.jpg",
        link: "https://www.fcomputer.dk/",
      },
    ],
  },
  {
    name: "Finland",
    retailers: [
      {
        imgSrc: "/images/whereToBuy/dustin.jpg",
        link: "https://www.dustin.dk/",
      },
      {
        imgSrc: "/images/whereToBuy/proshop.jpg",
        link: "https://www.proshop.at/",
      },
      {
        imgSrc: "/images/whereToBuy/verkkokauppa.jpg",
        link: "https://www.verkkokauppa.com/fi/brand/akracing",
      },
    ],
  },
  {
    name: "France",
    retailers: [
      {
        imgSrc: "/images/whereToBuy/ldlc.jpg",
        link: "https://www.ldlc.com/informatique/peripherique-pc/siege-pc/c4599/+fb-C000036079.html",
      },
      {
        imgSrc: "/images/whereToBuy/cdiscount.jpg",
        link: "https://www.cdiscount.com/marques/r-akracing.html#_his_",
      },
      {
        imgSrc: "/images/whereToBuy/maxesport.jpg",
        link: "https://maxesport.gg/fr/p/akracing-california-napa/",
      },
      {
        imgSrc: "/images/whereToBuy/rueducommerce.jpg",
        link: "https://www.rueducommerce.fr/",
      },
      {
        imgSrc: "/images/whereToBuy/topachat.jpg",
        link: "https://www.topachat.com/pages/produits_cat_est_gaming_puis_rubrique_est_wg_faut_puis_mc_est_akracing.html",
      },
      {
        imgSrc: "/images/whereToBuy/finac.jpg",
        link: "https://www.fnac.com/AK-Racing/m391255/w-4",
      },
      {
        imgSrc: "/images/whereToBuy/eleclerc.jpg",
        link: "https://www.dustin.dk/",
      },
      {
        imgSrc: "/images/whereToBuy/amazon.jpg",
        link: "https://www.amazon.fr/s?k=akracing&__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss_1",
      },
      {
        imgSrc: "/images/whereToBuy/cybertek.jpg",
        link: "https://www.cybertek.fr/boutique/produit.aspx?q=AKRACING",
      },
      {
        imgSrc: "/images/whereToBuy/topOffice.jpg",
        link: "https://www.top-office.com/?gclid=EAIaIQobChMI_eCRnZGh-gIVFvlRCh3oDwv6EAAYASAAEgKIYvD_BwE",
      },
      {
        imgSrc: "/images/whereToBuy/grosbill.jpg",
        link: "https://www.grosbill.com/siege-pc-gamer-75/akracing-681.aspx",
      },
    ],
  },
  {
    name: "Germany",
    retailers: [
      {
        imgSrc: "/images/whereToBuy/alternate.jpg",
        link: "https://www.alternate.de/",
      },
      {
        imgSrc: "/images/whereToBuy/otto.jpg",
        link: "https://www.otto.de/",
      },
      {
        imgSrc: "/images/whereToBuy/mediamarkt.jpg",
        link: "https://www.mediamarkt.de/",
      },
      {
        imgSrc: "/images/whereToBuy/euronics.jpg",
        link: "https://www.euronics.de/hagen-berlet",
      },
      {
        imgSrc: "/images/whereToBuy/amazon.jpg",
        link: "https://www.amazon.de/",
      },
      {
        imgSrc: "/images/whereToBuy/saturn.jpg",
        link: "https://www.saturn.de/de/product/_akracing-core-ex-2472694.html",
      },
      {
        imgSrc: "/images/whereToBuy/mindfactory.jpg",
        link: "https://www.mindfactory.de/",
      },
      {
        imgSrc: "/images/whereToBuy/snogard.jpg",
        link: "https://www.snogard.de/subKategorie/4-gaming-stuehle-bei-snogard/2471-gaming-stuehle.html",
      },
    ],
  },
  {
    name: "Netherlands",
    retailers: [
      {
        imgSrc: "/images/whereToBuy/informatique.jpg",
        link: "https://www.informatique.nl/zoeken/?q=akracing",
      },
      {
        imgSrc: "/images/whereToBuy/bol.jpg",
        link: "https://www.bol.com/nl/nl/b/akracing/11814134/",
      },
    ],
  },
  {
    name: "Norway",
    retailers: [
      {
        imgSrc: "/images/whereToBuy/dustin.jpg",
        link: "https://www.dustin.no/",
      },
      {
        imgSrc: "/images/whereToBuy/proshop.jpg",
        link: "https://www.proshop.no/",
      },
    ],
  },
  {
    name: "Portugal",
    retailers: [
      {
        imgSrc: "/images/whereToBuy/elcorteimages.jpg",
        link: "https://www.elcorteingles.pt/gaming/",
      },
      {
        imgSrc: "/images/whereToBuy/finac.jpg",
        link: "https://www.fnac.pt/SearchResult/ResultList.aspx?Search=akracing&SFilt=1!206&sft=1&sl",
      },
      {
        imgSrc: "/images/whereToBuy/mediamarkt.jpg",
        link: "https://mediamarkt.pt/pages/search-results-page?page=1&rb_vendor=AKRacing",
      },
      {
        imgSrc: "/images/whereToBuy/megamania.jpg",
        link: "https://www.mega-mania.com.pt/pt/catalogo/?f=akracing&ppage=50",
      },
      {
        imgSrc: "/images/whereToBuy/playgame.jpg",
        link: "https://www.playandgame.pt/categoria-produto/acessorios/cadeiras-gaming/?categories=akracing",
      },
      {
        imgSrc: "/images/whereToBuy/pressstart.jpg",
        link: "https://www.pressstart.pt/pesquisar?search_query=akracing&submit_search=&orderby=price&orderway=asc&orderway=asc",
      },
      {
        imgSrc: "/images/whereToBuy/staples.jpg",
        link: "https://www.staples.pt/pt/pt/gaming-cadeiras-gaming?manufacturer_id=683&page=1",
      },
      {
        imgSrc: "/images/whereToBuy/worten.jpg",
        link: "https://www.worten.pt/search?query=akracing&sortBy=relevance&hitsPerPage=24&page=1&facetFilters=seller_id%253A689dda97-efa4-4c6d-96bc-6f4bbfda8394&facetFilters=brand_name%253AAKRACING&facetFilters=m_tipologia%253ACadeira%20Gaming&latestFacet=m_tipologia%253ACadeira%20Gaming",
      },
      {
        imgSrc: "/images/whereToBuy/gamingreplay.jpg",
        link: "https://www.gamingreplay.com/pt/2543-akracing",
      },
    ],
  },
  {
    name: "Spain",
    retailers: [
      {
        imgSrc: "/images/whereToBuy/amazon.jpg",
        link: "https://www.amazon.es/",
      },
      {
        imgSrc: "/images/whereToBuy/coolmod.jpg",
        link: "https://www.coolmod.com/",
      },
      {
        imgSrc: "/images/whereToBuy/ldlc.jpg",
        link: "https://www.ldlc.com/es-es/novedades/",
      },
    ],
  },
  {
    name: "Sweden",
    retailers: [
      {
        imgSrc: "/images/whereToBuy/dustin.jpg",
        link: "https://www.dustin.se/",
      },
      {
        imgSrc: "/images/whereToBuy/proshop.jpg",
        link: "https://www.proshop.se/",
      },
    ],
  },
]);

const observeVisibility = () => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const countryIndex = entry.target.dataset.index;
        countries.value[countryIndex].loaded = true;
        countries.value[countryIndex].retailers.forEach(
          (retailer, retailerIndex) => {
            setTimeout(() => {
              retailer.loaded = true;
            }, retailerIndex * 400);
          }
        );
        observer.unobserve(entry.target);
      }
    });
  }, options);

  countryRefs.value.forEach((el, index) => {
    if (el) {
      el.dataset.index = index;
      observer.observe(el);
    }
  });
};

onMounted(() => {
  observeVisibility();
});
</script>

<style scoped>
.whereToBuy {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 80px 100px;
}

.whereToBuyItems {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  opacity: 0;
  transition: opacity 0.5s, transform 0.5s;
}

.whereToBuyItems.visible {
  opacity: 1;
}

.whereToBuyItems span {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
}

.imageContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 20px;
}

.imageContainer a {
  opacity: 0;
  transition: opacity 0.5s, transform 0.5s;
}

.imageContainer a.visible {
  opacity: 1;
}

.imageContainer img {
  max-width: 150px; /* Adjust the size as needed */
  margin: 5px; /* Adjust spacing as needed */
}
</style>
