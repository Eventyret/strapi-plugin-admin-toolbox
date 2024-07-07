import { Strapi } from "@strapi/strapi";

let strapiInstance: Strapi | null = null;

export const setStrapiInstance = (instance: Strapi) => {
  strapiInstance = instance;
};

export const getStrapiInstance = (): Strapi => {
  if (!strapiInstance) {
    throw new Error("Strapi instance has not been set.");
  }
  return strapiInstance;
};
