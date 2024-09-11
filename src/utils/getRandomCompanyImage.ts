import { dummyCompanyImages } from '../../public/dummyCompanyImage.js';
export const randomCompanyImage = () => {
  const randomIndex = Math.floor(Math.random() * dummyCompanyImages.length);
  return dummyCompanyImages[randomIndex];
};
