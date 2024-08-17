export const generateProductLink = (item) => {
const defaultVariant = item?.variants?.find(
    (variant) =>
      variant?.material === item?.variants[0]?.material &&
      variant?.color === item?.variants[0]?.color
  );
  return {
    name: "product",
    params: {
      id: item._id,
      name: transformNameToUrl(item.name),
    },
    query: {
      variantId: defaultVariant._id,
    },
  };
};

const transformNameToUrl = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };