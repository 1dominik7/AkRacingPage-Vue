export default {
    mounted(el, binding) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      };
  
      const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            binding.value();
            observer.unobserve(el);
          }
        });
      };
  
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    },
  };