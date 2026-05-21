import ModalWrapper from '@/components/modal/Modal';
import FoodNutritionalInfo from '../../[food]/page';

interface InterceptFoodProps {
  params: Promise<{ food: string }>;
}

export default async function InterceptFood({ params }: InterceptFoodProps) {
  return (
    <ModalWrapper>
      <FoodNutritionalInfo params={params} />
    </ModalWrapper>
  );
}
