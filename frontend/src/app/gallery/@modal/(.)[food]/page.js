import ModalWrapper from '@/components/modal/Modal';
import FoodNutritionalInfo from '../../[food]/page';

export default async function InterceptFood({params}) {
    return(
        <ModalWrapper>
            <FoodNutritionalInfo params={params}/>      
        </ModalWrapper> 
    )
}
